import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { FoodType } from './schema'
import { FoodTypes } from '@/types'

@Injectable()
export class FoodTypeRepository {
  constructor(@InjectModel(FoodType.name) private readonly foodTypeModel: Model<FoodType>) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ foodTypes: FoodType[]; pages: number; total: number }> {
    const skip = (page - 1) * limit
    const foodTypes = await this.foodTypeModel.find().skip(skip).limit(limit).exec()

    const count = await this.foodTypeModel.countDocuments().exec()
    const pages = Math.ceil(count / limit)

    return { foodTypes, pages, total: count }
  }

  async findByName(type: FoodTypes): Promise<FoodType | null> {
    return await this.foodTypeModel.findOne({ type }).exec()
  }

  async findOne(id: string): Promise<FoodType | null> {
    return this.foodTypeModel.findById(id).exec()
  }

  async create(foodType: FoodType): Promise<FoodType> {
    return await this.foodTypeModel.create(foodType)
  }

  async update(id: string, foodType: FoodType): Promise<FoodType> {
    return this.foodTypeModel.findByIdAndUpdate(id, foodType, { new: true }).exec()
  }

  async deleteEvent(id: string) {
    await this.foodTypeModel.deleteOne({ _id: id })
  }
}
