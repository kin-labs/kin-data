import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TxPerDayStat {
  @Field(() => Int, { nullable: true })
  appIndex: number

  @Field({ nullable: true })
  appName: string

  @Field({ nullable: true })
  date: string

  @Field(() => Int, { nullable: false })
  numOfTx: number
}
