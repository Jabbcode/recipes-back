import { HttpException, Injectable } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { EventRepository } from './events.repository'

@Injectable()
export class EventsService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(createEventDto: CreateEventDto) {
    console.log(createEventDto)
    try {
      return await this.eventRepository.create(createEventDto)
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

  async findAll() {
    return await this.eventRepository.findAll()
  }

  async findOne(id: string) {
    return await this.eventRepository.findOne(id)
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      const event = await this.eventRepository.findOne(id)

      if (!event) {
        throw new HttpException(
          {
            statusCode: 400,
            message: `No existe un evento con el id ${id}`,
          },
          400,
        )
      }

      return await this.eventRepository.update(id, updateEventDto)
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
    return await this.eventRepository.deleteEvent(id)
  }
}