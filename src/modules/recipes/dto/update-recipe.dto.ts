import { PartialType } from '@nestjs/mapped-types';
import { CreateRecipeDto } from './create-recipe.dto';
import { IngredientComplete } from 'src/modules/ingredients/schema/ingredientComplete.schema';

export class UpdateRecipeDto extends PartialType(CreateRecipeDto) {
  title: string

  description: string;

  ingredients: IngredientComplete[];
}
