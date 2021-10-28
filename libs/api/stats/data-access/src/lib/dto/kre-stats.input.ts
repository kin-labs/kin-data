import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { KreStatsType } from '../models/kre-stats.enum'

@InputType()
export class KreStatsInput {
  @Field(() => KreStatsType)
  @IsNotEmpty()
  @IsEnum(KreStatsType, { message: `Unknown type. Available types: ${Object.values(KreStatsType).join(', ')}` })
  type: KreStatsType
}
