import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'
import { ApiCoreUtilModule } from '@kin-data/api/core/util'
import { Module } from '@nestjs/common'
import { ApiCoreFeatureController } from './api-core-feature.controller'

@Module({
  controllers: [ApiCoreFeatureController],
  imports: [ApiCoreDataAccessModule, ApiCoreUtilModule],
})
export class ApiCoreFeatureModule {}
