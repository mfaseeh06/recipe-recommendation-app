import create from 'zustand';
import { Recipe } from '../types/recipe';

interface RecipeStore {
  recipes: Recipe[];
  favorites: Recipe[];
  setRecipes: (recipes: Recipe[]) => void;
  addToFavorites: (recipe: Recipe) => void;
  removeFromFavorites: (recipeId: number) => void;
  isFavorite: (recipeId: number) => boolean;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  favorites: [],
  setRecipes: (recipes) => set({ recipes }),
  addToFavorites: (recipe) => set((state) => ({
    favorites: [...state.favorites, recipe],
  })),
  removeFromFavorites: (recipeId) => set((state) => ({
    favorites: state.favorites.filter((recipe) => recipe.id !== recipeId),
  })),
  isFavorite: (recipeId) => get().favorites.some((recipe) => recipe.id === recipeId),
}));