import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/api';
import { Recipe } from '../types/recipe';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useRecipeStore } from '../store/useRecipeStore';

export const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useRecipeStore();
  const favorite = recipe ? isFavorite(recipe.id) : false;

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const data = await getRecipeById(Number(id));
        setRecipe(data);
      }
    };
    fetchRecipe();
  }, [id]);

  const toggleFavorite = () => {
    if (!recipe) return;
    if (favorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{recipe.title}</h1>
            <button
              onClick={toggleFavorite}
              className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            >
              {favorite ? (
                <HeartSolidIcon className="h-8 w-8" />
              ) : (
                <HeartIcon className="h-8 w-8" />
              )}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              {recipe.readyInMinutes} minutes
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full">
              {recipe.servings} servings
            </span>
            {recipe.vegetarian && (
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                Vegetarian
              </span>
            )}
            {recipe.vegan && (
              <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                Vegan
              </span>
            )}
            {recipe.glutenFree && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 rounded-full">
                Gluten Free
              </span>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              {recipe.extendedIngredients.map((ingredient, index) => (
                <li key={`${ingredient.id}-${index}-${ingredient.name}`}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Instructions</h2>
            <div
              className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};