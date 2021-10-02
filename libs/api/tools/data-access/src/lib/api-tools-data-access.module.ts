import { Module } from '@nestjs/common'
import { ApiToolsDataAccessService } from './api-tools-data-access.service'

@Module({
  providers: [ApiToolsDataAccessService],
  exports: [ApiToolsDataAccessService],
})
export class ApiToolsDataAccessModule {}
