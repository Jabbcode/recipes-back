import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateIngredientDto {
  @IsString({ message: 'El nombre debe ser de tipo string' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  name: string

  @IsOptional()
  @IsBoolean()
  isActive: boolean = true
}
