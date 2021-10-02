import { ApiCoreUtilService } from '@kin-data/api/core/util'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const redirectSSL = require('redirect-ssl')

import { AppModule } from './app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ApiCoreUtilService)
  const globalPrefix = 'api'
  app.use(redirectSSL.create({ enabled: config.production }))
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 4000
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
  })
}

bootstrap()
