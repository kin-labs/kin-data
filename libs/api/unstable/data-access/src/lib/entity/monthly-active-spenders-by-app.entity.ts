export interface MonthlyActiveSpendersByAppEntity {
  id: number
  date: Date
  appIndex: number
  appName: string
  walletCount: number
}
