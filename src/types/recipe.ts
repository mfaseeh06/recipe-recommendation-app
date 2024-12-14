export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  instructions: string;
  extendedIngredients: Ingredient[];
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface FilterOptions {
  mealType: MealType | '';
  maxReadyTime: number;
  diet: string;
}