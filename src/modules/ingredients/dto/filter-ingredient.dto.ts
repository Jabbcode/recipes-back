import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FilterIngredientDto {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
