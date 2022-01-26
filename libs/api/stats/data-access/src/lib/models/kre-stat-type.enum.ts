import { registerEnumType } from '@nestjs/graphql'

export enum KreStatType {
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
  payoutsDaily = 'payoutsDaily',
  payoutsKin = 'payoutsKin',
  payoutsUsd = 'payoutsUsd',
  TDT = 'TDT',
  VF = 'VF',
}

registerEnumType(KreStatType, { name: 'KreStatType' })
