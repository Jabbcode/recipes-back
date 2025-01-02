import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { CreateEventDto, FilterEventDto, UpdateEventDto } from './dto'
import { Event } from './schemas'

import { EventsService } from './events.service'

import { MongoValidIdPipe } from '@/pipes'
import { ApiResponses } from '@/decorators'

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponses([
    { status: 201, description: 'Created' },
    { status: 400, description: 'Bad request' },
    { status: 500, description: 'Internal server error' },
  ])
  async create(@Body() createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventsService.create(createEventDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all events' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  async findAll(): Promise<Event[]> {
    return await this.eventsService.findAll()
  }

  @Post('/search')
  @ApiOperation({ summary: 'Find events by filter' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 500, description: 'Internal server error' },
  ])
  @HttpCode(200)
  async findByFilter(@Body() filter: FilterEventDto): Promise<Event[]> {
    return await this.eventsService.findByFilter(filter)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an event by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async findOne(@Param('id', MongoValidIdPipe) id: string): Promise<Event> {
    return await this.eventsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an event by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async update(
    @Param('id', MongoValidIdPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    return await this.eventsService.update(id, updateEventDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an event by id' })
  @ApiResponses([
    { status: 200, description: 'Success' },
    { status: 404, description: 'Not found' },
    { status: 500, description: 'Internal server error' },
  ])
  async remove(@Param('id', MongoValidIdPipe) id: string) {
    return await this.eventsService.remove(id)
  }
}
