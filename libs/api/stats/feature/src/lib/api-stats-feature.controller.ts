import { ApiStatsDataAccessService } from '@kin-data/api/stats/data-access'
import { Controller, Get } from '@nestjs/common'

@Controller('stats')
export class ApiStatsFeatureController {
  constructor(private readonly service: ApiStatsDataAccessService) {}

  @Get()
  index() {
    return this.service.index()
  }
}
