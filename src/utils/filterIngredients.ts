import { Ingredient } from "../types";

export const filterIngredients = (ingredients: Ingredient[], type: string) =>
  ingredients.filter((item) => item.type === type);
