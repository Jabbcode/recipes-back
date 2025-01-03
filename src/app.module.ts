import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'

import { IngredientsModule } from '@/modules/ingredients/ingredients.module'
import { UnitsModule } from '@/modules/units/units.module'
import { RecipesModule } from '@/modules/recipes/recipes.module'
import { EventsModule } from '@/modules/events/events.module'
import { FoodTypesModule } from '@/modules/food-types/food-types.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    IngredientsModule,
    UnitsModule,
    RecipesModule,
    EventsModule,
    FoodTypesModule,
  ],
})
export class AppModule {}
