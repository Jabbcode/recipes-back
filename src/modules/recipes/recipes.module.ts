import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { RecipeRepository } from './recipes.repository'

import { Recipe, RecipeSchema } from './schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }])],
  controllers: [RecipesController],
  providers: [RecipesService, RecipeRepository],
})
export class RecipesModule {}
