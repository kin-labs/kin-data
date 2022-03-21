import { Module } from '@nestjs/common'
import { ApiNetworkFeatureController } from './api-network-feature.controller'
import { ApiNetworkDataAccessModule } from '@kin-data/api/network/data-access'

@Module({
  controllers: [ApiNetworkFeatureController],
  providers: [],
  exports: [],
  imports: [ApiNetworkDataAccessModule],
})
export class ApiNetworkFeatureModule {}
