import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument, ObjectId } from 'mongoose'
import { Unit } from 'src/modules/units/schemas/unit.schema'

export type IngredientCompleteDocument = HydratedDocument<IngredientComplete>

@Schema()
export class IngredientComplete {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' })
  name: ObjectId

  @Prop()
  quantity: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Unit' })
  unit: Unit
}

export const IngredientCompleteSchema =
  SchemaFactory.createForClass(IngredientComplete)
