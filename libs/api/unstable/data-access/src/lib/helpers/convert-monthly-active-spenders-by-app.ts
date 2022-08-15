import { MonthlyActiveSpendersByApp } from '@prisma/client'
import { MonthlyActiveSpendersByAppEntity } from '../entity'

export function convertMonthlyActiveSpendersByApp(items: MonthlyActiveSpendersByApp[]) {
  return items.map((item) => convertMonthlyActiveSpenderByApp(item))
}

export function convertMonthlyActiveSpenderByApp(item: MonthlyActiveSpendersByApp): MonthlyActiveSpendersByAppEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: item.appName,
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
