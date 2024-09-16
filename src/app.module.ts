import { Module } from '@nestjs/common'
import { IngredientsModule } from './modules/ingredients/ingredients.module'
import { MongooseModule } from '@nestjs/mongoose'
import { UnitsModule } from './modules/units/units.module'
import { RecipesModule } from './modules/recipes/recipes.module'
import { EventsModule } from './modules/events/events.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/recipesDB'),
    IngredientsModule,
    UnitsModule,
    RecipesModule,
    EventsModule,
  ],
})
export class AppModule {}
