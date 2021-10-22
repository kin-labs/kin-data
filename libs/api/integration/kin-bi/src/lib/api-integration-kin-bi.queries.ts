import { GetLatestCreationsInput } from './dto/get-latest-creations.input'
import { GetLatestPaymentsInput } from './dto/get-latest-payments.input'
import { KinBiEnv } from './models/kin-bi-env.enum'

const BQ_NAMESPACE = 'kin-bi'
const BQ_SOLANA = 'solana'

export function latestCreationsQuery(input: GetLatestCreationsInput) {
  const table = `${BQ_NAMESPACE}.${BQ_SOLANA}.payments${input.env === KinBiEnv.test ? '_testnet' : ''}`

  const wheres = []
  if (input.appIndex) {
    wheres.push(`app_index = ${input.appIndex}`)
  }

  return [
    `SELECT *`,
    `  FROM \`${table}\``,
    `  ${wheres.length ? ` WHERE ${wheres.join(' AND ')}` : ''}`,
    `  ORDER BY time DESC`,
    `  LIMIT ${input.limit || '10'}`,
  ].join(' ')
}

export function latestPaymentsQuery(input: GetLatestPaymentsInput) {
  const table = `${BQ_NAMESPACE}.${BQ_SOLANA}.payments${input.env === KinBiEnv.test ? '_testnet' : ''}`

  const wheres = []
  if (input.appIndex) {
    wheres.push(`app_index = ${input.appIndex}`)
  }
  if (input.destination) {
    wheres.push(`destination_owner = '${input.destination}'`)
  }
  if (input.source) {
    wheres.push(`source_owner = '${input.source}'`)
  }

  return [
    `SELECT *`,
    `  FROM \`${table}\``,
    `  ${wheres.length ? ` WHERE ${wheres.join(' AND ')}` : ''}`,
    `  ORDER BY time DESC`,
    `  LIMIT ${input.limit || '10'}`,
  ].join(' ')
}
