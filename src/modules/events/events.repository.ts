import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { FilterEventDto } from './dto'
import { Event } from './schemas'

@Injectable()
export class EventRepository {
  constructor(@InjectModel(Event.name) private readonly eventModel: Model<Event>) {}

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ events: Event[]; pages: number; total: number }> {
    const skip = (page - 1) * limit
    const events = await this.eventModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate([
        { path: 'date' },
        { path: 'foodType' },
        {
          path: 'recipe',
          populate: {
            path: 'ingredients',
            populate: [
              { path: 'name', select: 'name' },
              { path: 'unit', select: ['name', 'description'] },
            ],
          },
        },
      ])
      .exec()

    const count = await this.eventModel.countDocuments().exec()
    const pages = Math.ceil(count / limit)

    return { events, pages, total: count }
  }

  async findByName(name: string): Promise<Event | null> {
    return await this.eventModel.findOne({ name }).exec()
  }

  async findByFilter(filter: FilterEventDto): Promise<Event[]> {
    const query = this.eventModel.find()

    if (filter.date) {
      const month = new Date(filter.date).getMonth() + 1
      query.where({
        $expr: {
          $eq: [{ $month: '$date' }, month],
        },
      })
    }

    if (filter.foodType) {
      query.where('type', filter.foodType)
    }

    if (filter.startDate && filter.endDate) {
      query.where('date', { $gte: filter.startDate, $lte: filter.endDate })
    }

    return query.populate([{ path: 'date' }, { path: 'type' }, { path: 'recipe' }]).exec()
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findById(id).exec()
  }

  async create(event: Event): Promise<Event> {
    const newEvent = await this.eventModel.create(event)

    return newEvent.populate([
      { path: 'date' },
      { path: 'foodType' },
      {
        path: 'recipe',
        populate: {
          path: 'ingredients',
          populate: [
            { path: 'name', select: 'name' },
            { path: 'unit', select: ['name', 'description'] },
          ],
        },
      },
    ])
  }

  async update(id: string, event: Event): Promise<Event> {
    return this.eventModel.findByIdAndUpdate(id, event, { new: true }).exec()
  }

  async deleteEvent(id: string) {
    await this.eventModel.deleteOne({ _id: id })
  }
}
