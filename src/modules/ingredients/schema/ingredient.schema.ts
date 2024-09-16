import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type IngredientDocument = HydratedDocument<Ingredient>

@Schema()
export class Ingredient {
  @Prop({ required: true, unique: true, type: String, maxlength: 15 })
  name: string

  @Prop({ default: true })
  isActive: boolean
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient)
