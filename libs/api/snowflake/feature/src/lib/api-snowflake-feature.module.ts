import { ApiSnowflakeDataAccessModule } from '@kin-data/api/snowflake/data-access'
import { Module } from '@nestjs/common'
import { ApiSnowflakeFeatureController } from './api-snowflake-feature.controller'

@Module({
  controllers: [ApiSnowflakeFeatureController],
  imports: [ApiSnowflakeDataAccessModule],
})
export class ApiSnowflakeFeatureModule {}
