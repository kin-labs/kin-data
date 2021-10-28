import { Module } from '@nestjs/common'

import { ApiStatsDataAccessService } from './api-stats-data-access.service'
import { BigQueryStatsService } from './big-query-stats.service'

@Module({
  providers: [ApiStatsDataAccessService, BigQueryStatsService],
  exports: [ApiStatsDataAccessService],
})
export class ApiStatsDataAccessModule {}
