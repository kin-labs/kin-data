import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import * as LRU from 'lru-cache'
import {
  convertDailyActiveUsersBalance,
  convertDailyKinPayout,
  convertDailyKinTransactions,
  convertDailyVolatilityFactor,
  formatAppCountDates,
  formatCountDates,
} from './helpers'

function createDataSet(label: string, data: any, borderColor = '#b795ec', backgroundColor = '#8952e0') {
  return {
    label,
    data,
    borderColor,
    backgroundColor,
  }
}

function createAppCountDatesGraph(items: any[]) {
  return {
    data: [],
    labels: [],
  }
}

export enum KreStatRange {
  '7days' = '7days',
  '30days' = '30days',
  '60days' = '60days',
  '90days' = '90days',
  '120days' = '120days',
  '180days' = '180days',
  '365days' = '365days',
  'all' = 'all',
}
export type KreStatType =
  | 'app-count-date'
  | 'app-dau'
  | 'count-date'
  | 'daily-kin-payout'
  | 'daily-kin-transactions'
  | 'daily-volatility-factor'

export interface KreStat {
  datasets?: KreDataSet[]
  filters?: { gt: Date }
  fn: ({ gt }: { gt: Date }) => Promise<any>
  id: string
  labels?: string[]
  name: string
  ranges: string[]
  type: KreStatType
}

export interface KreDataSet {
  label: string
  data: any[]
  borderColor: string
  backgroundColor: string
}
function getCountDateSummary(arr: { count: number; date: string }[] = []) {
  return arr.reduce((acc: { [key: string]: number }, curr) => ({ ...acc, [curr.date]: curr.count }), {})
}

function daysAgo(days: number) {
  const now = new Date()

  return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days)
}

function getDateRange(range: KreStatRange = KreStatRange['30days']) {
  switch (range) {
    case KreStatRange['120days']:
      return daysAgo(120)
    case KreStatRange['180days']:
      return daysAgo(180)
    case KreStatRange['30days']:
      return daysAgo(30)
    case KreStatRange['365days']:
      return daysAgo(365)
    case KreStatRange['60days']:
      return daysAgo(60)
    case KreStatRange['7days']:
      return daysAgo(7)
    case KreStatRange['90days']:
      return daysAgo(90)
    case KreStatRange.all:
      return undefined
    default:
      return daysAgo(30)
  }
}

function getCacheKey(key: string, { gt }: { gt: Date }) {
  return [key, gt.getTime()].join('-')
}

@Injectable()
export class ApiUnstableDataAccessService {
  private readonly cache = new LRU<string, any>({ maxAge: 1000 * 60 })
  private readonly logger = new Logger(ApiUnstableDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService) {}

  async kreStat(statId: string, range?: KreStatRange): Promise<KreStat & { datasets: KreDataSet[]; labels: string[] }> {
    const stat = this.kreStats().find((stat) => stat.id === statId)
    if (!stat) {
      throw new NotFoundException(`Stat with id ${statId} not found`)
    }
    const gt = getDateRange(range)
    const cacheKey = getCacheKey(stat.id, { gt })

    return this.getCachedData(cacheKey, () => this.getKreStat(stat, gt))
  }

  private async getKreStat(stat: KreStat, gt: Date) {
    const result = { ...stat, labels: [], datasets: [], filters: { gt } }

    switch (stat.type) {
      case 'app-count-date': {
        const data = await stat.fn({ gt })
        const summary = getCountDateSummary(data)
        return { ...result, labels: Object.keys(summary), datasets: [] }
      }
      case 'count-date': {
        const data = await stat.fn({ gt })
        const summary = getCountDateSummary(data)
        return {
          ...result,
          labels: Object.keys(summary),
          datasets: [createDataSet(stat.name, Object.values(summary))],
        }
      }
      case 'app-dau':
      case 'daily-kin-payout':
      case 'daily-kin-transactions':
      case 'daily-volatility-factor':
      default: {
        return { ...result }
      }
    }
  }

  kreStats(): KreStat[] {
    return [
      {
        id: 'daily-active-earners-by-app',
        name: 'Daily Active Earners By App',
        type: 'app-count-date',
        fn: ({ gt }) => this.dailyActiveEarnersByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-active-earners-ecosystem',
        name: 'Daily Active Earners Ecosystem',
        type: 'count-date',
        fn: ({ gt }) => this.dailyActiveEarnersEcosystem({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-active-spenders-by-app',
        name: 'Daily Active Spenders By App',
        type: 'app-count-date',
        fn: ({ gt }) => this.dailyActiveSpendersByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-active-spenders-ecosystem',
        name: 'Daily Active Spenders Ecosystem',
        type: 'count-date',
        fn: ({ gt }) => this.dailyActiveSpendersEcosystem({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-active-user-balance-by-app',
        name: 'Daily Active User Balance By App',
        type: 'app-dau',
        fn: ({ gt }) => this.dailyActiveUserBalanceByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-active-users-by-app',
        name: 'Daily Active Users By App',
        type: 'app-count-date',
        fn: ({ gt }) => this.dailyActiveUsersByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-active-users-ecosystem',
        name: 'Daily Active Users Ecosystem',
        type: 'count-date',
        fn: ({ gt }) => this.dailyActiveUsersEcosystem({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-kin-payout',
        name: 'Daily Kin Payout',
        type: 'daily-kin-payout',
        fn: ({ gt }) => this.dailyKinPayout({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-kin-transactions',
        name: 'Daily Kin Transactions',
        type: 'daily-kin-transactions',
        fn: ({ gt }) => this.dailyKinTransactions({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'daily-volatility-factor',
        name: 'Daily Volatility Factor',
        type: 'daily-volatility-factor',
        fn: ({ gt }) => this.dailyVolatilityFactor({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'monthly-active-earners-by-app',
        name: 'Monthly Active Earners By App',
        type: 'app-count-date',
        fn: ({ gt }) => this.monthlyActiveEarnersByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'monthly-active-earners-ecosystem',
        name: 'Monthly Active Earners Ecosystem',
        type: 'count-date',
        fn: ({ gt }) => this.monthlyActiveEarnersEcosystem({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'monthly-active-spenders-by-app',
        name: 'Monthly Active Spenders By App',
        type: 'app-count-date',
        fn: ({ gt }) => this.monthlyActiveSpendersByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'monthly-active-spenders-ecosystem',
        name: 'Monthly Active Spenders Ecosystem',
        type: 'count-date',
        fn: ({ gt }) => this.monthlyActiveSpendersEcosystem({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'monthly-active-users-by-app',
        name: 'Monthly Active Users By App',
        type: 'app-count-date',
        fn: ({ gt }) => this.monthlyActiveUsersByApp({ gt }),
        ranges: Object.keys(KreStatRange),
      },
      {
        id: 'monthly-active-users-ecosystem',
        name: 'Monthly Active Users Ecosystem',
        type: 'count-date',
        fn: ({ gt }) => this.monthlyActiveUsersEcosystem({ gt }),
        ranges: Object.keys(KreStatRange),
      },
    ]
  }

  dailyActiveEarnersByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveEarnersByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveEarnersByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatAppCountDates(entities))
        .then((data) => createAppCountDatesGraph(data)),
    )
  }

  dailyActiveEarnersEcosystem({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveEarnersEcosystem', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveEarnersEcosystem
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatCountDates(entities)),
    )
  }

  dailyActiveSpendersByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveSpendersByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveSpendersByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatAppCountDates(entities)),
    )
  }

  dailyActiveSpendersEcosystem({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveSpendersEcosystem', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveSpendersEcosystem
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatCountDates(entities)),
    )
  }

  dailyActiveUserBalanceByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveUserBalanceByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUserBalanceByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => convertDailyActiveUsersBalance(entities)),
    )
  }

  dailyActiveUsersByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveUsersByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUsersByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatAppCountDates(entities)),
    )
  }

  dailyActiveUsersEcosystem({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyActiveUsersEcosystem', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUsersEcosystem
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatCountDates(entities)),
    )
  }

  dailyKinPayout({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyKinPayout', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyKinPayout
        .findMany({ where: { date: { gt } } })
        .then((entities) => convertDailyKinPayout(entities)),
    )
  }

  dailyKinTransactions({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyKinTransactions', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyKinTransactions
        .findMany({ where: { date: { gt } } })
        .then((entities) => convertDailyKinTransactions(entities)),
    )
  }

  dailyVolatilityFactor({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('dailyVolatilityFactor', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.dailyVolatilityFactor
        .findMany({ where: { date: { gt } } })
        .then((entities) => convertDailyVolatilityFactor(entities)),
    )
  }

  monthlyActiveEarnersByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('monthlyActiveEarnersByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveEarnersByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatAppCountDates(entities)),
    )
  }

  monthlyActiveEarnersEcosystem({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('monthlyActiveEarnersEcosystem', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveEarnersEcosystem
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatCountDates(entities)),
    )
  }

  monthlyActiveSpendersByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('monthlyActiveSpendersByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveSpendersByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatAppCountDates(entities)),
    )
  }

  monthlyActiveSpendersEcosystem({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('monthlyActiveSpendersEcosystem', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveSpendersEcosystem
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatCountDates(entities)),
    )
  }

  monthlyActiveUsersByApp({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('monthlyActiveUsersByApp', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveUsersByApp
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatAppCountDates(entities)),
    )
  }

  monthlyActiveUsersEcosystem({ gt }: { gt: Date }) {
    const cacheKey = getCacheKey('monthlyActiveUsersEcosystem', { gt })
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveUsersEcosystem
        .findMany({ where: { date: { gt } } })
        .then((entities) => formatCountDates(entities)),
    )
  }

  private async getCachedData(cacheKey: string, fn: () => Promise<any>) {
    if (!this.cache.has(cacheKey)) {
      this.logger.verbose(`Caching ${cacheKey} started`)
      this.cache.set(cacheKey, await fn())
      this.logger.verbose(`Caching ${cacheKey} finished`)
    } else {
      this.logger.verbose(`Cached ${cacheKey} returned`)
    }
    return this.cache.get(cacheKey)
  }
}
