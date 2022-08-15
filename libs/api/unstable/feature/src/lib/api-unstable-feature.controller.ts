import { ApiUnstableDataAccessService } from '@kin-data/api/unstable/data-access'
import { Controller, Get } from '@nestjs/common'

@Controller('unstable')
export class ApiUnstableFeatureController {
  constructor(private readonly service: ApiUnstableDataAccessService) {}

  @Get('daily-active-earners-by-app')
  dailyActiveEarnersByApp() {
    return this.service.dailyActiveEarnersByApp()
  }

  @Get('daily-active-earners-ecosystem')
  dailyActiveEarnersEcosystem() {
    return this.service.dailyActiveEarnersEcosystem()
  }

  @Get('daily-active-spenders-by-app')
  dailyActiveSpendersByApp() {
    return this.service.dailyActiveSpendersByApp()
  }

  @Get('daily-active-spenders-ecosystem')
  dailyActiveSpendersEcosystem() {
    return this.service.dailyActiveSpendersEcosystem()
  }

  @Get('daily-active-user-balance-by-app')
  dailyActiveUserBalanceByApp() {
    return this.service.dailyActiveUserBalanceByApp()
  }

  @Get('daily-active-users-by-app')
  dailyActiveUsersByApp() {
    return this.service.dailyActiveUsersByApp()
  }

  @Get('daily-active-users-ecosystem')
  dailyActiveUsersEcosystem() {
    return this.service.dailyActiveUsersEcosystem()
  }

  @Get('daily-kin-payout')
  dailyKinPayout() {
    return this.service.dailyKinPayout()
  }

  @Get('daily-kin-transactions')
  dailyKinTransactions() {
    return this.service.dailyKinTransactions()
  }

  @Get('daily-volatility-factor-x')
  dailyVolatilityFactorX() {
    return this.service.dailyVolatilityFactorX()
  }

  @Get('monthly-active-earners-by-app')
  monthlyActiveEarnersByApp() {
    return this.service.monthlyActiveEarnersByApp()
  }

  @Get('monthly-active-earners-ecosystem')
  monthlyActiveEarnersEcosystem() {
    return this.service.monthlyActiveEarnersEcosystem()
  }

  @Get('monthly-active-spenders-by-app')
  monthlyActiveSpendersByApp() {
    return this.service.monthlyActiveSpendersByApp()
  }

  @Get('monthly-active-spenders-ecosystem')
  monthlyActiveSpendersEcosystem() {
    return this.service.monthlyActiveSpendersEcosystem()
  }

  @Get('monthly-active-users-by-app')
  monthlyActiveUsersByApp() {
    return this.service.monthlyActiveUsersByApp()
  }

  @Get('monthly-active-users-ecosystem')
  monthlyActiveUsersEcosystem() {
    return this.service.monthlyActiveUsersEcosystem()
  }

  @Get('daily-active-user-balance')
  dailyActiveUserBalance() {
    return this.service.dailyActiveUserBalance()
  }

  @Get('daily-volatility-factor')
  dailyVolatilityFactor() {
    return this.service.dailyVolatilityFactor()
  }
}
