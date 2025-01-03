import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateFoodTypeDto, UpdateFoodTypeDto } from './dto'
import { FoodType } from './schema'

import { FoodTypesService } from './food-types.service'

import { MongoValidIdPipe } from '@/pipes'
import { ApiResponses } from '@/decorators'

interface FoodTypesResponse {
  foodTypes: FoodType[]
  pages: number
  total: number
}

@ApiTags('food-types')
@Controller('food-types')
export class FoodTypesController {
  constructor(private readonly foodTypesService: FoodTypesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new food type' })
  @ApiResponses([
    { status: 201, description: 'Created' },
    { status: 400, description: 'Bad request' },
    { status: 500, description: 'Internal server error' },
  ])
  async create(@Body() createFoodTypeDto: CreateFoodTypeDto): Promise<FoodType> {
    return await this.foodTypesService.create(createFoodTypeDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all food types' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<FoodTypesResponse> {
    return await this.foodTypesService.findAll(page, limit)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a food type by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<FoodType> {
    return await this.foodTypesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a food type' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 400, description: 'Bad request' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateFoodTypeDto: UpdateFoodTypeDto,
  ): Promise<FoodType> {
    return this.foodTypesService.update(id, updateFoodTypeDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a food type' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  remove(@Param('id', MongoValidIdPipe) id: string) {
    return this.foodTypesService.remove(id)
  }
}
