import { ApiStatsDataAccessService, KreStat, KreStatsInput } from '@kin-data/api/stats/data-access'
import { Query, Resolver, Args } from '@nestjs/graphql'
import GraphQLJSON from 'graphql-type-json'

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

  @Query(() => KreStat, { nullable: true })
  kreStat(@Args('stat') stat: KreStatsInput) {
    return this.service.kreStat(stat)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  kreData(@Args('stat') stat: KreStatsInput) {
    return this.service.kreData(stat)
  }

  @Query(() => GraphQLJSON, { nullable: true })
  kreChart(@Args('stat') stat: KreStatsInput) {
    return this.service.kreChart(stat)
  }
}
