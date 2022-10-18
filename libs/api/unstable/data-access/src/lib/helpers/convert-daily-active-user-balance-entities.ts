import { DailyActiveUserBalanceByApp } from '@prisma/client'
import { DailyActiveUserBalanceEntity } from '../entity/daily-active-user-balance.entity'

export function formatDailyActiveUserBalanceEntities(
  items: DailyActiveUserBalanceByApp[],
): DailyActiveUserBalanceEntity[] {
  return items.map((item) => formatDailyActiveUserBalanceEntity(item))
}

export function formatDailyActiveUserBalanceEntity(item: DailyActiveUserBalanceByApp): DailyActiveUserBalanceEntity {
  return {
    id: Number(item.id),
    date: item.date,
    appIndex: Number(item.appIndex),
    au: Number(item.au),
    aub: Number(item.aub),
    cappedAub: Number(item.cappedAub),
    name: item.appName,
  }
}
