import { ApiEcosystemDataAccessService } from '@kin-data/api/ecosystem/data-access'
import { App } from '@kin-data/api/stats/data-access'
import { Args, Int, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiEcosystemFeatureResolver {
  constructor(private readonly service: ApiEcosystemDataAccessService) {}

  @Query(() => App, { nullable: true })
  app(@Args('index', { type: () => Int }) index: number) {
    return this.service.app(index)
  }

  @Query(() => [App], { nullable: true })
  apps() {
    return this.service.apps()
  }
}
