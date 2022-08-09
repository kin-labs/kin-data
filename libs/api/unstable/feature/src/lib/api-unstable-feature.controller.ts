import { ApiUnstableDataAccessService } from '@kin-data/api/unstable/data-access'
import { Controller, Get } from '@nestjs/common'

@Controller('unstable')
export class ApiUnstableFeatureController {
  constructor(private readonly service: ApiUnstableDataAccessService) {}

  @Get('daily-active-user-balance')
  dailyActiveUserBalance() {
    return this.service.dailyActiveUserBalance()
  }

  @Get('daily-volatility-factor')
  dailyVolatilityFactor() {
    return this.service.dailyVolatilityFactor()
  }
}
