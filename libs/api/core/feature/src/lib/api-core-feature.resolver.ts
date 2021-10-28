import { ApiCoreDataAccessService } from '@kin-data/api/core/data-access'
import { Float, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiCoreFeatureResolver {
  constructor(private readonly service: ApiCoreDataAccessService) {}

  @Query(() => Float, { nullable: true })
  uptime() {
    return this.service.uptime()
  }
}
