import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

import { FoodTypes } from '@/types'

export type FoodTypeDocument = HydratedDocument<FoodType>

@Schema({
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    },
  },
})
export class FoodType {
  @Prop({ required: true, enum: FoodTypes })
  type: string
}

export const FoodTypeSchema = SchemaFactory.createForClass(FoodType)
