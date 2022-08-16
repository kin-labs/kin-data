import { DailyActiveUserBalanceByApp } from '@prisma/client'
import { DailyActiveUserBalanceEntity } from '../entity'
import { formatDateHelper } from './format-date.helper'
import { formatNameHelper } from './format-name.helper'

export function convertDailyActiveUsersBalance(items: DailyActiveUserBalanceByApp[]) {
  return items.map((item) => convertDailyActiveUserBalance(item))
}

export function convertDailyActiveUserBalance(item: DailyActiveUserBalanceByApp): DailyActiveUserBalanceEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: formatNameHelper(item),
    au: Number(item.au),
    aub: Number(item.aub),
    cappedAub: Number(item.cappedAub),
    date: formatDateHelper(item.date),
  }
}
