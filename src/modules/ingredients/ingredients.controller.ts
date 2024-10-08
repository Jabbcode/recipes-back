import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common'
import { IngredientsService } from './ingredients.service'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './schema/ingredient.schema'
import { FilterIngredientDto } from './dto/filter-ingredient.dto'
import { MongoValidIdPipe } from 'src/pipes/mongo-valid-id.pipe'

interface ResponseIngredient {
  ingredient?: Ingredient
  message: string
  statusCode?: number
}

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<ResponseIngredient> {
    return await this.ingredientsService.create(createIngredientDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<{ ingredients: Ingredient[]; pages: number; total: number }> {
    return await this.ingredientsService.findAll(page, limit)
  }

  @Post('/search')
  @HttpCode(200)
  async findByFilter(@Body() filters: FilterIngredientDto) {
    return await this.ingredientsService.findByFilter(filters)
  }

  @Get(':id')
  async findOne(
    @Param('id', MongoValidIdPipe) id: string,
  ): Promise<Ingredient> {
    return await this.ingredientsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<ResponseIngredient> {
    return await this.ingredientsService.update(id, updateIngredientDto)
  }

  @Delete(':id')
  async remove(
    @Param('id', MongoValidIdPipe) id: string,
  ): Promise<ResponseIngredient> {
    return await this.ingredientsService.remove(id)
  }
}
