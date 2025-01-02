import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'
import { FoodTypes } from 'src/types'

export class FilterEventDto {
  @ApiProperty({
    description: 'Date of the event',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  date: Date

  @ApiProperty({
    description: 'Type of food',
    example: 'breakfast',
    required: false,
  })
  @IsOptional()
  @IsEnum(FoodTypes)
  type: typeof FoodTypes

  @ApiProperty({
    description: 'Start date of the event',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  startDate: Date

  @ApiProperty({
    description: 'End date of the event',
    example: '2021-10-10T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  endDate: Date
}
