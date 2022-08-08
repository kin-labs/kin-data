import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import * as LRU from 'lru-cache'
import { formatDailyActiveUserBalanceEntities } from './helpers/convert-daily-active-user-balance-entities'
import { formatDailyVolatilityFactorEntities } from './helpers/convert-daily-volatility-factor-entities'

@Injectable()
export class ApiUnstableDataAccessService {
  private readonly cache = new LRU<string, any>({ maxAge: 1000 * 60 })
  private readonly logger = new Logger(ApiUnstableDataAccessService.name)
  constructor(private readonly data: ApiCoreDataAccessService) {}

  dailyActiveUserBalance() {
    return this.getCachedData('dailyActiveUserBalance', () =>
      this.data.dailyActiveUserBalanceByApp
        .findMany()
        .then((entities) => formatDailyActiveUserBalanceEntities(entities)),
    )
  }

  dailyVolatilityFactor() {
    return this.getCachedData('dailyVolatilityFactor', () =>
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
