import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { Recipe } from '@/modules/recipes/schema'

import { FoodTypes } from '@/types'

export class CreateEventDto {
  @ApiProperty({
    description: 'Fecha del evento',
    example: '2021-10-10T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  date: Date

  @ApiProperty({
    description: 'Tipo de comida',
    example: 'Desayuno | Almuerzo | Cenaayuno',
    required: true,
  })
  @IsString()
  type: typeof FoodTypes

  @ApiProperty({
    description: 'Id de Receta del evento',
    example: '677680fa6fa5fa77e5fd4a5a',
    required: true,
  })
  @IsNotEmpty()
  recipe: Recipe
}
