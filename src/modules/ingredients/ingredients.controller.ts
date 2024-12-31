import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateIngredientDto, FilterIngredientDto, UpdateIngredientDto } from './dto'
import { Ingredient } from './schema'

import { IngredientsService } from './ingredients.service'

import { MongoValidIdPipe } from '@/pipes'
import { ApiResponses } from '@/decorators'

interface ResponseIngredient {
  ingredient?: Ingredient
  message: string
  statusCode?: number
}

@ApiTags('Ingredients')
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new ingredient' })
  @ApiResponses([
    { status: 201, description: 'Created' },
    { status: 400, description: 'Bad request' },
    { status: 500, description: 'Internal server error' },
  ])
  async create(@Body() createIngredientDto: CreateIngredientDto): Promise<ResponseIngredient> {
    return await this.ingredientsService.create(createIngredientDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all ingredients' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ ingredients: Ingredient[]; pages: number; total: number }> {
    return await this.ingredientsService.findAll(page, limit)
  }

  @Post('/search')
  @ApiOperation({ summary: 'Find ingredients by filter' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  @HttpCode(200)
  async findByFilter(@Body() filters: FilterIngredientDto) {
    return await this.ingredientsService.findByFilter(filters)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an ingredient by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<Ingredient> {
    return await this.ingredientsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an ingredient by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<ResponseIngredient> {
    return await this.ingredientsService.update(id, updateIngredientDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an ingredient by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async remove(@Param('id', MongoValidIdPipe) id: string): Promise<ResponseIngredient> {
    return await this.ingredientsService.remove(id)
  }
}
