import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class KreSummary {
  @Field({ nullable: true })
  id?: string
  @Field({ nullable: true })
  date?: string
  @Field(() => Int, { nullable: true })
  activeApps?: number
  @Field(() => Float, { nullable: true })
  activeUserBalance?: number
  @Field(() => Float, { nullable: true })
  activeCappedUserBalance?: number
  @Field(() => Int, { nullable: true })
  activeUsers?: number
  @Field(() => Float, { nullable: true })
  dailyVolatilityFactor?: number
  @Field(() => Float, { nullable: true })
  dailyKinPayout?: number
  @Field(() => Float, { nullable: true })
  dailyUsdPayout?: number
  @Field(() => Int, { nullable: true })
  dailyTransactions?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveEarners?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveSpenders?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveUsers?: number
}
