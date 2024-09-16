import { PartialType } from '@nestjs/mapped-types'
import { CreateEventDto } from './create-event.dto'
import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { Comidas } from '../schemas/event.schema'

export class UpdateEventDto extends PartialType(CreateEventDto) {
  date: Date

  recipe: Recipe

  type: Comidas
}
