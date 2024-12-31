import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateIngredientDto {
  @ApiProperty({
    example: 'pollo',
    required: true,
  })
  @IsString({ message: 'El nombre debe ser de tipo string' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean = true
}
