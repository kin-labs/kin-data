import { Module } from '@nestjs/common'
import { ApiEcosystemDataAccessService } from './api-ecosystem-data-access.service'

@Module({
  providers: [ApiEcosystemDataAccessService],
  exports: [ApiEcosystemDataAccessService],
})
export class ApiEcosystemDataAccessModule {}
