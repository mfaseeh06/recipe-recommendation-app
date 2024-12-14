import React from 'react';
import { FilterOptions, MealType } from '../types/recipe';

interface Props {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const RecipeFilters: React.FC<Props> = ({ filters, onFilterChange }) => {
  const mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];
  const diets = ['', 'vegetarian', 'vegan', 'gluten-free'];

  return (
    <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Meal Type</label>
        <select
          value={filters.mealType}
          onChange={(e) => onFilterChange({ ...filters, mealType: e.target.value as MealType })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">All</option>
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Maximum Preparation Time (minutes)
        </label>
        <input
          type="number"
          value={filters.maxReadyTime}
          onChange={(e) => onFilterChange({ ...filters, maxReadyTime: Number(e.target.value) })}
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Dietary Restrictions</label>
        <select
          value={filters.diet}
          onChange={(e) => onFilterChange({ ...filters, diet: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {diets.map((diet) => (
            <option key={diet} value={diet}>
              {diet ? diet.charAt(0).toUpperCase() + diet.slice(1) : 'None'}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};