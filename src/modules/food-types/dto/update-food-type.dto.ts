import { ApiProperty, PartialType } from '@nestjs/swagger'
import { CreateFoodTypeDto } from './create-food-type.dto'

export class UpdateFoodTypeDto extends PartialType(CreateFoodTypeDto) {
  @ApiProperty({
    description: 'Nombre del tipo de comida',
    required: false,
  })
  type: string
}
