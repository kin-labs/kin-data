import { DailyKinPayout } from '@prisma/client'
import { DailyKinPayoutEntity } from '../entity'

export function convertDailyKinPayout(items: DailyKinPayout[]) {
  return items.map((item) => convertDailyKinPayoutEntity(item))
}
export function convertDailyKinPayoutEntity(item: DailyKinPayout): DailyKinPayoutEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: item.appName,
    date: item.date,
    id: Number(item.id),
    postMonopolyAppShare: Number(item.postMonopolyAppShare),
    postMonopolyPayout: Number(item.postMonopolyPayout),
    postMonopolyPayoutUsd: Number(item.postMonopolyPayoutUsd),
    preMonopolyPayout: Number(item.preMonopolyPayout),
    preMonopolyShare: Number(item.preMonopolyShare),
    preVfPayout: item.preVfPayout,
  }
}
