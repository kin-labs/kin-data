import { Field, InputType } from '@nestjs/graphql'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { KreStatType } from '../models/kre-stat-type.enum'

@InputType()
export class KreStatsInput {
  @Field(() => KreStatType)
  @IsNotEmpty()
  @IsEnum(KreStatType, { message: `Unknown type. Available types: ${Object.values(KreStatType).join(', ')}` })
  type: KreStatType
}
