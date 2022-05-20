import { circulatingSupply, KIN_MAX_SUPPLY, totalSupply } from "@kin-data/circulating-supply";
import { Injectable } from "@nestjs/common";
import * as LRU from "lru-cache";

const CIRCULATING_TOKEN = 'CIRCULATING_TOKEN'
const TOTAL_TOKEN = 'TOTAL_TOKEN'

@Injectable()
export class ApiToolsDataAccessService {
  private readonly circulatingCache = new LRU<string, number>({ maxAge: 1000 * 60 * 60 * 24 })
  private readonly totalCache = new LRU<string, number>({ maxAge: 1000 * 60 * 60 * 24 })

  async getCirculation(): Promise<number> {
    if (!this.circulatingCache.has(CIRCULATING_TOKEN)) {
      const circulating = await circulatingSupply({ etherscanApiKey: process.env.ETHERSCAN_API_KEY })
      this.circulatingCache.set(CIRCULATING_TOKEN, circulating)
    }

    return this.circulatingCache.get(CIRCULATING_TOKEN)
  }

  async getSupply(): Promise<{ circulation: number, max: number, total: number}> {
    const [circulation, total] = await Promise.all([
      this.getCirculation(),
      this.getTotalSupply(),
    ])

    return {
      circulation,
      max: KIN_MAX_SUPPLY,
      total,
    }
  }

  async getTotalSupply(): Promise<number> {
    if (!this.totalCache.has(TOTAL_TOKEN)) {
      const total = await totalSupply()
      this.totalCache.set(TOTAL_TOKEN, total)
    }

    return this.totalCache.get(TOTAL_TOKEN)
  }

}
