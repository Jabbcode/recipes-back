import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty } from '@nestjs/swagger'
import { CreateUnitDto } from './create-unit.dto'

export class UpdateUnitDto extends PartialType(CreateUnitDto) {
  @ApiProperty({
    example: 'Kg',
    required: false,
  })
  name: string

  @ApiProperty({
    example: 'Kilogramos',
    required: false,
  })
  description: string

  @ApiProperty({
    example: true,
    required: false,
  })
  isActive: boolean
}
