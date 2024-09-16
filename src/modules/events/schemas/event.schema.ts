import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { Recipe } from 'src/modules/recipes/schema/recipe.schema'

export type Comidas = 'Desayuno' | 'Almuerzo' | 'Cena'

export type EventDocument = HydratedDocument<Event>

@Schema()
export class Event {
  @Prop({ required: true })
  date: Date

  @Prop({ type: String })
  type: Comidas

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' })
  recipe: Recipe
}

export const EventSchema = SchemaFactory.createForClass(Event)
