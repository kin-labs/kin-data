import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class LastTxStat {
  @Field(() => Int, { nullable: true })
  appIndex: number

  @Field({ nullable: true })
  appName: string

  @Field({ nullable: true })
  date: string

  @Field({ nullable: true })
  txId: string
}
