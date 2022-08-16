import { ApiUnstableDataAccessService, KreStatRange } from '@kin-data/api/unstable/data-access'
import { Controller, Get, Param, Query } from '@nestjs/common'

@Controller('unstable')
export class ApiUnstableFeatureController {
  constructor(private readonly service: ApiUnstableDataAccessService) {}

  @Get('kre-stats')
  kreStats() {
    return this.service.kreStats()
  }

  @Get('kre-stat/:statId')
  kreStat(@Param('statId') statId: string, @Query('range') range: KreStatRange) {
    return this.service.kreStat(statId, range)
  }
}
