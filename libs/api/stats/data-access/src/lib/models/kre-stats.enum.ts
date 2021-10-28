import { registerEnumType } from '@nestjs/graphql'

export enum KreStatsType {
  'AUB' = 'AUB',
  'DAE' = 'DAE',
  'DAS' = 'DAS',
  'DAU' = 'DAU',
  'DET' = 'DET',
  'DST' = 'DST',
  'MAA' = 'MAA',
  'MAE' = 'MAE',
  'MAS' = 'MAS',
  'MAU' = 'MAU',
  'payouts' = 'payouts',
  'payouts_daily' = 'payouts_daily',
  'TDT' = 'TDT',
  'VF' = 'VF',
}

registerEnumType(KreStatsType, { name: 'KreStatsType' })
