import { ApiEcosystemDataAccessModule } from '@kin-data/api/ecosystem/data-access'
import { Module } from '@nestjs/common'
import { ApiEcosystemFeatureController } from './api-ecosystem-feature.controller'

@Module({
  controllers: [ApiEcosystemFeatureController],
  imports: [ApiEcosystemDataAccessModule],
  providers: [],
})
export class ApiEcosystemFeatureModule {}
