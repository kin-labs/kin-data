import { Controller, Get, Query } from '@nestjs/common'
import { parseDefaultParams } from './api-integration-kin-bi.helpers'
import { ApiIntegrationKinBiService } from './api-integration-kin-bi.service'
import { GetTxByAppInput } from './dto/get-tx-by-app.input'

@Controller('kin-bi')
export class ApiIntegrationKinBiController {
  constructor(private readonly service: ApiIntegrationKinBiService) {}

  @Get('get-tx-by-app')
  getTxByApp(@Query() params: GetTxByAppInput) {
    return this.service.getTxByApp(parseDefaultParams(params.appIndex, params.env))
  }
}
