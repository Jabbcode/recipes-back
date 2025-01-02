import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'

import { Recipe } from '@/modules/recipes/schema/recipe.schema'
import { FoodTypes } from '@/types'

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

  @Prop({ type: String })
  type: typeof FoodTypes

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' })
  recipe: Recipe
}

export const EventSchema = SchemaFactory.createForClass(Event)
