import { Module } from '@nestjs/common'
import { IngredientsService } from './ingredients.service'
import { IngredientsController } from './ingredients.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Ingredient, IngredientSchema } from './schema/ingredient.schema'
import { IngredientRepository } from './ingredients.repository'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientRepository],
})
export class IngredientsModule {}
