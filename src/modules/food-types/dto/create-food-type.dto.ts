import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'

import { FoodTypes } from '@/types'

export class CreateFoodTypeDto {
  @ApiProperty({
    description: 'Nombre del tipo de comida',
    required: true,
  })
  @IsEnum(FoodTypes)
  type: string
}
