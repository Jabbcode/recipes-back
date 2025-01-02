import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

import { IngredientComplete } from '@/modules/ingredients/schema'

export type RecipeDocument = HydratedDocument<Recipe>

@Schema({
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    },
  },
})
export class Recipe {
  @Prop({ required: true, type: String })
  title: string

  @Prop({ required: true, type: String })
  description: string

  @Prop({ type: [{ type: IngredientComplete }] })
  ingredients: IngredientComplete[]
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe)
