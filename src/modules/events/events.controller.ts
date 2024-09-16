import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { Event } from './schemas/event.schema'

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(createEventDto)
  }

  @Get()
  async findAll(): Promise<Event[]> {
    return await this.eventsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Event> {
    return await this.eventsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, updateEventDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eventsService.remove(id)
  }
}
