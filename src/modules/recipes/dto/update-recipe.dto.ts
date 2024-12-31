import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

import { IngredientComplete } from '@/modules/ingredients/schema/ingredientComplete.schema'
import { CreateRecipeDto } from './create-recipe.dto'

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  @ApiProperty({
    example: 'Pollo con papas',
    required: false,
  })
  title: string

  @ApiProperty({
    example: 'Pollo con papas y arroz',
    required: false,
  })
  description: string

  @ApiProperty({
    example: [],
    required: false,
  })
  ingredients: IngredientComplete[]
}
