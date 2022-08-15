import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import * as LRU from 'lru-cache'
import {
  convertDailyActiveEarnersByApp,
  convertDailyActiveEarnersEcosystem,
  convertDailyActiveSpendersByApp,
  convertDailyActiveSpendersEcosystem,
  convertDailyActiveUsersBalance,
  convertDailyActiveUsersByApp,
  convertDailyActiveUsersEcosystem,
  convertDailyKinPayout,
  convertDailyKinTransactions,
  convertDailyVolatilityFactor,
  convertMonthlyActiveEarnersByApp,
  convertMonthlyActiveEarnersEcosystem,
  convertMonthlyActiveSpendersByApp,
  convertMonthlyActiveSpendersEcosystem,
  convertMonthlyActiveUsersByApp,
  convertMonthlyActiveUsersEcosystem,
  formatDailyActiveUserBalanceEntities,
  formatDailyVolatilityFactorEntities,
} from './helpers'

@Injectable()
export class ApiUnstableDataAccessService {
  private readonly cache = new LRU<string, any>({ maxAge: 1000 * 60 })
  private readonly logger = new Logger(ApiUnstableDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService) {}

  dailyActiveEarnersByApp() {
    const cacheKey = 'dailyActiveEarnersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveEarnersByApp.findMany().then((entities) => convertDailyActiveEarnersByApp(entities)),
    )
  }

  dailyActiveEarnersEcosystem() {
    const cacheKey = 'dailyActiveEarnersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveEarnersEcosystem.findMany().then((entities) => convertDailyActiveEarnersEcosystem(entities)),
    )
  }

  dailyActiveSpendersByApp() {
    const cacheKey = 'dailyActiveSpendersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveSpendersByApp.findMany().then((entities) => convertDailyActiveSpendersByApp(entities)),
    )
  }

  dailyActiveSpendersEcosystem() {
    const cacheKey = 'dailyActiveSpendersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveSpendersEcosystem
        .findMany()
        .then((entities) => convertDailyActiveSpendersEcosystem(entities)),
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
      this.data.dailyActiveUsersByApp.findMany().then((entities) => convertDailyActiveUsersByApp(entities)),
    )
  }

  dailyActiveUsersEcosystem() {
    const cacheKey = 'dailyActiveUsersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUsersEcosystem.findMany().then((entities) => convertDailyActiveUsersEcosystem(entities)),
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

  dailyVolatilityFactorX() {
    const cacheKey = 'dailyVolatilityFactorX'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyVolatilityFactor.findMany().then((entities) => convertDailyVolatilityFactor(entities)),
    )
  }

  monthlyActiveEarnersByApp() {
    const cacheKey = 'monthlyActiveEarnersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveEarnersByApp.findMany().then((entities) => convertMonthlyActiveEarnersByApp(entities)),
    )
  }

  monthlyActiveEarnersEcosystem() {
    const cacheKey = 'monthlyActiveEarnersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveEarnersEcosystem
        .findMany()
        .then((entities) => convertMonthlyActiveEarnersEcosystem(entities)),
    )
  }

  monthlyActiveSpendersByApp() {
    const cacheKey = 'monthlyActiveSpendersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveSpendersByApp.findMany().then((entities) => convertMonthlyActiveSpendersByApp(entities)),
    )
  }

  monthlyActiveSpendersEcosystem() {
    const cacheKey = 'monthlyActiveSpendersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveSpendersEcosystem
        .findMany()
        .then((entities) => convertMonthlyActiveSpendersEcosystem(entities)),
    )
  }

  monthlyActiveUsersByApp() {
    const cacheKey = 'monthlyActiveUsersByApp'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveUsersByApp.findMany().then((entities) => convertMonthlyActiveUsersByApp(entities)),
    )
  }

  monthlyActiveUsersEcosystem() {
    const cacheKey = 'monthlyActiveUsersEcosystem'
    return this.getCachedData(cacheKey, () =>
      this.data.monthlyActiveUsersEcosystem.findMany().then((entities) => convertMonthlyActiveUsersEcosystem(entities)),
    )
  }

  dailyActiveUserBalance() {
    const cacheKey = 'dailyActiveUserBalance'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyActiveUserBalanceByApp
        .findMany()
        .then((entities) => formatDailyActiveUserBalanceEntities(entities)),
    )
  }

  dailyVolatilityFactor() {
    const cacheKey = 'dailyVolatilityFactor'
    return this.getCachedData(cacheKey, () =>
      this.data.dailyVolatilityFactor.findMany().then((entities) => formatDailyVolatilityFactorEntities(entities)),
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
