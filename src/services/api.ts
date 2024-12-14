import axios from 'axios';
import { Recipe } from '../types/recipe';

const API_KEY = 'c92edfbecd7a41ac9f324c5ac079b866'; // Replace with your actual API key
const BASE_URL = 'https://api.spoonacular.com/recipes';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const searchRecipesByIngredients = async (ingredients: string[]): Promise<Recipe[]> => {
  try {
    const response = await api.get('/complexSearch', {
      params: {
        includeIngredients: ingredients.join(','),
        addRecipeInformation: true,
        fillIngredients: true,
        number: 12,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};

export const getRecipeById = async (id: number): Promise<Recipe | null> => {
  try {
    const response = await api.get(`/${id}/information`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return null;
  }
};