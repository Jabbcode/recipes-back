import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUnitDto {
  @ApiProperty({
    example: 'Kg',
    required: true,
  })
  @IsString({ message: 'El nombre debe ser de tipo string' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string

  @ApiProperty({
    example: 'Kilogramos',
    required: true,
  })
  @IsString({ message: 'La descripcion debe ser de tipo string' })
  @IsNotEmpty({ message: 'La descripcion es obligatoria' })
  description: string

  @ApiProperty({
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean = true
}
