import { Injectable, HttpException } from '@nestjs/common'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './schema/ingredient.schema'
import { IngredientRepository } from './ingredients.repository'
import { FilterIngredientDto } from './dto/filter-ingredient.dto'

@Injectable()
export class IngredientsService {
  constructor(private readonly ingredientRepository: IngredientRepository) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    try {
      const existIngredient = await this.ingredientRepository.findByName(
        createIngredientDto.name,
      )

      if (existIngredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: 'Existe un ingrediente con ese nombre',
          },
          400,
        )
      }

      return this.ingredientRepository.create(createIngredientDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async findByFilter(filter: FilterIngredientDto) {
    return await this.ingredientRepository.findByFilter(filter)
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ ingredients: Ingredient[]; pages: number; total: number }> {
    return await this.ingredientRepository.findAll(page, limit)
  }

  async findOne(id: string): Promise<Ingredient> {
    try {
      const ingredient = await this.ingredientRepository.findOne(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }

      return ingredient
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    try {
      const ingredient = await this.ingredientRepository.findOne(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }
      return await this.ingredientRepository.update(id, updateIngredientDto)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }

  async remove(id: string) {
    try {
      const ingredient = await this.ingredientRepository.findOne(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }

      return await this.ingredientRepository.delete(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException(
          {
            statusCode: 500,
            message: 'Internal server error',
          },
          500,
        )
      }
    }
  }
}
