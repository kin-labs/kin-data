import { KinBiEnv } from '../models/kin-bi-env.enum'

export class GetTxByAppInput {
  appIndex: number | string
  env?: KinBiEnv
}
