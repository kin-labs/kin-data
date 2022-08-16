export interface DailyKinTransactionsEntity {
  date: string
  appIndex: number
  appName: string
  dailyTotalTransactions: number
  dailyTotalAmounts: number
  dailyEarnTransactions: number
  dailyEarnAmounts: number
  dailySpendTransactions: number
  dailySpendAmounts: number
}
