import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { ApiCoreUtilService } from './api-core-util.service'
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
  ],
  providers: [ApiCoreUtilService],
  exports: [ApiCoreUtilService],
})
export class ApiCoreUtilModule {}
