import { ApiIntegrationBigqueryModule } from '@kin-data/api/integration/bigquery'
import { Module } from '@nestjs/common'
import { ApiIntegrationKinBiController } from './api-integration-kin-bi.controller'
import { ApiIntegrationKinBiService } from './api-integration-kin-bi.service'

@Module({
  imports: [ApiIntegrationBigqueryModule],
  controllers: [ApiIntegrationKinBiController],
  providers: [ApiIntegrationKinBiService],
})
export class ApiIntegrationKinBiModule {}
