import { ApiCoreUtilService } from '@kin-data/api/core/util'
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class ApiCoreDataAccessService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
  constructor(readonly config: ApiCoreUtilService) {
    super()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async onModuleInit() {
    await this.$connect()
  }

  uptime(): number {
    return process.uptime()
  }
}
