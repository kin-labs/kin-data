import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TransactionsPerSecondStat {
  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  transactionsPerSecond: number
}
