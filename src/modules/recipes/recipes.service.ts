import { HttpException, Injectable } from '@nestjs/common'
import { CreateRecipeDto } from './dto/create-recipe.dto'
import { UpdateRecipeDto } from './dto/update-recipe.dto'
import { RecipeRepository } from './recipes.repository'

@Injectable()
export class RecipesService {
  constructor(private readonly recipeRepository: RecipeRepository) {}

  async create(createRecipeDto: CreateRecipeDto) {
    try {
      return this.recipeRepository.create(createRecipeDto)
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

  async findAll() {
    return await this.recipeRepository.findAll()
  }

  async findOne(id: string) {
    try {
      const recipe = await this.recipeRepository.findOne(id)

      if (!recipe) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe receta con el id ${id}`,
          },
          400,
        )
      }

      return recipe
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

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      const recipe = await this.recipeRepository.findOne(id)

      if (!recipe) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe receta con el id ${id}`,
          },
          400,
        )
      }

      return await this.recipeRepository.update(id, updateRecipeDto)
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
      const recipe = await this.recipeRepository.findOne(id)

      if (!recipe) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe receta con el id ${id}`,
          },
          400,
        )
      }

      return await this.recipeRepository.delete(id)
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
