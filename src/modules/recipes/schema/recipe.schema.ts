import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { IngredientComplete } from 'src/modules/ingredients/schema/ingredientComplete.schema'

export type RecipeDocument = HydratedDocument<Recipe>

@Schema()
export class Recipe {
  @Prop({ required: true, type: String })
  title: string

  @Prop({ required: true, type: String })
  description: string

  @Prop()
  ingredients: IngredientComplete[]
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)
