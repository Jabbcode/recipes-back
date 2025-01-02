import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class FilterUnitDto {
  @ApiProperty({
    example: 'Kg',
    required: false,
  })
  @IsOptional()
  @IsString()
  name: string

  @ApiProperty({
    example: 'Kilogramos',
    required: false,
  })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean
}
