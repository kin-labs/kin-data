import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { groupBy } from 'lodash'
import * as LRU from 'lru-cache'
import { kreStatList } from './api-stat-kre-stat-list'
import { countApps, countTxs, getKreStatsQuery, summarizeKreStats } from './api-stats-data-access.helper'
import { BigQueryStatsService } from './big-query-stats.service'
import { KreStatsInput } from './dto/kre-stats.input'
import { ActiveUserBalancesStat } from './models/active-user-balances-stat.model'
import { App } from './models/app.entity'
import { DailySpendTransactionsStat } from './models/daily-spend-transactions-stat.model'
import { FetchStatsOptions } from './models/fetch-stats-options.model'
import { KreStatsType } from './models/kre-stats.enum'
import { LastTxStat } from './models/last-tx-stat.model'
import { MonthlyActiveEarnersStat } from './models/monthly-active-earners-stat.model'
import { MonthlyActiveSpendersStat } from './models/monthly-active-spenders-stat.model'
import { PayoutsStat } from './models/payouts-stat.model'
import { getDateRange, StatInput, StatRange } from './models/stat-range.enum'
import { Stat, STATS, StatType } from './models/stat-type.enum'
import { TotalActiveEarnersStat } from './models/total-active-earners-stat.model'
import { TotalActiveSpendersStat } from './models/total-active-spenders-stat.model'
import { TotalWalletsStat } from './models/total-wallets-stat.model'
import { TransactionsPerSecondStat } from './models/transactions-per-second-stat.model'
import { TxPerDayStat } from './models/tx-per-day-stat.model'
import { WalletsCreatedStat } from './models/wallets-created-stat.model'

function formatDate(date: Date) {
  return new Date(date).toISOString().split('T')[0]
}

function parseJsonString(json: string) {
  return JSON.parse(json).map(({ id, kinPayout, usdPayout, name }) => ({
    index: id,
    name: name ? name : `App ${id}`,
    kin: kinPayout,
    usd: usdPayout,
  }))
}

function reduceLabels(labels, counter = 1): string[] {
  const labelCount = labels.length

  if (labelCount <= 25) {
    console.log('No need to reduce labels', { counter, labels: labels.length })
    return [...labels]
  }

  let result = []

  for (let i = labelCount - 2; i--; i >= 0) {
    console.log('reduceLabels', { i, labelCount })
    //-2 get last datapoint always
    if (i % 4 === 0) {
      console.log('reduceLabels', { counter, i, labelCount, labels: labels.length })

      result = [...labels[i]]

      labels.splice(i, 1)

      console.log('reduceLabels', { counter, i, labelCount, labels: labels.length })
    }
  }

  if (labels.length > 25) {
    console.log('Run Another Label Reduction', { counter, labels: labels.length })
    return reduceLabels(labels, counter + 1)
  }

  console.log('Reduced Data Labels', { counter, labels: labels.length })
  return [...result]
}

// function reduceDataPoints(labels, data): { labels: string[]; data: number[] } {
//   const labelCount = labels.length
//
//   if (labelCount <= 25) {
//     console.log('No need to reduce data points', { labels: labels.length, data: data.length })
//     return { labels, data }
//   }
//
//   const result = { labels: [], data: [] }
//
//   for (let i = labelCount - 2; i--; i >= 0) {
//     console.log('reduceDataPoints', { i, labelCount })
//     //-2 get last datapoint always
//     if (i % 4 === 0) {
//       console.log('reduceDataPoints', { i, labelCount, labels: labels.length, data: data.length })
//
//       result.labels.push(labels.slice(i, i + 1)[0])
//       result.data.push(data.slice(i, i + 1)[0])
//       labels.splice(i, 1)
//       data?.forEach((point, ii) => {
//         //loop for each data point
//         data[ii].data.splice(i, 1) //delete corresponding index
//       })
//     }
//   }
//
//   if (labels.length > 25) {
//     console.log('Run Another Reduction', { labels: labels.length, data: data.length })
//     return reduceDataPoints(labels, data)
//   }
//
//   console.log('Reduced Data Points', { labels: labels.length, data: data.length })
//   return result
// }

function getCacheKey(key: string, { gt, type }: { gt: Date; type?: StatType }) {
  return [key, gt?.getTime() ?? 'default-key', type ? type : 'none'].join('-')
}

@Injectable()
export class ApiStatsDataAccessService implements OnModuleInit {
  static filtered: Record<string, number> = {
    APP_0: 0,
    APP_1: 1,
    KIK: 32,
    MY_KIN_WALLET: 385,
    KIN_NODE_DEMO: 360,
  }

  private readonly logger = new Logger('ApiStatsDataAccessService')
  private readonly cache = new LRU({ maxAge: 1000 * 60 * 60 })

  constructor(private readonly data: ApiCoreDataAccessService, private readonly bigQuery: BigQueryStatsService) {}

  dailySummaryApps({ range, type }: StatInput) {
    const gt = getDateRange(range as StatRange)
    type = type ?? StatType.totalDailyTransactions
    const cachedKey = getCacheKey('daily-summary-apps', { gt, type })

    return this.getCachedData(cachedKey, () =>
      this.data.dailySummaryApp
        .findMany({
          where: {
            date: { gt },
          },
          orderBy: { date: 'asc' },
        })
        .then((items) =>
          items
            .filter((item) => !this.filterItem(item.index))
            .map((item) => ({
              ...item,
              date: formatDate(item.date),
            })),
        )
        .then((summary) => {
          const dates = [...new Set(summary?.map((d) => d.date) ?? [])]
          // .filter(
          //   (d) => !['2022-10-25', '2022-10-26'].includes(d),
          // )
          const indexes = [...new Set(summary?.map((d) => d.index) ?? [])]
          const apps: App[] = indexes
            .map((index) => summary.find((item) => item.index === index))
            .map(({ index, name }) => {
              return {
                index,
                name,
                data: dates.map((date) => {
                  const found = summary.find((item) => {
                    return item.date === date && item.index === index
                  })
                  return found ? found[type] : 0
                }),
              }
            })
            // Remove apps with no data
            .filter((app) => app.data.reduce((a, b) => a + b, 0) > 0)
            // Get the total value for each app
            .map((app) => ({ ...app, total: app.data.reduce((a, b) => a + b, 0) }))
            // Order by total value
            .sort((a, b) => (a.total < b.total ? 1 : -1))
            // Hide all apps besides the top 10
            .map((app, index) => ({ ...app, hidden: index > 9 }))

          return {
            dates,
            apps,
          }
        })
        .then(({ dates, apps }) => {
          const total = apps.map((app) => app.total).reduce((a, b) => a + b, 0)
          return {
            dates,
            apps,
            total,
          }
        }),
    )
  }

  dailySummaryEcosystem({ range }: StatInput) {
    const gt = getDateRange(range as StatRange)
    const cachedKey = getCacheKey('daily-summary-ecosystem', { gt })

    return this.getCachedData(cachedKey, () =>
      this.data.dailySummaryEcosystem
        .findMany({
          where: {
            date: { gt },
          },
          orderBy: { date: 'asc' },
        })
        .then((items) =>
          items.map((item) => ({
            ...item,
            date: formatDate(item.date),
          })),
        ),
    )
  }

  krePayoutSummary(date?: string) {
    return this.getCachedData(`kre-payout-summary-${date ?? 'latest'}`, () =>
      this.data.krePayoutSummary
        .findFirst({
          where: {
            date: date ? new Date(date) : undefined,
          },
          orderBy: { date: 'desc' },
        })
        .then(({ id, date, kin, usd, ...item }) => ({
          date: formatDate(date),
          kin,
          usd,
          top10: parseJsonString(item.top10 as string),
        })),
    )
  }

  krePayoutSummaryDates() {
    return this.getCachedData(`kre-payout-summary-dates`, () =>
      this.data.krePayoutSummary
        .findMany({
          orderBy: { date: 'desc' },
          select: { date: true },
          distinct: ['date'],
        })
        .then((items) => items.map((item) => formatDate(item.date))),
    )
  }

  kreSummary(date?: string) {
    return this.getCachedData(`kre-summary-${date ?? 'latest'}`, () =>
      this.data.kreSummary
        .findFirst({
          where: {
            date: date ? new Date(date) : undefined,
          },
          orderBy: { date: 'desc' },
        })
        .then(({ id, ...item }) => ({
          ...item,
          date: formatDate(item.date),
          activeUsers: Number(item.activeUsers),
          dailyTransactions: Number(item.dailyTransactions),
        })),
    )
  }

  kreSummaryDates() {
    return this.getCachedData(`kre-summary-dates`, () =>
      this.data.kreSummary
        .findMany({
          orderBy: { date: 'desc' },
          select: { date: true },
          distinct: ['date'],
        })
        .then((items) => items.map((item) => formatDate(item.date))),
    )
  }

  stats(): Stat[] {
    return STATS
  }

  private filterItem(index: number) {
    const filtered = {
      APP_0: 0,
      APP_1: 1,
      KIK: 32,
      MY_KIN_WALLET: 385,
      KIN_NODE_DEMO: 360,
    }

    return Object.values(filtered).includes(index)
  }

  // The methods below are from the old stats service and should be deprecated

  onModuleInit() {
    // Only in production we want to cache on each server start
    if (process.env.NODE_ENV === 'production') {
      this.cacheStats().catch(() => this.logger.log('Stats Cached'))
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  private async cacheStats() {
    this.logger.log('Caching stats...')
    await Promise.all([
      this.activeUserBalances({ refresh: true }),
      this.dailySpendTransactions({ refresh: true }),
      this.lastTxs({ refresh: true }),
      this.monthlyActiveEarners({ refresh: true }),
      this.monthlyActiveSpenders({ refresh: true }),
      this.payouts({ refresh: true }),
      this.totalActiveEarners({ refresh: true }),
    ])
    await Promise.all([
      this.totalActiveSpenders({ refresh: true }),
      this.totalWallets({ refresh: true }),
      this.transactionsPerSecond({ refresh: true }),
      this.txPerDay({ refresh: true }),
      this.txPerDay({ refresh: true }),
      this.txPerDaySummary({ refresh: true }),
      this.walletsCreated({ refresh: true }),
    ])
    for (const type of Object.values(KreStatsType)) {
      await this.kreStats({ type }, { refresh: true })
    }
    this.logger.log('All stats Cached.')
  }

  activeUserBalances(options: FetchStatsOptions = { refresh: false }): Promise<ActiveUserBalancesStat[]> {
    return this.getCachedQuery(
      'activeUserBalances',
      `
      SELECT date, b.app_index as appIndex, b.digital_service_name as appName, AU, AUB, capped_AUB as cappedAUB
        FROM \`kin-bi.reports.AUB\` a
        LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
        ON a.app_index = b.app_index
        ORDER BY date DESC
      `,
      options,
    ) as Promise<ActiveUserBalancesStat[]>
  }

  dailySpendTransactions(options: FetchStatsOptions = { refresh: false }): Promise<DailySpendTransactionsStat[]> {
    return this.getCachedQuery(
      'dailySpendTransactions',
      `
      SELECT date, b.app_index as appIndex, b.digital_service_name as appName, DST AS dailySpendTransactions,
        FROM \`kin-bi.reports.DST\` a
        LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
        ON a.app_index = b.app_index
        WHERE date >= DATE_ADD(CURRENT_DATE(), INTERVAL -29 DAY)
        ORDER BY date DESC
      `,
      options,
    ) as Promise<DailySpendTransactionsStat[]>
  }

  kreStats(input: KreStatsInput, options: FetchStatsOptions = { refresh: false }) {
    return this.getCachedData(input.type, () => this.getStat(input.type), options)
  }

  kreList() {
    return Object.values(KreStatsType)
  }

  kreStatList() {
    return kreStatList
  }

  lastTxs(options: FetchStatsOptions = { refresh: false }): Promise<LastTxStat[]> {
    return this.getCachedQuery(
      'lastTxs',
      `
        SELECT a.app_index AS appIndex, b.digital_service_name AS appName, date, tx_id AS txId
          FROM \`kin-bi.reports.last_txs\` a
          LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
          ON a.app_index = b.app_index
          ORDER BY date DESC
      `,
      options,
    ) as Promise<LastTxStat[]>
  }

  monthlyActiveEarners(options: FetchStatsOptions = { refresh: false }): Promise<MonthlyActiveEarnersStat[]> {
    return this.getCachedQuery(
      'monthlyActiveEarners',
      `
      SELECT date, b.app_index as appIndex, b.digital_service_name as appName, MAE AS monthlyActiveEarners,
        FROM \`kin-bi.reports.MAE\` a
        LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
        ON a.app_index = b.app_index
        WHERE date >= DATE_ADD(CURRENT_DATE(), INTERVAL -29 DAY)
        ORDER BY date DESC
      `,
      options,
    ) as Promise<MonthlyActiveEarnersStat[]>
  }

  monthlyActiveSpenders(options: FetchStatsOptions = { refresh: false }): Promise<MonthlyActiveSpendersStat[]> {
    return this.getCachedQuery(
      'monthlyActiveSpenders',
      `
      SELECT date, b.app_index as appIndex, b.digital_service_name as appName, MAS AS monthlyActiveSpenders,
        FROM \`kin-bi.reports.MAS\` a
        LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
        ON a.app_index = b.app_index
        WHERE date >= DATE_ADD(CURRENT_DATE(), INTERVAL -29 DAY)
        ORDER BY date DESC
      `,
      options,
    ) as Promise<MonthlyActiveSpendersStat[]>
  }

  payouts(options: FetchStatsOptions = { refresh: false }): Promise<PayoutsStat[]> {
    return this.getCachedQuery(
      'payouts',
      `
      SELECT year, week, b.app_index as appIndex, b.digital_service_name as appName, payout_kin as payoutKin, payout_usd as payoutUSD
        FROM \`kin-bi.reports.payouts\` a
        LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
        ON a.app_index = b.app_index
        ORDER BY year DESC, week desc
      `,
      options,
    ) as Promise<PayoutsStat[]>
  }

  totalActiveEarners(options: FetchStatsOptions = { refresh: false }): Promise<TotalActiveEarnersStat[]> {
    return this.getCachedQuery(
      'totalActiveEarners',
      `
      SELECT date, TAE as totalActiveEarners FROM \`kin-bi.reports.TAE\` ORDER BY date DESC
      `,
      options,
    ) as Promise<TotalActiveEarnersStat[]>
  }

  totalActiveSpenders(options: FetchStatsOptions = { refresh: false }): Promise<TotalActiveSpendersStat[]> {
    return this.getCachedQuery(
      'totalActiveSpenders',
      `
      SELECT date, TAS as totalActiveSpenders FROM \`kin-bi.reports.TAS\` ORDER BY date DESC
      `,
      options,
    ) as Promise<TotalActiveSpendersStat[]>
  }

  totalWallets(options: FetchStatsOptions = { refresh: false }): Promise<TotalWalletsStat[]> {
    return this.getCachedQuery(
      'totalWallets',
      `
      SELECT date, num_wallets as totalWallets FROM \`kin-bi.reports.total_wallets\` ORDER BY date DESC
      `,
      options,
    ) as Promise<TotalWalletsStat[]>
  }

  transactionsPerSecond(options: FetchStatsOptions = { refresh: false }): Promise<TransactionsPerSecondStat[]> {
    return this.getCachedQuery(
      'transactionsPerSecond',
      `
      SELECT date, TPS AS transactionsPerSecond,
        FROM \`kin-bi.reports.TPS\`
        WHERE date >= DATE_ADD(CURRENT_DATE(), INTERVAL -29 DAY)
        ORDER BY date DESC
      `,
      options,
    ) as Promise<TransactionsPerSecondStat[]>
  }

  txPerDay(options: FetchStatsOptions = { refresh: false }): Promise<TxPerDayStat[]> {
    return this.getCachedQuery(
      'txPerDay',
      `
        SELECT date, b.app_index as appIndex, b.digital_service_name as appName, COUNT(*) AS numOfTx,
          FROM \`kin-bi.solana.payments_view\` a
          LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
          ON a.app_index = b.app_index
          WHERE date >= DATE_ADD(CURRENT_DATE(), INTERVAL -29 DAY)
            AND b.app_index IS NOT NULL
          GROUP BY date, b.app_index, b.digital_service_name
          ORDER BY date DESC
      `,
      options,
    ) as Promise<TxPerDayStat[]>
  }

  async txPerDaySummary(options: FetchStatsOptions = { refresh: false }) {
    const data = await this.txPerDay(options)

    const items = groupBy(data, 'date')

    return Object.keys(items).map((date) => ({
      date,
      apps: countApps(items[date]),
      txs: countTxs(items[date]),
    }))
  }

  walletsCreated(options: FetchStatsOptions = { refresh: false }): Promise<WalletsCreatedStat[]> {
    return this.getCachedQuery(
      'walletsCreated',
      `
      SELECT date, b.app_index as appIndex, IFNULL(b.digital_service_name, 'Unknown') as appName, num_wallets AS numWallets,
        FROM \`kin-bi.reports.wallets_created\` a
        LEFT JOIN \`kin-bi.kre_onboarding.app_id_mappings\` b
        ON a.app_index = b.app_index
        WHERE date >= DATE_ADD(CURRENT_DATE(), INTERVAL -29 DAY)
        ORDER BY date DESC
      `,
      options,
    ) as Promise<WalletsCreatedStat[]>
  }

  /**
   *
   * @param table we want stats from
   * @returns stats for selected table
   */
  async getStat(table: KreStatsType) {
    try {
      const sql = getKreStatsQuery(table)
      const rows = await this.bigQuery.query(sql)

      if ([KreStatsType.MAA, KreStatsType.TDT, KreStatsType.VF].includes(table)) {
        return rows
      }
      return summarizeKreStats(rows, table)
    } catch (e) {
      console.log(e)
      return null
    }
  }

  private async getCachedData(
    cacheKey: string,
    fn: () => Promise<any>,
    options: FetchStatsOptions = { refresh: false },
  ) {
    if (!this.cache.has(cacheKey) || options.refresh) {
      this.logger.verbose(`Caching ${cacheKey} started`)
      this.cache.set(cacheKey, await fn())
      this.logger.verbose(`Caching ${cacheKey} finished`)
    }
    return this.cache.get(cacheKey)
  }

  private async getCachedQuery(cacheKey: string, query: string, options) {
    return this.getCachedData(cacheKey, () => this.bigQuery.query(query), options)
  }
}
