import { Field, Int, ObjectType } from '@nestjs/graphql'
import { App } from './app.entity'

@ObjectType()
export class DailySummaryAppResult {
  @Field(() => [String], { nullable: true })
  dates: string[]
  @Field(() => [App], { nullable: true })
  apps: App[]
  @Field(() => Int, { nullable: true })
  total?: number
}
