import { IsEnum, IsOptional } from 'class-validator'
import { ComidasTypes } from 'src/types'

export class FilterEventDto {
  @IsOptional()
  date: Date

  @IsOptional()
  @IsEnum(ComidasTypes)
  type: typeof ComidasTypes
}
