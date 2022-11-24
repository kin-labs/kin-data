import { Field, Float, ObjectType } from '@nestjs/graphql'
import { GraphQLJSON } from 'graphql-scalars'

@ObjectType()
export class KrePayoutSummary {
  @Field()
  id: string
  @Field()
  date: string
  @Field(() => Float, { nullable: true })
  kin?: number
  @Field(() => Float, { nullable: true })
  usd?: number
  @Field(() => GraphQLJSON, { nullable: true })
  top10?: unknown
}
