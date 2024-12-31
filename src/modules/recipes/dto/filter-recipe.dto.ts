import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class FilterRecipeDto {
  @ApiProperty({
    example: 'Pollo con papas',
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string

  @ApiProperty({
    example: 'Pollo con papas y arroz',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string
}
