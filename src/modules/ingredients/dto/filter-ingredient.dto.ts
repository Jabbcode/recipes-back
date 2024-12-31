import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FilterIngredientDto {
  @ApiProperty({
    example: 'pollo',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
