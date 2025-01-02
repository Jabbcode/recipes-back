import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { EventsService } from './events.service'
import { EventsController } from './events.controller'
import { EventRepository } from './events.repository'

import { Event, EventSchema } from './schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }])],
  controllers: [EventsController],
  providers: [EventsService, EventRepository],
})
export class EventsModule {}
