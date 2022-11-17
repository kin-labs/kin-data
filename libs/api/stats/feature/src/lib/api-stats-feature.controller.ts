import { ApiStatsDataAccessService, KreStatsInput } from '@kin-data/api/stats/data-access'
import { Controller, Get, Query } from '@nestjs/common'

@Controller('stats')
export class ApiStatsFeatureController {
  constructor(private readonly service: ApiStatsDataAccessService) {}

  @Get('payout-summary')
  payoutSummary(@Query('date') date?: string) {
    return this.service.payoutSummary(date)
  }

  @Get('payout-summary-dates')
  payoutSummaryDates() {
    return this.service.payoutSummaryDates()
  }

  @Get('summary')
  summary(@Query('date') date?: string) {
    return this.service.summary(date)
  }

  @Get('summary-dates')
  summaryDates() {
    return this.service.summaryDates()
  }

  // The methods below are from the old stats service and should be deprecated
  @Get('active-user-balances')
  activeUserBalances() {
    return this.service.activeUserBalances()
  }

  @Get('daily-spend-transactions')
  dailySpendTransactions() {
    return this.service.dailySpendTransactions()
  }

  @Get('kre')
  kre(@Query() query: KreStatsInput) {
    return this.service.kreStats(query)
  }

  @Get('kre-list')
  kreList() {
    return this.service.kreList()
  }

  @Get('last-txs')
  lastTxs() {
    return this.service.lastTxs()
  }

  @Get('monthly-active-earners')
  monthlyActiveEarners() {
    return this.service.monthlyActiveEarners()
  }

  @Get('monthly-active-spenders')
  monthlyActiveSpenders() {
    return this.service.monthlyActiveSpenders()
  }

  @Get('payouts')
  payouts() {
    return this.service.payouts()
  }

  @Get('total-active-earners')
  totalActiveEarners() {
    return this.service.totalActiveEarners()
  }

  @Get('total-active-spenders')
  totalActiveSpenders() {
    return this.service.totalActiveSpenders()
  }

  @Get('total-wallets')
  totalWallets() {
    return this.service.totalWallets()
  }

  @Get('transactions-per-second')
  transactionsPerSecond() {
    return this.service.transactionsPerSecond()
  }

  @Get('tx-per-day')
  txPerDay() {
    return this.service.txPerDay()
  }

  @Get('tx-per-day-summary')
  txPerDaySummary() {
    return this.service.txPerDaySummary()
  }

  @Get('wallets-created')
  walletsCreated() {
    return this.service.walletsCreated()
  }
}
