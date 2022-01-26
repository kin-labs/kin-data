import { registerEnumType } from '@nestjs/graphql'

export enum KreStatTable {
  AUB = 'AUB',
  DAE = 'DAE',
  DAS = 'DAS',
  DAU = 'DAU',
  DET = 'DET',
  DST = 'DST',
  MAA = 'MAA',
  MAE = 'MAE',
  MAS = 'MAS',
  MAU = 'MAU',
  payouts = 'payouts',
  TDT = 'TDT',
  VF = 'VF',
}

registerEnumType(KreStatTable, { name: 'KreStatTable' })
