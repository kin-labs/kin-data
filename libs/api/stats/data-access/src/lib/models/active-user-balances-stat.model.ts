import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ActiveUserBalancesStat {
  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  appIndex: number

  @Field({ nullable: false })
  appName: string

  @Field(() => Int, { nullable: false })
  AU: number

  @Field(() => Int, { nullable: false })
  AUB: number

  @Field(() => Int, { nullable: false })
  cappedAUB: number
}
