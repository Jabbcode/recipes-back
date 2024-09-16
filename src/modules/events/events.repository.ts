import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Event } from './schemas/event.schema'

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
  ) {}

  async findAll(): Promise<Event[]> {
    return await this.eventModel
      .find()
      .populate([{ path: 'date' }, { path: 'type' }, { path: 'recipe' }])
      .exec()
  }

  async findByName(name: string): Promise<Event | null> {
    return await this.eventModel.findOne({ name }).exec()
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec()
  }

  async create(event: Event): Promise<Event> {
    return this.eventModel.create(event)
  }

  async update(id: string, event: Event): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, event, { new: true }).exec()
  }

  async deleteEvent(id: string) {
    await this.eventModel.deleteOne({
      where: {
        id,
      },
    })
  }
}
