import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { IsNotEmpty, IsString } from 'class-validator'
import { FoodTypes } from 'src/types'

export class CreateEventDto {
  @IsNotEmpty()
  date: Date

  @IsString()
  type: typeof FoodTypes

  @IsNotEmpty()
  recipe: Recipe
}
