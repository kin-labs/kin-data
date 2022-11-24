import {
  ApiStatsDataAccessService,
  DailySummaryApps,
  DailySummaryEcosystem,
  KrePayoutSummary,
  KreStat,
  KreSummary,
} from '@kin-data/api/stats/data-access'
import { KreStatRange } from '@kin-data/api/unstable/data-access'
import { Param } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiStatsFeatureResolver {
  constructor(private readonly service: ApiStatsDataAccessService) {}

  @Query(() => [DailySummaryApps])
  dailySummaryApps(@Param('range') range: KreStatRange) {
    return this.service.dailySummaryApps({ range })
  }

  @Query(() => [DailySummaryEcosystem])
  dailySummaryEcosystem(@Param('range') range: KreStatRange) {
    return this.service.dailySummaryEcosystem({ range })
  }

  @Query(() => [KrePayoutSummary])
  krePayoutSummary() {
    return this.service.krePayoutSummary()
  }

  @Query(() => [String])
  krePayoutSummaryDates() {
    return this.service.krePayoutSummaryDates()
  }

  @Query(() => [KreSummary])
  kreSummary() {
    return this.service.kreSummary()
  }

  @Query(() => [String])
  kreSummaryDates() {
    return this.service.kreSummaryDates()
  }
  // The methods below are from the old stats service and should be deprecated

  @Query(() => [String], { nullable: true })
  kreList() {
    return this.service.kreList()
  }

  @Query(() => [KreStat], { nullable: true })
  kreStatList() {
    return this.service.kreStatList()
  }
}
