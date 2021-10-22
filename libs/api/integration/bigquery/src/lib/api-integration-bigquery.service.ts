import { BigQuery } from '@google-cloud/bigquery'
import { Injectable, Logger } from '@nestjs/common'
import * as LRU from 'lru-cache'
import { generateMd5Hash } from './api-integration-bigquery.helpers'
import { BigqueryResultModel } from './models/bigquery-result.model'

@Injectable()
export class ApiIntegrationBigqueryService {
  private readonly bq: BigQuery
  private readonly cache = new LRU<string, any>({ maxAge: 1000 * 60 })
  private readonly logger = new Logger('ApiIntegrationBigqueryService')

  constructor() {
    if (process.env?.GOOGLE_CREDENTIALS !== '') {
      this.bq = new BigQuery()
    } else {
      this.logger.verbose(`GOOGLE_CREDENTIALS is empty, skipping gcloud integration`)
    }
  }

  async cacheQuery(query): Promise<BigqueryResultModel> {
    const key = generateMd5Hash(query)
    const cached = this.cache.has(key)
    if (!cached) {
      const items = await this.runQuery(query)
      this.cache.set(key, {
        items,
        query,
        cached,
        count: items?.length,
      })
    }
    return { ...this.cache.get(key), cached }
  }

  async runQuery(query: string) {
    return this.bq.query(query).then((res) => res[0])
  }
}
