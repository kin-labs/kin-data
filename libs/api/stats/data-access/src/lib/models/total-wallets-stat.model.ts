import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class TotalWalletsStat {
  @Field({ nullable: false })
  date: string

  @Field(() => Int, { nullable: false })
  totalWallets: number
}
