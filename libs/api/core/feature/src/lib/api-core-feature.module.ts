import { ApiCoreDataAccessModule } from '@kin-data/api/core/data-access'
import { ApiCoreUtilModule } from '@kin-data/api/core/util'
import { ApiEcosystemFeatureModule } from '@kin-data/api/ecosystem/feature'
import { ApiIntegrationKinBiModule } from '@kin-data/api/integration/kin-bi'
import { ApiNetworkFeatureModule } from '@kin-data/api/network/feature'
import { ApiSnowflakeFeatureModule } from '@kin-data/api/snowflake/feature'
import { ApiStatsFeatureModule } from '@kin-data/api/stats/feature'
import { ApiToolsFeatureModule } from '@kin-data/api/tools/feature'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { ApiCoreFeatureController } from './api-core-feature.controller'
import { ApiCoreFeatureResolver } from './api-core-feature.resolver'

@Module({
  controllers: [ApiCoreFeatureController],
  providers: [ApiCoreFeatureResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
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
    ApiEcosystemFeatureModule,
    ApiIntegrationKinBiModule,
    ApiNetworkFeatureModule,
    ApiSnowflakeFeatureModule,
    ApiStatsFeatureModule,
    ApiToolsFeatureModule,
  ],
})
export class ApiCoreFeatureModule {}
