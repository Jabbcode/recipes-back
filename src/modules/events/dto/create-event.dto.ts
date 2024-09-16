import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { Comidas } from '../schemas/event.schema'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateEventDto {
  @IsNotEmpty()
  date: Date

  @IsString()
  type: Comidas

  @IsNotEmpty()
  recipe: Recipe
}
