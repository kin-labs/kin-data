import { DailyKinTransactions } from '@prisma/client'
import { DailyKinTransactionsEntity } from '../entity'
import { formatDateHelper } from './format-date.helper'
import { formatNameHelper } from './format-name.helper'

export function convertDailyKinTransactions(items: DailyKinTransactions[]) {
  return items.map((item) => convertDailyKinTransaction(item))
}

export function convertDailyKinTransaction(item: DailyKinTransactions): DailyKinTransactionsEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: formatNameHelper(item),
    dailyEarnAmounts: Number(item.dailyEarnAmounts),
    dailyEarnTransactions: Number(item.dailyEarnTransactions),
    dailySpendAmounts: Number(item.dailySpendAmounts),
    dailySpendTransactions: Number(item.dailySpendTransactions),
    dailyTotalAmounts: Number(item.dailyTotalAmounts),
    dailyTotalTransactions: Number(item.dailyTotalTransactions),
    date: formatDateHelper(item.date),
  }
}
