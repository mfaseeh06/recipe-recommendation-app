import React, { useState } from 'react';
import { IngredientInput } from '../components/IngredientInput';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeFilters } from '../components/RecipeFilters';
import { searchRecipesByIngredients } from '../services/api';
import { useRecipeStore } from '../store/useRecipeStore';
import { FilterOptions, Recipe } from '../types/recipe';

export const HomePage: React.FC = () => {
  const { recipes, setRecipes } = useRecipeStore();
  const [filters, setFilters] = useState<FilterOptions>({
    mealType: '',
    maxReadyTime: 0,
    diet: '',
  });

  const handleIngredientsSubmit = async (ingredients: string[]) => {
    const results = await searchRecipesByIngredients(ingredients);
    setRecipes(results);
  };

  const filteredRecipes = recipes.filter((recipe: Recipe) => {
    if (filters.mealType && recipe.dishTypes?.includes(filters.mealType)) {
      return false;
    }
    if (filters.maxReadyTime && recipe.readyInMinutes > filters.maxReadyTime) {
      return false;
    }
    if (filters.diet) {
      switch (filters.diet) {
        case 'vegetarian':
          if (!recipe.vegetarian) return false;
          break;
        case 'vegan':
          if (!recipe.vegan) return false;
          break;
        case 'gluten-free':
          if (!recipe.glutenFree) return false;
          break;
      }
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Recipe Recommendation
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <RecipeFilters filters={filters} onFilterChange={setFilters} />
        </div>
        
        <div className="lg:col-span-3">
          <IngredientInput onIngredientsSubmit={handleIngredientsSubmit} />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          
          {filteredRecipes.length === 0 && recipes.length > 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              No recipes match your filters.
            </p>
          )}
          
          {recipes.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
              Enter ingredients to find matching recipes.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};