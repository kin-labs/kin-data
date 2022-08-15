export interface MonthlyActiveUsersByAppEntity {
  id: number
  date: Date
  appIndex: number
  appName: string
  walletCount: number
}
