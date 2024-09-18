import { IsEnum, IsOptional } from 'class-validator'
import { FoodTypes } from 'src/types'

export class FilterEventDto {
  @IsOptional()
  date: Date

  @IsOptional()
  @IsEnum(FoodTypes)
  type: typeof FoodTypes

  @IsOptional()
  startDate: Date  

  @IsOptional()
  endDate: Date
}
