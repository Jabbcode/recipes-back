import { Module } from '@nestjs/common'
import { RecipesService } from './recipes.service'
import { RecipesController } from './recipes.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Recipe, RecipeSchema } from './schema/recipe.schema'
import { RecipeRepository } from './recipes.repository'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [RecipesController],
  providers: [RecipesService, RecipeRepository],
})
export class RecipesModule {}
