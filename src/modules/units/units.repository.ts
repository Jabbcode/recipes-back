import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Unit } from './schemas/unit.schema'
import { FilterUnitDto } from './dto/filter-unit.dto'

@Injectable()
export class UnitRepository {
  constructor(
    @InjectModel(Unit.name) private readonly unitModel: Model<Unit>,
  ) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ units: Unit[]; pages: number; total: number }> {
    const skip = (page - 1) * limit
    const units = await this.unitModel
      .find()
      .select(['name', 'description', 'isActive'])
      .skip(skip)
      .limit(limit)
      .exec()

    const count = await this.unitModel.countDocuments().exec()
    const pages = Math.ceil(count / limit)

    return { units, pages, total: count }
  }

  async findByFilter(filter: FilterUnitDto): Promise<Unit[]> {
    const query = this.unitModel.find()

    if (filter.name) {
      query.where('name', { $regex: filter.name, $options: 'i' })
    }

    if (filter.description) {
      query.where('description', { $regex: filter.description, $options: 'i' })
    }

    if (filter.isActive !== undefined) {
      query.where('isActive', filter.isActive)
    }

    return query.exec()
  }

  async findByName(name: string): Promise<Unit | null> {
    return await this.unitModel.findOne({ name }).exec()
  }

  async findOne(id: string): Promise<Unit> {
    return this.unitModel.findById(id).exec()
  }

  async create(unit: Unit): Promise<Unit> {
    return this.unitModel.create(unit)
  }

  async update(id: string, unit: Unit): Promise<Unit> {
    return this.unitModel.findByIdAndUpdate(id, unit, { new: true }).exec()
  }

  async delete(id: string): Promise<Unit> {
    return await this.unitModel.findOneAndDelete({ _id: id })
  }
}
