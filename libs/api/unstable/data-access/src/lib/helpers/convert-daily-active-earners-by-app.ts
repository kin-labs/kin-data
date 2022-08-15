import { DailyActiveEarnersByApp } from '@prisma/client'
import { DailyActiveEarnersByAppEntity } from '../entity'

export function convertDailyActiveEarnersByApp(items: DailyActiveEarnersByApp[]) {
  return items.map((item) => convertDailyActiveEarnerByApp(item))
}

export function convertDailyActiveEarnerByApp(item: DailyActiveEarnersByApp): DailyActiveEarnersByAppEntity {
  return {
    id: Number(item.id),
    date: item.date,
    appIndex: Number(item.appIndex),
    appName: item.appName,
    walletCount: Number(item.walletCount),
  }
}
