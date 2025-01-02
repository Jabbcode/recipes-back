import { ApiProperty } from '@nestjs/swagger'
import { ArrayNotEmpty, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'

import { IngredientComplete } from '@/modules/ingredients/schema'

export class CreateRecipeDto {
  @ApiProperty({
    example: 'Pollo con papas',
    required: true,
  })
  @IsString({ message: 'El titulo debe ser de tipo string' })
  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  title: string

  @ApiProperty({
    example: 'Pollo con papas y salsa de tomate',
    required: true,
  })
  @IsString({ message: 'La descripcion debe ser de tipo string' })
  @IsNotEmpty({ message: 'La descripcion es obligatoria' })
  @MaxLength(250, {
    message: 'La descripcion debe tener un maximo de 250 caracteres',
  })
  description: string

  @ApiProperty({
    example: [
      {
        name: '67059a7031752bddd6c0fde4',
        quantity: 1,
        unit: '66e5e9ffe9157993265d32dd',
      },
    ],
    required: true,
  })
  @ArrayNotEmpty()
  @Type(() => IngredientComplete)
  ingredients: IngredientComplete[]
}
