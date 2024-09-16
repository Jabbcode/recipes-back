import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { IngredientsService } from './ingredients.service'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './schema/ingredient.schema'

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Post()
  async create(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<Ingredient> {
    return await this.ingredientsService.create(createIngredientDto)
  }

  @Get()
  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientsService.findAll()
  }

  @Get('/is-active')
  async findIsActive(): Promise<Ingredient[]> {
    return await this.ingredientsService.findIsActive()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Ingredient> {
    return await this.ingredientsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<Ingredient> {
    return await this.ingredientsService.update(id, updateIngredientDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.ingredientsService.remove(id)
  }
}
