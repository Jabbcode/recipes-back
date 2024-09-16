import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { IngredientComplete } from 'src/modules/ingredients/schema/ingredientComplete.schema'

export class CreateRecipeDto {
  @IsString({ message: 'El titulo debe ser de tipo string' })
  @IsNotEmpty({ message: 'El titulo es obligatorio' })
  title: string

  @IsString({ message: 'La descripcion debe ser de tipo string' })
  @IsNotEmpty({ message: 'La descripcion es obligatoria' })
  @MaxLength(250, {
    message: 'La descripcion debe tener un maximo de 250 caracteres',
  })
  description: string

  @ArrayNotEmpty()
  @Type(() => IngredientComplete)
  ingredients: IngredientComplete[]
}
