export interface DailyKinPayoutEntity {
  id: number
  date: Date
  appIndex: number
  appName: string
  preMonopolyShare: number
  preVfPayout: string
  preMonopolyPayout: number
  postMonopolyAppShare: number
  postMonopolyPayout: number
  postMonopolyPayoutUsd: number
}
