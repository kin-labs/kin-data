import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class KrePayoutSummaryApp {
  @Field(() => Int, { nullable: true })
  index?: number
  @Field({ nullable: true })
  name?: string
  @Field(() => Float, { nullable: true })
  kin?: number
  @Field(() => Float, { nullable: true })
  usd?: number
}
