import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PayoutsStat {
  @Field(() => Int, { nullable: false })
  year: number

  @Field(() => Int, { nullable: false })
  week: number

  @Field(() => Int, { nullable: false })
  appIndex: number

  @Field({ nullable: false })
  appName: string

  @Field(() => Int, { nullable: false })
  payoutKin: number

  @Field(() => Int, { nullable: false })
  payoutUSD: number
}
