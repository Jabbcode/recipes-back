import { Module } from '@nestjs/common'
import { UnitsService } from './units.service'
import { UnitsController } from './units.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Unit, UnitSchema } from './schemas/unit.schema'
import { UnitRepository } from './units.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Unit.name, schema: UnitSchema }]),
  ],
  controllers: [UnitsController],
  providers: [UnitsService, UnitRepository],
})
export class UnitsModule {}
