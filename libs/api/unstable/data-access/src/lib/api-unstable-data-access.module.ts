import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiUnstableDataAccessService } from './api-unstable-data-access.service'

@Module({
  exports: [ApiUnstableDataAccessService],
  imports: [ApiCoreDataAccessModule],
  providers: [ApiUnstableDataAccessService],
})
export class ApiUnstableDataAccessModule {}
