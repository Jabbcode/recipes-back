import { HttpException, Injectable } from '@nestjs/common'
import { CreateFoodTypeDto, UpdateFoodTypeDto } from './dto'

import { FoodTypeRepository } from './food-types.repository'

import { FoodType } from './schema'

@Injectable()
export class FoodTypesService {
  constructor(private readonly foodTypeRepository: FoodTypeRepository) {}

  async create(createFoodTypeDto: CreateFoodTypeDto) {
    try {
      return await this.foodTypeRepository.create(createFoodTypeDto)
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

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ foodTypes: FoodType[]; pages: number; total: number }> {
    return this.foodTypeRepository.findAll(page, limit)
  }

  async findOne(id: string) {
    return this.foodTypeRepository.findOne(id)
  }

  async update(id: string, updateFoodTypeDto: UpdateFoodTypeDto) {
    try {
      const foodType = await this.foodTypeRepository.findOne(id)

      if (!foodType) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe un tipo de comida con el id ${id}`,
          },
          400,
        )
      }

      return await this.foodTypeRepository.update(id, updateFoodTypeDto)
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
      const foodType = await this.foodTypeRepository.findOne(id)

      if (!foodType) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe un tipo de comida con el id ${id}`,
          },
          400,
        )
      }

      return await this.foodTypeRepository.deleteEvent(id)
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
