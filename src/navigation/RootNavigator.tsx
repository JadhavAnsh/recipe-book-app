import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking } from 'react-native';
import { HomeScreen } from '../screens/home/HomeScreen';
import { RecipeDetailScreen } from '../screens/recipe/RecipeDetailScreen';
import { AddRecipeScreen } from '../screens/addRecipe/AddRecipeScreen';
import { CategoriesScreen } from '../screens/categories/CategoriesScreen';
import { FavoritesScreen } from '../screens/favorites/FavoritesScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { TabNavigator } from './TabNavigator';

export type RootStackParamList = {
  TabNavigator: undefined;
  RecipeDetail: { recipeId: string };
  AddRecipe: undefined;
  Categories: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const linking = {
    prefixes: ['myapp://'],
    config: {
      screens: {
        TabNavigator: 'tabs',
        RecipeDetail: 'recipe/:id',
        AddRecipe: 'add-recipe',
        Categories: 'category/:id',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="AddRecipe" component={AddRecipeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
