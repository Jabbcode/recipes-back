import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateRecipeDto, FilterRecipeDto, UpdateRecipeDto } from './dto'
import { Recipe } from './schema'

import { RecipesService } from './recipes.service'

import { MongoValidIdPipe } from '@/pipes'
import { ApiResponses } from '@/decorators'

@ApiTags('Recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new recipe' })
  @ApiResponses([
    { status: 201, description: 'Created' },
    { status: 400, description: 'Bad request' },
    { status: 500, description: 'Internal server error' },
  ])
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipesService.create(createRecipeDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all recipes' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ recipes: Recipe[]; pages: number; total: number }> {
    return await this.recipesService.findAll(page, limit)
  }

  @Get('/select')
  @ApiOperation({ summary: 'Get all recipes minimisadas' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findForSelect() {
    return await this.recipesService.findForSelect()
  }

  @Post('/search')
  @ApiOperation({ summary: 'Find recipes by filter' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findByFilter(@Body() filter: FilterRecipeDto): Promise<Recipe[]> {
    return await this.recipesService.findByFilter(filter)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a recipe by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<Recipe> {
    return await this.recipesService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a recipe by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return await this.recipesService.update(id, updateRecipeDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a recipe by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async remove(@Param('id', MongoValidIdPipe) id: string) {
    return await this.recipesService.remove(id)
  }
}
