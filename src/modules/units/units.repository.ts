import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Unit } from './schemas/unit.schema'

@Injectable()
export class UnitRepository {
  constructor(
    @InjectModel(Unit.name) private readonly unitModel: Model<Unit>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return await this.unitModel.find().exec()
  }

  async findIsActive(): Promise<Unit[]> {
    return await this.unitModel.find({ isActive: true }).exec()
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

  async delete(id: string): Promise<void> {
    return await this.unitModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true },
    )
  }
}
