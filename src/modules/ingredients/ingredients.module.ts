import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { IngredientsService } from './ingredients.service'
import { IngredientsController } from './ingredients.controller'
import { IngredientRepository } from './ingredients.repository'
import { Ingredient, IngredientSchema } from './schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }])],
  controllers: [IngredientsController],
  providers: [IngredientsService, IngredientRepository],
})
export class IngredientsModule {}
