export interface DailyKinTransactionsEntity {
  id: number
  date: Date
  appIndex: number
  appName: string
  dailyTotalTransactions: number
  dailyTotalAmounts: number
  dailyEarnTransactions: number
  dailyEarnAmounts: number
  dailySpendTransactions: number
  dailySpendAmounts: number
}
