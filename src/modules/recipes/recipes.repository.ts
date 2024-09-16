import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Recipe } from './schema/recipe.schema'

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return await this.recipeModel
      .find()
      .populate([
        {
          path: 'ingredients.unit',
          select: ['name', 'description'],
        },
        { path: 'ingredients.name', select: 'name' },
      ])
      .exec()
  }

  async findIsActive(): Promise<Recipe[]> {
    return await this.recipeModel.find({ isActive: true }).exec()
  }

  async findByName(name: string): Promise<Recipe | null> {
    return await this.recipeModel.findOne({ name }).exec()
  }

  async findOne(id: string): Promise<Recipe> {
    return this.recipeModel.findById(id).exec()
  }

  async create(recipe: Recipe): Promise<Recipe> {
    return this.recipeModel.create(recipe)
  }

  async update(id: string, recipe: Recipe): Promise<Recipe> {
    return this.recipeModel.findByIdAndUpdate(id, recipe, { new: true }).exec()
  }

  async delete(id: string): Promise<void> {
    return await this.recipeModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true },
    )
  }
}
