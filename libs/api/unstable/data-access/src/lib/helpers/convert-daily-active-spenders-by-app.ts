import { DailyActiveEarnersByApp, DailyActiveSpendersByApp } from '@prisma/client'
import { DailyActiveEarnersByAppEntity } from '../entity'

export function convertDailyActiveSpendersByApp(items: DailyActiveSpendersByApp[]) {
  return items.map((item) => convertDailyActiveSpenderByApp(item))
}

export function convertDailyActiveSpenderByApp(item: DailyActiveEarnersByApp): DailyActiveEarnersByAppEntity {
  return {
    id: Number(item.id),
    date: item.date,
    appIndex: Number(item.appIndex),
    appName: item.appName,
    walletCount: Number(item.walletCount),
  }
}
