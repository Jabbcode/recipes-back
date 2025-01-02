import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { IsNotEmpty, IsString } from 'class-validator'
import { FoodTypes } from 'src/types'
import { ApiProperty } from '@nestjs/swagger'

export class CreateEventDto {
  @ApiProperty({
    description: 'Date of the event',
    example: '2021-10-10T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  date: Date

  @ApiProperty({
    description: 'Type of food',
    example: 'breakfast',
    required: true,
  })
  @IsString()
  type: typeof FoodTypes

  @ApiProperty({
    description: 'Recipe of the event',
    required: true,
  })
  @IsNotEmpty()
  recipe: Recipe
}
