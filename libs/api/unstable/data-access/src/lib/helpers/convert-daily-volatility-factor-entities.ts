import { DailyVolatilityFactor } from '@prisma/client'
import { DailyVolatilityFactorEntity } from '../entity/daily-volatility-factor.entity'

export function formatDailyVolatilityFactorEntities(items: DailyVolatilityFactor[]): DailyVolatilityFactorEntity[] {
  return items.map((item) => formatDailyVolatilityFactorEntity(item))
}

export function formatDailyVolatilityFactorEntity(item: DailyVolatilityFactor): DailyVolatilityFactorEntity {
  return {
    averagePrice: item.averagePrice?.toString(),
    averagePriceDeviation: item.averagePriceDeviation?.toString(),
    date: item.date,
    id: Number(item.id),
    totalPriceDeviation: item.totalPriceDeviation.toString(),
    volatilityFactor: item.totalPriceDeviation.toString(),
  }
}
