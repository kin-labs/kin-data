import { Injectable } from '@nestjs/common'
import got from 'got'
import * as LRU from 'lru-cache'
import { EcosystemApp } from './ecosystem-app'
import { EcosystemSdk } from './ecosystem-sdk'

const APPS_TOKEN = 'APPS_TOKEN'
const SDKS_TOKEN = 'SDKS_TOKEN'

@Injectable()
export class ApiEcosystemDataAccessService {
  private readonly baseUrl = 'https://portal.kin.org/api'
  private readonly appsCache = new LRU<string, EcosystemApp[]>({ maxAge: 1000 * 60 * 60 * 24 })
  private readonly sdksCache = new LRU<string, EcosystemSdk[]>({ maxAge: 1000 * 60 * 60 * 24 })

  async app(index: number) {
    const apps = await this.getApps()

    const found = apps?.find((app) => {
      return app.index === index
    })

    return found ? found : ({ index, name: `App ${index}`, status: 'Inactive' } as EcosystemApp)
  }

  async apps() {
    const apps = await this.getApps()

    return apps.filter((app) => app.status === 'Active' && app.discovery)
  }

  async sdks() {
    if (!this.sdksCache.has(SDKS_TOKEN)) {
      const sdks = await got(`${this.baseUrl}/discovery/sdks`).then((res) => JSON.parse(res.body as string))

      this.sdksCache.set(SDKS_TOKEN, sdks)
    }

    return Promise.resolve(this.sdksCache.get(SDKS_TOKEN))
  }

  private async getApps() {
    if (!this.appsCache.has(APPS_TOKEN)) {
      const apps = await got(`${this.baseUrl}/tools/apps`).then((res) => JSON.parse(res.body as string))
      this.appsCache.set(APPS_TOKEN, apps)
    }
    return Promise.resolve(this.appsCache.get(APPS_TOKEN))
  }
}
