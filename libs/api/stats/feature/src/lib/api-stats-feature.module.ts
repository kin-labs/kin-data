import { ApiStatsDataAccessModule } from '@kin-data/api/stats/data-access'
import { Module } from '@nestjs/common'
import { ApiStatsFeatureController } from './api-stats-feature.controller'
import { ApiStatsFeatureResolver } from './api-stats-feature.resolver'

@Module({
  controllers: [ApiStatsFeatureController],
  providers: [ApiStatsFeatureResolver],
  imports: [ApiStatsDataAccessModule],
})
export class ApiStatsFeatureModule {}
