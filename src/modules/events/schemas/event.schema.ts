import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

import { Recipe } from '@/modules/recipes/schema'
import { FoodType } from '@/modules/food-types/schema'

export type EventDocument = HydratedDocument<Event>

@Schema({
  toJSON: {
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id
      delete ret._id
    },
  },
})
export class Event {
  @Prop({ required: true })
  date: Date

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'FoodType' })
  foodType: FoodType

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' })
  recipe: Recipe
}

export const EventSchema = SchemaFactory.createForClass(Event)
