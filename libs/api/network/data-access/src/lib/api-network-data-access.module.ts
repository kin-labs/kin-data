import { Module } from '@nestjs/common'
import { ApiNetworkDataAccessService } from './api-network-data-access.service'
import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'

@Module({
  controllers: [],
  providers: [ApiNetworkDataAccessService],
  exports: [ApiNetworkDataAccessService],
  imports: [ApiCoreDataAccessModule],
})
export class ApiNetworkDataAccessModule {}
