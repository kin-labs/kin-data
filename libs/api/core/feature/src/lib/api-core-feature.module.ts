import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'
import { ApiCoreUtilModule } from '@kin-data/api/core/util'
import { ApiStatsFeatureModule } from '@kin-data/api/stats/feature'
import { ApiToolsFeatureModule } from '@kin-data/api/tools/feature'
import { Module } from '@nestjs/common'
import { ApiCoreFeatureController } from './api-core-feature.controller'

@Module({
  controllers: [ApiCoreFeatureController],
  imports: [ApiCoreDataAccessModule, ApiCoreUtilModule, ApiStatsFeatureModule, ApiToolsFeatureModule],
})
export class ApiCoreFeatureModule {}