import { Module } from '@nestjs/common'
import { ApiIntegrationKinBiController } from './api-integration-kin-bi.controller'
import { ApiIntegrationKinBiService } from './api-integration-kin-bi.service'

@Module({
  controllers: [ApiIntegrationKinBiController],
  providers: [ApiIntegrationKinBiService],
  exports: [],
})
export class ApiIntegrationKinBiModule {}
