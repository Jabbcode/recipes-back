import { PartialType } from '@nestjs/mapped-types'
import { CreateEventDto } from './create-event.dto'
import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { FoodTypes } from 'src/types'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    description: 'Date of the event',
    example: '2021-10-10T00:00:00.000Z',
  })
  date: Date

  @ApiProperty({
    description: 'Recipe of the event',
    required: true,
  })
  recipe: Recipe

  @ApiProperty({
    description: 'Type of food',
    example: 'breakfast',
  })
  type: typeof FoodTypes
}
