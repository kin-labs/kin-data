import { DefaultAppInput } from './default-app.input'

export class GetLatestPaymentsInput extends DefaultAppInput {
  destination?: string
  limit?: number
  source?: string
}
