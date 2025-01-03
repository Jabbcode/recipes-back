import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { FoodTypesService } from './food-types.service'
import { FoodTypesController } from './food-types.controller'
import { FoodTypeRepository } from './food-types.repository'

import { FoodType, FoodTypeSchema } from './schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: FoodType.name, schema: FoodTypeSchema }])],
  controllers: [FoodTypesController],
  providers: [FoodTypesService, FoodTypeRepository],
})
export class FoodTypesModule {}
