import { Injectable } from '@nestjs/common'
import { GetTxByAppInput } from './dto/get-tx-by-app.input'

@Injectable()
export class ApiIntegrationKinBiService {
  getTxByApp({ appIndex, env }: GetTxByAppInput) {
    return {
      operation: 'getTxByApp',
      appIndex,
      env,
    }
  }
}
