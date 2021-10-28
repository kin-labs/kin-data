import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class KreStat {
  @Field({ nullable: true })
  button?: string

  @Field({ nullable: true })
  dataLabelName?: string

  @Field({ nullable: true })
  dataSetName?: string

  @Field({ nullable: true })
  dataSetValue?: string

  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  displayLegend?: boolean

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  table?: string

  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  xAxisLabel?: string

  @Field({ nullable: true })
  yAxisLabel?: string
}
