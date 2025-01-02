import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { FoodTypes } from '@/types'

export class FilterEventDto {
  @ApiProperty({
    description: 'Fecha del evento',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  date: Date

  @ApiProperty({
    description: 'Tipo de comida',
    example: 'Desayuno | Almuerzo | Cena',
    required: false,
  })
  @IsOptional()
  @IsEnum(FoodTypes)
  type: typeof FoodTypes

  @ApiProperty({
    description: 'Fecha de inicio del evento',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  startDate: Date

  @ApiProperty({
    description: 'Fecha de fin del evento',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  endDate: Date
}
