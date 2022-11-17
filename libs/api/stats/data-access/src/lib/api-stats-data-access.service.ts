import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { groupBy } from 'lodash'
import * as LRU from 'lru-cache'
import type { JsonValue } from 'type-fest'
import { kreStatList } from './api-stat-kre-stat-list'
import { countApps, countTxs, getKreStatsQuery, summarizeKreStats } from './api-stats-data-access.helper'
import { BigQueryStatsService } from './big-query-stats.service'
import { KreStatsInput } from './dto/kre-stats.input'
import { ActiveUserBalancesStat } from './models/active-user-balances-stat.model'
import { DailySpendTransactionsStat } from './models/daily-spend-transactions-stat.model'
import { FetchStatsOptions } from './models/fetch-stats-options.model'
import { KreStatsType } from './models/kre-stats.enum'
import { LastTxStat } from './models/last-tx-stat.model'
import { MonthlyActiveEarnersStat } from './models/monthly-active-earners-stat.model'
import { MonthlyActiveSpendersStat } from './models/monthly-active-spenders-stat.model'
import { PayoutsStat } from './models/payouts-stat.model'
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

@Injectable()
export class ApiStatsDataAccessService implements OnModuleInit {
  private readonly logger = new Logger('ApiStatsDataAccessService')
  private readonly cache = new LRU({ maxAge: 1000 * 60 * 60 })

  constructor(private readonly data: ApiCoreDataAccessService, private readonly bigQuery: BigQueryStatsService) {}

  payoutSummary(date?: string) {
    return this.getCachedData(`payout-summary-${date ?? 'latest'}`, () =>
      this.data.krePayoutSummary
        .findFirst({
          where: {
            date: date ? new Date(date) : undefined,
          },
          orderBy: { date: 'desc' },
        })
        .then(({ id, date, kinPayout, usdPayout, ...item }) => ({
          date: formatDate(date),
          kin: kinPayout,
          usd: usdPayout,
          top10: parseJsonString(item.top10 as string),
        })),
    )
  }

  payoutSummaryDates() {
    return this.getCachedData(`payout-summary-dates`, () =>
      this.data.krePayoutSummary
        .findMany({
          orderBy: { date: 'desc' },
          select: { date: true },
          distinct: ['date'],
        })
        .then((items) => items.map((item) => formatDate(item.date))),
    )
  }

  summary(date?: string) {
    return this.getCachedData(`summary-${date ?? 'latest'}`, () =>
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

  summaryDates() {
    return this.getCachedData(`summary-dates`, () =>
      this.data.kreSummary
        .findMany({
          orderBy: { date: 'desc' },
          select: { date: true },
          distinct: ['date'],
        })
        .then((items) => items.map((item) => formatDate(item.date))),
    )
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
