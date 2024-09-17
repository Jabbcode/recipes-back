import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type IngredientDocument = HydratedDocument<Ingredient>

@Schema({
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    },
  },
})
export class Ingredient {
  @Prop({ required: true, unique: true, type: String, maxlength: 15 })
  name: string

  @Prop({ default: true })
  isActive: boolean
}

export const IngredientSchema = SchemaFactory.createForClass(Ingredient)
