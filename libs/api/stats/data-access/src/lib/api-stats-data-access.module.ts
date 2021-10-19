import { Module } from '@nestjs/common'
import { ApiStatsDataAccessService } from './api-stats-data-access.service'

@Module({
  providers: [ApiStatsDataAccessService],
  exports: [ApiStatsDataAccessService],
})
export class ApiStatsDataAccessModule {}
