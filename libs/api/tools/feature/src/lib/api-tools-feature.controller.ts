import { Controller, Get } from '@nestjs/common'
import { ApiToolsDataAccessService } from '@kin-data/api/tools/data-access'

@Controller('tools')
export class ApiToolsFeatureController {
  constructor(private readonly service: ApiToolsDataAccessService) {}

  @Get('circulation')
  publicCirculation() {
    return this.service.getCirculation()
  }

  @Get('supply')
  supply() {
    return this.service.getSupply()
  }

  @Get('total-supply')
  totalSupply() {
    return this.service.getTotalSupply()
  }
}
