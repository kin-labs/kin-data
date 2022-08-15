import { MonthlyActiveEarnersByApp } from '@prisma/client'
import { MonthlyActiveEarnersByAppEntity } from '../entity'

export function convertMonthlyActiveEarnersByApp(items: MonthlyActiveEarnersByApp[]) {
  return items.map((item) => convertMonthlyActiveEarnerByApp(item))
}

export function convertMonthlyActiveEarnerByApp(item: MonthlyActiveEarnersByApp): MonthlyActiveEarnersByAppEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: item.appName,
    date: item.date,
    id: Number(item.id),
    walletCount: item.walletCount,
  }
}
