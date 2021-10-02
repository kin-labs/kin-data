import { Injectable } from '@nestjs/common'

@Injectable()
export class ApiCoreDataAccessService {
  constructor() {}

  uptime(): number {
    return process.uptime()
  }
}
