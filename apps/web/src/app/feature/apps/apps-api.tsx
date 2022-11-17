export interface EcosystemApp {
  appleUrl: string
  description: string
  discovery: boolean
  googleUrl: string
  imageUrl: string
  websiteUrl: string
  index: number
  name: string
  status: string
}

export class AppsApi {
  static basePath = '/api/ecosystem/apps'
  static async getItem(index?: string | number): Promise<EcosystemApp> {
    return fetch(`${AppsApi.basePath}/${index}`).then((r) => r.json())
  }

  static async getItems(): Promise<EcosystemApp[]> {
    console.log('this.basePath', this.basePath)
    return fetch(AppsApi.basePath).then((r) => r.json())
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
