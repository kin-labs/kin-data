import {
  ApiStatsDataAccessService,
  DailySummaryAppResult,
  DailySummaryEcosystem,
  KrePayoutSummary,
  KreStat,
  KreSummary,
  Stat,
  StatInput,
} from '@kin-data/api/stats/data-access'
import { Args, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiStatsFeatureResolver {
  constructor(private readonly service: ApiStatsDataAccessService) {}

  @Query(() => DailySummaryAppResult)
  dailySummaryApps(@Args('input') input: StatInput) {
    return this.service.dailySummaryApps(input)
  }

  @Query(() => [DailySummaryEcosystem])
  dailySummaryEcosystem(@Args('input') input: StatInput) {
    return this.service.dailySummaryEcosystem(input)
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

  @Query(() => [Stat])
  stats() {
    return this.service.stats()
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
