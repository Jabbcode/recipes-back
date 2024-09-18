import { IsOptional, IsString } from 'class-validator'

export class FilterRecipeDto {
  @IsOptional()
  @IsString()
  title: string

  @IsOptional()
  @IsString()
  description: string
}
