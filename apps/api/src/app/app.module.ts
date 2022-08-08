import { ApiCoreFeatureModule } from '@kin-data/api/core/feature'
import { Logger, Module } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'
import { ensureDirSync, existsSync, writeFileSync } from 'fs-extra'
import { join } from 'path'

const rootPath = join(__dirname, '..', 'web')

@Module({
  imports: [
    ApiCoreFeatureModule,
    ServeStaticModule.forRoot({
      rootPath,
      exclude: ['/api/*', '/graphql'],
    }),
  ],
})
export class AppModule {
  constructor() {
    if (!existsSync(rootPath)) {
      ensureDirSync(rootPath)
      writeFileSync(join(rootPath, 'index.html'), `<pre>kin-data api</pre>`)
      Logger.verbose(`Created static root path ${rootPath}`)
    }
  }
}
