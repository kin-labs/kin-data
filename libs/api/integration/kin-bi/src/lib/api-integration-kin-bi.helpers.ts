import { KinBiEnv } from './models/kin-bi-env.enum'

export function parseDefaultParams(appIndex, env: KinBiEnv) {
  appIndex = parseInt(appIndex as string, 10)
  env = env || KinBiEnv.prod

  return { appIndex, env }
}
