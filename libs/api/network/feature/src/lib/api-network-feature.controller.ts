import { ApiNetworkDataAccessService } from '@kin-data/api/network/data-access'
import { Controller, Get } from '@nestjs/common'

@Controller('networks')
export class ApiNetworkFeatureController {
  constructor(private readonly service: ApiNetworkDataAccessService) {}

  @Get()
  networks() {
    return this.service.networks
  }
}
