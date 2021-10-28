import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class DailySpendTransactionsStat {
  @Field(() => Int, { nullable: false })
  appIndex: number

  @Field({ nullable: false })
  appName: string

  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  dailySpendTransactions: number
}
