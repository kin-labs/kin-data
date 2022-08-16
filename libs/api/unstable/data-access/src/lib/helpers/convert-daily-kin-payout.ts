import { DailyKinPayout } from '@prisma/client'
import { DailyKinPayoutEntity } from '../entity'
import { formatDateHelper } from './format-date.helper'
import { formatNameHelper } from './format-name.helper'

export function convertDailyKinPayout(items: DailyKinPayout[]) {
  return items.map((item) => convertDailyKinPayoutEntity(item))
}
export function convertDailyKinPayoutEntity(item: DailyKinPayout): DailyKinPayoutEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: formatNameHelper(item),
    date: formatDateHelper(item.date),
    postMonopolyAppShare: Number(item.postMonopolyAppShare),
    postMonopolyPayout: Number(item.postMonopolyPayout),
    postMonopolyPayoutUsd: Number(item.postMonopolyPayoutUsd),
    preMonopolyPayout: Number(item.preMonopolyPayout),
    preMonopolyShare: Number(item.preMonopolyShare),
    preVfPayout: item.preVfPayout,
  }
}
