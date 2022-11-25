import { Field, Float, ObjectType } from '@nestjs/graphql'
import { KrePayoutSummaryApp } from './kre-payout-summary.app'

@ObjectType()
export class KrePayoutSummary {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  date?: string
  @Field(() => Float, { nullable: true })
  kin?: number
  @Field(() => Float, { nullable: true })
  usd?: number
  @Field(() => [KrePayoutSummaryApp], { nullable: true })
  top10?: KrePayoutSummaryApp[]
}
