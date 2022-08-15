import { MonthlyActiveUsersByApp } from '@prisma/client'
import { MonthlyActiveUsersByAppEntity } from '../entity'

export function convertMonthlyActiveUsersByApp(items: MonthlyActiveUsersByApp[]) {
  return items.map((item) => convertMonthlyActiveUserByApp(item))
}

export function convertMonthlyActiveUserByApp(item: MonthlyActiveUsersByApp): MonthlyActiveUsersByAppEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: item.appName,
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
