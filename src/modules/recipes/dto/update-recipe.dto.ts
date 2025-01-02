import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'

import { IngredientComplete } from '@/modules/ingredients/schema'
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
    example: [
      {
        name: '67059a7031752bddd6c0fde4',
        quantity: 1,
        unit: '66e5e9ffe9157993265d32dd',
      },
    ],
    required: false,
  })
  ingredients: IngredientComplete[]
}
