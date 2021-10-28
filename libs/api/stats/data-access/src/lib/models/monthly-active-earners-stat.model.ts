import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class MonthlyActiveEarnersStat {
  @Field(() => Int, { nullable: false })
  appIndex: number

  @Field({ nullable: false })
  appName: string

  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  monthlyActiveEarners: number
}
