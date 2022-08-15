import { DailyKinTransactions } from '@prisma/client'
import { DailyKinTransactionsEntity } from '../entity'

export function convertDailyKinTransactions(items: DailyKinTransactions[]) {
  return items.map((item) => convertDailyKinTransaction(item))
}

export function convertDailyKinTransaction(item: DailyKinTransactions): DailyKinTransactionsEntity {
  return {
    appIndex: Number(item.appIndex),
    appName: item.appName,
    dailyEarnAmounts: Number(item.dailyEarnAmounts),
    dailyEarnTransactions: Number(item.dailyEarnTransactions),
    dailySpendAmounts: Number(item.dailySpendAmounts),
    dailySpendTransactions: Number(item.dailySpendTransactions),
    dailyTotalAmounts: Number(item.dailyTotalAmounts),
    dailyTotalTransactions: Number(item.dailyTotalTransactions),
    date: item.date,
    id: Number(item.id),
  }
}
