import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateUnitDto {
  @IsString({ message: 'El nombre debe ser de tipo string' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string

  @IsString({ message: 'La descripcion debe ser de tipo string' })
  @IsNotEmpty({ message: 'La descripcion es obligatoria' })
  description: string

  @IsOptional()
  @IsBoolean()
  isActive: boolean = true
}
