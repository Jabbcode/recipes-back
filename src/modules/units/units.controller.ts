import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateUnitDto, FilterUnitDto, UpdateUnitDto } from './dto'
import { Unit } from './schemas'

import { UnitsService } from './units.service'

import { MongoValidIdPipe } from '@/pipes'
import { ApiResponses } from '@/decorators'

interface ResponseUnit {
  unit: Unit
  message: string
}

@ApiTags('Units')
@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new unit' })
  @ApiResponses([
    { status: 201, description: 'Created' },
    { status: 400, description: 'Bad request' },
    { status: 500, description: 'Internal server error' },
  ])
  async create(@Body() createUnitDto: CreateUnitDto): Promise<ResponseUnit> {
    return this.unitsService.create(createUnitDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all units' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ units: Unit[]; pages: number; total: number }> {
    return this.unitsService.findAll(page, limit)
  }

  @Post('/search')
  @ApiOperation({ summary: 'Find units by filter' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findByFilter(@Body() filter: FilterUnitDto): Promise<Unit[]> {
    return await this.unitsService.findByFilter(filter)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get unit by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<Unit> {
    return this.unitsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a unit' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 400, description: 'Bad request' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<ResponseUnit> {
    return this.unitsService.update(id, updateUnitDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a unit' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async remove(@Param('id', MongoValidIdPipe) id: string): Promise<ResponseUnit> {
    return this.unitsService.remove(id)
  }
}
