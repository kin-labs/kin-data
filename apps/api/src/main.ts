import { ApiCoreUtilService, redirectSSL } from '@kin-data/api/core/util'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { writeFileSync } from 'fs-extra'
import { AppModule } from './app/app.module'

async function bootstrap() {
  writeFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.GOOGLE_CREDENTIALS)
  const app = await NestFactory.create(AppModule)
  const config = app.get(ApiCoreUtilService)
  const globalPrefix = 'api'
  app.use(redirectSSL({ enabled: config.production }))
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.PORT || 4000
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix)
    Logger.log('Listening at http://localhost:' + port + '/graphql')
  })
}

bootstrap()
