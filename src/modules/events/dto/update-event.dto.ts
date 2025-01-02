import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

import { CreateEventDto } from './create-event.dto'

import { Recipe } from '@/modules/recipes/schema'
import { FoodTypes } from '@/types'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    description: 'Fecha del evento',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  date: Date

  @ApiProperty({
    description: 'Id de Receta del evento',
    example: '677680fa6fa5fa77e5fd4a5a',
    required: false,
  })
  recipe: Recipe

  @ApiProperty({
    description: 'Tipo de comida',
    example: 'Desayuno | Almuerzo | Cena',
    required: false,
  })
  type: typeof FoodTypes
}
