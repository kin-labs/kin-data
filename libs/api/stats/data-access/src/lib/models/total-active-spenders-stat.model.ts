import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TotalActiveSpendersStat {
  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  totalActiveSpenders: number
}
