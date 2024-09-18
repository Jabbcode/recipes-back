import { Module } from '@nestjs/common'
import { IngredientsModule } from './modules/ingredients/ingredients.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UnitsModule } from './modules/units/units.module'
import { RecipesModule } from './modules/recipes/recipes.module'
import { EventsModule } from './modules/events/events.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB_CONNECTION),
    IngredientsModule,
    UnitsModule,
    RecipesModule,
    EventsModule,
  ],
})
export class AppModule {}
