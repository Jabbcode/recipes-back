import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Ingredient } from './schema/ingredient.schema'
import { FilterIngredientDto } from './dto/filter-ingredient.dto'

@Injectable()
export class IngredientRepository {
  constructor(
    @InjectModel(Ingredient.name)
    private readonly ingredientModel: Model<Ingredient>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ ingredients: Ingredient[]; pages: number; total: number }> {
    const skip = (page - 1) * limit
    const ingredients = await this.ingredientModel
      .find()
      .select('name isActive')
      .where('isActive', true)
      .skip(skip)
      .limit(limit)
      .exec()

    const count = await this.ingredientModel
      .countDocuments()
      .where('isActive', true)
      .exec()
    const pages = Math.ceil(count / limit)

    return { ingredients, pages, total: count }
  }

  async findByFilter(filter: FilterIngredientDto): Promise<Ingredient[]> {
    const query = this.ingredientModel.find()

    if (filter.name) {
      query.where('name', { $regex: filter.name, $options: 'i' })
    }

    if (filter.isActive !== undefined) {
      query.where('isActive', filter.isActive)
    }

    return query.exec()
  }

  async findByName(name: string): Promise<Ingredient | null> {
    return await this.ingredientModel.findOne({ name }).exec()
  }

  async findOne(id: string): Promise<Ingredient> {
    return this.ingredientModel.findById(id).exec()
  }

  async create(ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientModel.create(ingredient)
  }

  async update(id: string, ingredient: Ingredient): Promise<Ingredient> {
    return this.ingredientModel
      .findByIdAndUpdate(id, ingredient, { new: true })
      .exec()
  }

  async delete(id: string): Promise<void> {
    return await this.ingredientModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true },
    )
  }
}
