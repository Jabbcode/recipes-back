import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { IsNotEmpty, IsString } from 'class-validator'
import { ComidasTypes } from 'src/types'

export class CreateEventDto {
  @IsNotEmpty()
  date: Date

  @IsString()
  type: typeof ComidasTypes

  @IsNotEmpty()
  recipe: Recipe
}
