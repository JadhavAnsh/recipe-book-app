import { gql } from '@apollo/client';

export const RECIPES_QUERY = gql`
  query Recipes {
    recipes {
      id
      title
      category
      categoryId
      image
      ingredients
      steps
      prepTime
      cookTime
      servings
    }
  }
`;

export const RECIPE_QUERY = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      category
      categoryId
      image
      ingredients
      steps
      prepTime
      cookTime
      servings
    }
  }
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($input: CreateRecipeInput!) {
    createRecipe(createRecipeInput: $input) {
      id
      title
      category
      categoryId
      image
      ingredients
      steps
      prepTime
      cookTime
      servings
    }
  }
`;

export const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipe($input: UpdateRecipeInput!) {
    updateRecipe(updateRecipeInput: $input) {
      id
      title
      category
      categoryId
      image
      ingredients
      steps
      prepTime
      cookTime
      servings
    }
  }
`;

export const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipe($id: ID!) {
    removeRecipe(id: $id) {
      id
    }
  }
`;

export const RECIPES_BY_CATEGORY_QUERY = gql`
  query RecipesByCategory($categoryId: ID!) {
    recipesByCategory(categoryId: $categoryId) {
      id
      title
      category
      categoryId
      image
      ingredients
      steps
      prepTime
      cookTime
      servings
    }
  }
`;



