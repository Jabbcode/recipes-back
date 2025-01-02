import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

import { Unit } from '@/modules/units/schemas'
import { Ingredient } from './ingredient.schema'

export type IngredientCompleteDocument = HydratedDocument<IngredientComplete>

@Schema({
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    },
  },
})
export class IngredientComplete {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' })
  name: Ingredient

  @Prop()
  quantity: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' })
  unit: Unit
}

export const IngredientCompleteSchema = SchemaFactory.createForClass(IngredientComplete)
