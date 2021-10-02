import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ApiCoreUtilService {
  constructor(public readonly config: ConfigService) {}

  uptime(): number {
    return process.uptime()
  }

  get apiUrl(): string {
    return this.config.get('apiUrl')
  }

  get apiCorsOrigins(): string[] {
    return this.config.get('api.cors.origin')
  }

  get production(): boolean {
    return this.config.get('environment') === 'production'
  }
}
