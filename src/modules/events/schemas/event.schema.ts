import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Recipe } from 'src/modules/recipes/schema/recipe.schema'
import { ComidasTypes } from 'src/types'

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
  type: typeof ComidasTypes

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' })
  recipe: Recipe
}

export const EventSchema = SchemaFactory.createForClass(Event)
