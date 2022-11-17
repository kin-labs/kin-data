export interface DaySummary {
  date: string
  activeApps: number
  activeUserBalance: number
  activeCappedUserBalance: number
  activeUsers: number
  dailyTransactions: number
  monthlyActiveEarners: number
  monthlyActiveSpenders: number
  monthlyActiveUsers: number
}

export class DaysApi {
  static async getSummary(date?: string): Promise<DaySummary> {
    return fetch(`/api/stats/summary?date=${date}`).then((r) => r.json())
  }

  static async getSummaryDates(): Promise<string[]> {
    return fetch('/api/stats/summary-dates').then((r) => r.json())
  }
}

export function formatNumber(amount: number, digits = 2) {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'Thousand' },
    { value: 1e6, symbol: 'Million' },
    { value: 1e9, symbol: 'Billion' },
    { value: 1e12, symbol: 'Trillion' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return amount >= item.value
    })
  return item ? `${(amount / item.value).toFixed(digits).replace(rx, '$1')}  ${item.symbol}` : '0'
}
