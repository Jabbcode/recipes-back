import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UnitsService } from './units.service'
import { UnitsController } from './units.controller'
import { UnitRepository } from './units.repository'

import { Unit, UnitSchema } from './schemas'

@Module({
  imports: [MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }])],
  controllers: [UnitsController],
  providers: [UnitsService, UnitRepository],
})
export class UnitsModule {}
