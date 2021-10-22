import { ApiIntegrationBigqueryService, BigqueryResultModel } from '@kin-data/api/integration/bigquery'
import { Injectable } from '@nestjs/common'
import { latestCreationsQuery, latestPaymentsQuery } from './api-integration-kin-bi.queries'
import { GetLatestCreationsInput } from './dto/get-latest-creations.input'
import { GetLatestPaymentsInput } from './dto/get-latest-payments.input'

@Injectable()
export class ApiIntegrationKinBiService {
  constructor(private readonly bq: ApiIntegrationBigqueryService) {}

  async getLatestCreations(input: GetLatestCreationsInput): Promise<BigqueryResultModel> {
    return this.bq.cacheQuery(latestCreationsQuery(input))
  }

  async getLatestPayments(input: GetLatestPaymentsInput): Promise<BigqueryResultModel> {
    return this.bq.cacheQuery(latestPaymentsQuery(input))
  }
}
