import { ApiUnstableDataAccessModule } from '@kin-data/api/unstable/data-access'
import { Module } from '@nestjs/common'
import { ApiUnstableFeatureController } from './api-unstable-feature.controller'

@Module({
  controllers: [ApiUnstableFeatureController],
  imports: [ApiUnstableDataAccessModule],
})
export class ApiUnstableFeatureModule {}
