import { ApiCoreFeatureModule } from '@kin-data/api/core/feature'
import { Module } from '@nestjs/common'

@Module({
  imports: [ApiCoreFeatureModule],
})
export class AppModule {}
