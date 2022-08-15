import { DailyActiveUsersByApp } from '@prisma/client'
import { DailyActiveUsersByAppEntity } from '../entity'

export function convertDailyActiveUsersByApp(items: DailyActiveUsersByApp[]) {
  return items.map((item) => convertDailyActiveUserByApp(item))
}

export function convertDailyActiveUserByApp(item: DailyActiveUsersByApp): DailyActiveUsersByAppEntity {
  return {
    id: Number(item.id),
    date: item.date,
    appIndex: Number(item.appIndex),
    appName: item.appName,
    walletCount: Number(item.walletCount),
  }
}
