import { DailyActiveUserBalanceByApp } from '@prisma/client'
import { DailyActiveUserBalanceEntity } from '../entity'

export function convertDailyActiveUsersBalance(items: DailyActiveUserBalanceByApp[]) {
  return items.map((item) => convertDailyActiveUserBalance(item))
}

export function convertDailyActiveUserBalance(item: DailyActiveUserBalanceByApp): DailyActiveUserBalanceEntity {
  return {
    appIndex: Number(item.appIndex),
    au: Number(item.au),
    aub: Number(item.aub),
    cappedAub: Number(item.cappedAub),
    date: item.date,
    id: Number(item.id),
    name: item.name,
  }
}
