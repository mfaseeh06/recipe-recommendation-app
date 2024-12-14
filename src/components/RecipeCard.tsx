import React from 'react';
import { Recipe } from '../types/recipe';
import { HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useRecipeStore } from '../store/useRecipeStore';
import { Link } from 'react-router-dom';

interface Props {
  recipe: Recipe;
}

export const RecipeCard: React.FC<Props> = ({ recipe }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useRecipeStore();
  const favorite = isFavorite(recipe.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(recipe.id);
    } else {
      addToFavorites(recipe);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{recipe.title}</h3>
          <button
            onClick={toggleFavorite}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
          >
            {favorite ? (
              <HeartSolidIcon className="h-6 w-6" />
            ) : (
              <HeartIcon className="h-6 w-6" />
            )}
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <p>Ready in {recipe.readyInMinutes} minutes</p>
          <p>Servings: {recipe.servings}</p>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {recipe.vegetarian && (
            <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs rounded">
              Vegetarian
            </span>
          )}
          {recipe.vegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 text-xs rounded">
              Vegan
            </span>
          )}
          {recipe.glutenFree && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 text-xs rounded">
              Gluten Free
            </span>
          )}
        </div>
        <Link
          to={`/recipe/${recipe.id}`}
          className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};