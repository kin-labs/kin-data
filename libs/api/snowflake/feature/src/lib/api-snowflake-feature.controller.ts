import { ApiSnowflakeDataAccessService } from '@kin-data/api/snowflake/data-access'
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'

@Controller('warehouse')
export class ApiSnowflakeFeatureController {
  constructor(private readonly service: ApiSnowflakeDataAccessService) {}

  @Get('apps')
  ingestedApps() {
    return this.service.ingestedApps()
  }

  @Get('tx-by-index/:index')
  ingestedTxByIndex(@Param('index', new ParseIntPipe()) index: number) {
    return this.service.ingestedTxByIndex(index)
  }

  @Get('tx-by-signature/:signature')
  ingestedTxBySignature(@Param('signature') signature: string) {
    return this.service.ingestedTxBySignature(signature)
  }
}
