import { Module } from '@nestjs/common'
import { ApiIntegrationBigqueryService } from './api-integration-bigquery.service'

@Module({
  providers: [ApiIntegrationBigqueryService],
  exports: [ApiIntegrationBigqueryService],
})
export class ApiIntegrationBigqueryModule {}
