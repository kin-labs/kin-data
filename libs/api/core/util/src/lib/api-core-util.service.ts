import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConnectionOptions } from 'snowflake-sdk'

@Injectable()
export class ApiCoreUtilService {
  constructor(public readonly config: ConfigService) {}

  uptime(): number {
    return process.uptime()
  }

  get apiUrl(): string {
    return this.config.get('api.url')
  }

  get apiCorsOrigins(): string[] {
    return this.config.get('api.cors.origin')
  }

  get prefix(): string {
    return 'api'
  }

  get production(): boolean {
    return this.config.get('environment') === 'production'
  }

  get snowflake(): ConnectionOptions {
    return {
      account: this.config.get('snowflake.account'),
      database: this.config.get('snowflake.database'),
      password: this.config.get('snowflake.password'),
      role: this.config.get('snowflake.role'),
      schema: this.config.get('snowflake.schema'),
      username: this.config.get('snowflake.username'),
      warehouse: this.config.get('snowflake.warehouse'),
    }
  }
}
