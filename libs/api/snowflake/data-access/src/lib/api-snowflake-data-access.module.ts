import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiSnowflakeDataAccessService } from './api-snowflake-data-access.service'

@Module({
  exports: [ApiSnowflakeDataAccessService],
  imports: [ApiCoreDataAccessModule],
  providers: [ApiSnowflakeDataAccessService],
})
export class ApiSnowflakeDataAccessModule {}
