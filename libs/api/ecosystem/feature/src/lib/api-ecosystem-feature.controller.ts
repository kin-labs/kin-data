import { ApiEcosystemDataAccessService } from '@kin-data/api/ecosystem/data-access'
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('ecosystem')
export class ApiEcosystemFeatureController {
  constructor(private readonly service: ApiEcosystemDataAccessService) {}

  @Get('apps/:index')
  app(@Param('index', ParseIntPipe) index: number) {
    return this.service.app(index)
  }

  @Get('apps')
  apps() {
    return this.service.apps()
  }

  @Get('sdks')
  sdks() {
    return this.service.sdks()
  }
}
