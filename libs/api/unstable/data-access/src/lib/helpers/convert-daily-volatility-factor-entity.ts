import { DailyVolatilityFactor } from '@prisma/client'
import { DailyVolatilityFactorEntity } from '../entity'
import { formatDateHelper } from './format-date.helper'

export function convertDailyVolatilityFactor(items: DailyVolatilityFactor[]) {
  return items.map((item) => convertDailyVolatilityFactorEntity(item))
}

export function convertDailyVolatilityFactorEntity(item: DailyVolatilityFactor): DailyVolatilityFactorEntity {
  return {
    averagePrice: item.averagePrice?.toString(),
    averagePriceDeviation: item.averagePriceDeviation?.toString(),
    date: formatDateHelper(item.date),
    totalPriceDeviation: item.totalPriceDeviation?.toString(),
    volatilityFactor: item.volatilityFactor?.toString(),
  }
}
