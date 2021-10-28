import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MonthlyActiveSpendersStat {
  @Field(() => Int, { nullable: false })
  appIndex: number

  @Field({ nullable: false })
  appName: string

  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  monthlyActiveSpenders: number
}
