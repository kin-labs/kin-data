import { Field, Float, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DailySummaryApp {
  @Field()
  id: string
  @Field()
  date: string
  @Field(() => Int, { nullable: true })
  index?: number
  @Field()
  name?: string
  @Field(() => Int, { nullable: true })
  totalDailyTransactions?: number
  @Field(() => Int, { nullable: true })
  dailyEarnTransactions?: number
  @Field(() => Int, { nullable: true })
  dailySpendTransactions?: number
  @Field(() => Int, { nullable: true })
  dailyPeerTransactions?: number
  @Field(() => Int, { nullable: true })
  dailyActiveUsers?: number
  @Field(() => Int, { nullable: true })
  dailyActiveEarners?: number
  @Field(() => Int, { nullable: true })
  dailyActiveSpenders?: number
  @Field(() => Float, { nullable: true })
  totalDailyAmount?: number
  @Field(() => Float, { nullable: true })
  totalDailyAmountUsd?: number
  @Field(() => Float, { nullable: true })
  dailyEarnAmount?: number
  @Field(() => Float, { nullable: true })
  dailyEarnAmountUsd?: number
  @Field(() => Float, { nullable: true })
  dailySpendAmount?: number
  @Field(() => Float, { nullable: true })
  dailySpendAmountUsd?: number
  @Field(() => Float, { nullable: true })
  dailyPeerAmount?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveUsers?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveEarners?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveSpenders?: number
}
