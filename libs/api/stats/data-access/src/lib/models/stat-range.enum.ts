import { Field, InputType, registerEnumType } from '@nestjs/graphql'
import { StatType } from './stat-type.enum'

export enum StatRange {
  '7days' = '7days',
  '30days' = '30days',
  '60days' = '60days',
  '90days' = '90days',
  '120days' = '120days',
  '180days' = '180days',
  '365days' = '365days',
  'all' = 'all',
}

registerEnumType(StatRange, { name: 'StatRange' })

@InputType()
export class StatInput {
  @Field({ nullable: true })
  range?: string
  @Field(() => StatType, { nullable: true })
  type?: StatType
}

export function getDateRange(range: StatRange = StatRange['90days']) {
  function daysAgo(days: number) {
    const now = new Date()

    return new Date(now.getFullYear(), now.getMonth(), now.getDate() - days - 1)
  }

  switch (range) {
    case StatRange['120days']:
      return daysAgo(120)
    case StatRange['180days']:
      return daysAgo(180)
    case StatRange['30days']:
      return daysAgo(30)
    case StatRange['365days']:
      return daysAgo(365)
    case StatRange['60days']:
      return daysAgo(60)
    case StatRange['7days']:
      return daysAgo(7)
    case StatRange['90days']:
      return daysAgo(90)
    case StatRange.all:
      return undefined
    default:
      return daysAgo(90)
  }
}
