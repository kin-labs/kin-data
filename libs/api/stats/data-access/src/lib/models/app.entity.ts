import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class App {
  @Field(() => Int, { nullable: true })
  index: number
  @Field({ nullable: true })
  name: string
  @Field(() => [Int], { nullable: true })
  data?: number[]
}
