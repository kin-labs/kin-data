import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TotalActiveEarnersStat {
  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  totalActiveEarners: number
}
