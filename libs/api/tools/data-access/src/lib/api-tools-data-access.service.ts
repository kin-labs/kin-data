import { circulatingSupply } from '@kin-tools/circulating-supply'
import { Injectable } from '@nestjs/common'
import * as LRU from 'lru-cache'

const CIRCULATING_TOKEN = 'CIRCULATING_TOKEN'

@Injectable()
export class ApiToolsDataAccessService {
  private readonly circulatingCache = new LRU<string, number>({ maxAge: 1000 * 60 * 60 * 24 })

  async getCirculation(): Promise<number> {
    if (!this.circulatingCache.has(CIRCULATING_TOKEN)) {
      const circulating = await circulatingSupply({ etherscanApiKey: process.env.ETHERSCAN_API_KEY })
      this.circulatingCache.set(CIRCULATING_TOKEN, circulating)
    }

    return this.circulatingCache.get(CIRCULATING_TOKEN)
  }
}
