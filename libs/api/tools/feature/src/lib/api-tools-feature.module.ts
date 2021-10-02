import { ApiToolsDataAccessModule } from '@kin-data/api/tools/data-access'
import { Module } from '@nestjs/common'
import { ApiToolsFeatureController } from './api-tools-feature.controller'

@Module({
  controllers: [ApiToolsFeatureController],
  imports: [ApiToolsDataAccessModule],
})
export class ApiToolsFeatureModule {}
