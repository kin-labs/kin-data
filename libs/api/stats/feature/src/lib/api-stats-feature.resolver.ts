import { ApiStatsDataAccessService, KreStat } from '@kin-data/api/stats/data-access'
import { Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiStatsFeatureResolver {
  constructor(private readonly service: ApiStatsDataAccessService) {}

  @Query(() => [String], { nullable: true })
  kreList() {
    return this.service.kreList()
  }

  @Query(() => [KreStat], { nullable: true })
  kreStatList() {
    return this.service.kreStatList()
  }
}
