import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import * as LRU from 'lru-cache'
import {
  convertDailyActiveUsersBalance,
  convertDailyKinPayout,
  convertDailyKinTransactions,
  convertDailyVolatilityFactor,
  formatAppCountDates,
  formatCountDates,
} from './helpers'

@Injectable()
export class ApiUnstableDataAccessService {
  private readonly cache = new LRU<string, any>({ maxAge: 1000 * 60 })
  private readonly logger = new Logger(ApiUnstableDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService) {}

  kreStats(): { id: string; name: string; type?: string }[] {
    return [
      { id: 'daily-active-earners-by-app', name: 'Daily Active Earners By App', type: 'app-count-date' },
      { id: 'daily-active-earners-ecosystem', name: 'Daily Active Earners Ecosystem', type: 'count-date' },
      { id: 'daily-active-spenders-by-app', name: 'Daily Active Spenders By App', type: 'app-count-date' },
      { id: 'daily-active-spenders-ecosystem', name: 'Daily Active Spenders Ecosystem', type: 'count-date' },
      { id: 'daily-active-user-balance-by-app', name: 'Daily Active User Balance By App', type: 'app-dau' },
      { id: 'daily-active-users-by-app', name: 'Daily Active Users By App', type: 'app-count-date' },
      { id: 'daily-active-users-ecosystem', name: 'Daily Active Users Ecosystem', type: 'count-date' },
      { id: 'daily-kin-payout', name: 'Daily Kin Payout', type: 'daily-kin-payout' },
      { id: 'daily-kin-transactions', name: 'Daily Kin Transactions', type: 'daily-kin-transactions' },
      { id: 'daily-volatility-factor', name: 'Daily Volatility Factor', type: 'daily-volatility-factor' },
      { id: 'monthly-active-earners-by-app', name: 'Monthly Active Earners By App', type: 'app-count-date' },
      { id: 'monthly-active-earners-ecosystem', name: 'Monthly Active Earners Ecosystem', type: 'count-date' },
      { id: 'monthly-active-spenders-by-app', name: 'Monthly Active Spenders By App', type: 'app-count-date' },
      { id: 'monthly-active-spenders-ecosystem', name: 'Monthly Active Spenders Ecosystem', type: 'count-date' },
      { id: 'monthly-active-users-by-app', name: 'Monthly Active Users By App', type: 'app-count-date' },
      { id: 'monthly-active-users-ecosystem', name: 'Monthly Active Users Ecosystem', type: 'count-date' },
    ]
  }

  dailyActiveEarnersByApp() {
    const cacheKey = 'dailyActiveEarnersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveEarnersByApp.findMany().then((entities) => formatAppCountDates(entities)),
    )
  }

  dailyActiveEarnersEcosystem() {
    const cacheKey = 'dailyActiveEarnersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveEarnersEcosystem.findMany().then((entities) => formatCountDates(entities)),
    )
  }

  dailyActiveSpendersByApp() {
    const cacheKey = 'dailyActiveSpendersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveSpendersByApp.findMany().then((entities) => formatAppCountDates(entities)),
    )
  }

  dailyActiveSpendersEcosystem() {
    const cacheKey = 'dailyActiveSpendersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveSpendersEcosystem.findMany().then((entities) => formatCountDates(entities)),
    )
  }

  dailyActiveUserBalanceByApp() {
    const cacheKey = 'dailyActiveUserBalanceByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUserBalanceByApp.findMany().then((entities) => convertDailyActiveUsersBalance(entities)),
    )
  }

  dailyActiveUsersByApp() {
    const cacheKey = 'dailyActiveUsersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUsersByApp.findMany().then((entities) => formatAppCountDates(entities)),
    )
  }

  dailyActiveUsersEcosystem() {
    const cacheKey = 'dailyActiveUsersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUsersEcosystem.findMany().then((entities) => formatCountDates(entities)),
    )
  }

  dailyKinPayout() {
    const cacheKey = 'dailyKinPayout'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyKinPayout.findMany().then((entities) => convertDailyKinPayout(entities)),
    )
  }

  dailyKinTransactions() {
    const cacheKey = 'dailyKinTransactions'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyKinTransactions.findMany().then((entities) => convertDailyKinTransactions(entities)),
    )
  }

  dailyVolatilityFactor() {
    const cacheKey = 'dailyVolatilityFactor'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyVolatilityFactor.findMany().then((entities) => convertDailyVolatilityFactor(entities)),
    )
  }

  monthlyActiveEarnersByApp() {
    const cacheKey = 'monthlyActiveEarnersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveEarnersByApp.findMany().then((entities) => formatAppCountDates(entities)),
    )
  }

  monthlyActiveEarnersEcosystem() {
    const cacheKey = 'monthlyActiveEarnersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveEarnersEcosystem.findMany().then((entities) => formatCountDates(entities)),
    )
  }

  monthlyActiveSpendersByApp() {
    const cacheKey = 'monthlyActiveSpendersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveSpendersByApp.findMany().then((entities) => formatAppCountDates(entities)),
    )
  }

  monthlyActiveSpendersEcosystem() {
    const cacheKey = 'monthlyActiveSpendersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveSpendersEcosystem.findMany().then((entities) => formatCountDates(entities)),
    )
  }

  monthlyActiveUsersByApp() {
    const cacheKey = 'monthlyActiveUsersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveUsersByApp.findMany().then((entities) => formatAppCountDates(entities)),
    )
  }

  monthlyActiveUsersEcosystem() {
    const cacheKey = 'monthlyActiveUsersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveUsersEcosystem.findMany().then((entities) => formatCountDates(entities)),
    )
  }

  private async getCachedData(cacheKey: string, fn: () => Promise<any>) {
    if (!this.cache.has(cacheKey)) {
      this.logger.verbose(`Caching ${cacheKey} started`)
      this.cache.set(cacheKey, await fn())
      this.logger.verbose(`Caching ${cacheKey} finished`)
    }
    return this.cache.get(cacheKey)
  }
}
