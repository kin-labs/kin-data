import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'
import { ApiCoreUtilModule } from '@kin-data/api/core/util'
import { ApiIntegrationKinBiModule } from '@kin-data/api/integration/kin-bi'
import { ApiStatsFeatureModule } from '@kin-data/api/stats/feature'
import { ApiToolsFeatureModule } from '@kin-data/api/tools/feature'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver],
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'api-schema.graphql'),
      context: ({ req, res }) => ({ req, res }),
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      sortSchema: true,
    }),
    ApiCoreDataAccessModule,
    ApiCoreUtilModule,
    ApiIntegrationKinBiModule,
    ApiStatsFeatureModule,
    ApiToolsFeatureModule,
  ],
})
export class ApiCoreFeatureModule {}
