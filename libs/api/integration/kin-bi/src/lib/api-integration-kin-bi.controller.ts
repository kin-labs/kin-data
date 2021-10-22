import { Controller, Get, Query } from '@nestjs/common'
import { parseDefaultParams } from './api-integration-kin-bi.helpers'
import { ApiIntegrationKinBiService } from './api-integration-kin-bi.service'
import { GetLatestCreationsInput } from './dto/get-latest-creations.input'
import { GetLatestPaymentsInput } from './dto/get-latest-payments.input'

@Controller('kin-bi')
export class ApiIntegrationKinBiController {
  constructor(private readonly service: ApiIntegrationKinBiService) {}

  @Get('get-latest-creations')
  getLatestCreations(@Query() params: GetLatestCreationsInput) {
    return this.service.getLatestCreations({ ...parseDefaultParams(params.appIndex, params.env), ...params })
  }

  @Get('get-latest-payments')
  getLatestPayments(@Query() params: GetLatestPaymentsInput) {
    return this.service.getLatestPayments({ ...parseDefaultParams(params.appIndex, params.env), ...params })
  }
}
