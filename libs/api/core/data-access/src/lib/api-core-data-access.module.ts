import { ApiCoreUtilModule } from '@kin-data/api/core/util'
import { Module } from '@nestjs/common'
import { ApiCoreDataAccessService } from './api-core-data-access.service'

@Module({
  imports: [ApiCoreUtilModule],
  providers: [ApiCoreDataAccessService],
  exports: [ApiCoreDataAccessService],
})
export class ApiCoreDataAccessModule {}
