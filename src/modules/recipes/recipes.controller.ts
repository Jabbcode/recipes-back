import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { Recipe } from './schema/recipe.schema'

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return await this.recipesService.create(createRecipeDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ recipes: Recipe[]; pages: number; total: number }> {
    return await this.recipesService.findAll(page, limit)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Recipe> {
    return await this.recipesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<Recipe> {
    return await this.recipesService.update(id, updateRecipeDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.recipesService.remove(id)
  }
}
