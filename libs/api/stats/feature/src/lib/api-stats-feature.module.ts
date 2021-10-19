import { ApiStatsDataAccessModule } from '@kin-data/api/stats/data-access'
import { Module } from '@nestjs/common'
import { ApiStatsFeatureController } from './api-stats-feature.controller'

@Module({
  controllers: [ApiStatsFeatureController],
  imports: [ApiStatsDataAccessModule],
})
export class ApiStatsFeatureModule {}
