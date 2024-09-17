import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Recipe } from './schema/recipe.schema'

@Injectable()
export class RecipeRepository {
  constructor(
    @InjectModel(Recipe.name) private readonly recipeModel: Model<Recipe>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ recipes: Recipe[]; pages: number; total: number }> {
    const skip = (page - 1) * limit
    const recipes = await this.recipeModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate({
        path: 'ingredients',
        populate: [
          { path: 'name', select: 'name' },
          { path: 'unit', select: ['name', 'description'] },
        ],
      })
      .exec()

    const count = await this.recipeModel.countDocuments().exec()
    const pages = Math.ceil(count / limit)

    return { recipes, pages, total: count }
  }

  async findIsActive(): Promise<Recipe[]> {
    return await this.recipeModel.find({ isActive: true }).exec()
  }

  async findByName(name: string): Promise<Recipe | null> {
    return await this.recipeModel.findOne({ name }).exec()
  }

  async findOne(id: string): Promise<Recipe> {
    return this.recipeModel
      .findById(id)
      .populate([
        {
          path: 'ingredients.unit',
          select: ['name', 'description'],
        },
        { path: 'ingredients.name', select: 'name' },
      ])
      .exec()
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
