import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { Event } from './schemas/event.schema'
import { FilterEventDto } from './dto/filter-event.dto'
import { MongoValidIdPipe } from 'src/pipes/mongo-valid-id.pipe'

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

  @Post('/search')
  @HttpCode(200)
  async findByFilter(@Body() filter: FilterEventDto): Promise<Event[]> {
    return await this.eventsService.findByFilter(filter)
  }

  @Get(':id')
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<Event> {
    return await this.eventsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, updateEventDto)
  }

  @Delete(':id')
  async remove(@Param('id', MongoValidIdPipe) id: string) {
    return await this.eventsService.remove(id)
  }
}
