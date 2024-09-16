import { Injectable, HttpException } from '@nestjs/common'
import { CreateIngredientDto } from './dto/create-ingredient.dto'
import { UpdateIngredientDto } from './dto/update-ingredient.dto'
import { Ingredient } from './schema/ingredient.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly IngredientModel: Model<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<Ingredient> {
    try {
      const existIngredient = await this.IngredientModel.find({
        name: createIngredientDto.name,
      }).exec()

      if (existIngredient.length > 0) {
        throw new HttpException(
          {
            statusCode: 400,
            message: 'Existe un ingrediente con ese nombre',
          },
          400,
        )
      }

      const createdIngredient = new this.IngredientModel(createIngredientDto)
      return createdIngredient.save()
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

  async findAll(): Promise<Ingredient[]> {
    return await this.IngredientModel.find().exec()
  }

  async findIsActive(): Promise<Ingredient[]> {
    return await this.IngredientModel.find({
      isActive: true,
    }).exec()
  }

  async findOne(id: string): Promise<Ingredient> {
    try {
      const ingredient = await this.IngredientModel.findById(id)

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
      const ingredient = await this.IngredientModel.findById(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }
      return await this.IngredientModel.findByIdAndUpdate(
        id,
        updateIngredientDto,
      )
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
      const ingredient = await this.IngredientModel.findById(id)

      if (!ingredient) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe ingrediente con el id ${id}`,
          },
          400,
        )
      }

      return await this.IngredientModel.findByIdAndUpdate(id, {
        isActive: false,
      })
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
