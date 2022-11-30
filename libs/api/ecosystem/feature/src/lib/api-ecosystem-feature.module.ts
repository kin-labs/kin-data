import { ApiEcosystemDataAccessModule } from '@kin-data/api/ecosystem/data-access'
import { Module } from '@nestjs/common'
import { ApiEcosystemFeatureController } from './api-ecosystem-feature.controller'
import { ApiEcosystemFeatureResolver } from './api-ecosystem-feature.resolver'

@Module({
  controllers: [ApiEcosystemFeatureController],
  imports: [ApiEcosystemDataAccessModule],
  providers: [ApiEcosystemFeatureResolver],
})
export class ApiEcosystemFeatureModule {}
