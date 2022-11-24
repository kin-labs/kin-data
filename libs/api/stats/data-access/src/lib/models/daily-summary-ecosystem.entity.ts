import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DailySummaryEcosystem {
  @Field()
  id: string
  @Field()
  date: Date
  @Field(() => Int, { nullable: true })
  monthlyActiveApps?: number
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
  @Field(() => Int, { nullable: true })
  monthlyActiveUsers?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveEarners?: number
  @Field(() => Int, { nullable: true })
  monthlyActiveSpenders?: number
}
