import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { CreateIngredientDto } from './create-ingredient.dto'

export class UpdateIngredientDto extends PartialType(CreateIngredientDto) {
  @ApiProperty({
    example: 'pollo',
    required: false,
  })
  name: string

  @ApiProperty({
    example: true,
    required: false,
  })
  isActive: boolean
}
