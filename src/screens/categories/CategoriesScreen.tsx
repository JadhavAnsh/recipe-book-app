import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H1,
  H2,
} from 'tamagui';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { CategoryCard } from '../../components/recipe/CategoryCard';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { EmptyState } from '../../components/common/EmptyState';
import {
  categories,
  getRecipesByCategory,
  toggleFavorite,
} from '../../utils/dummyData';

type RootStackParamList = {
  RecipeDetail: { recipeId: string };
  Home: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
  goBack: () => void;
};

export const CategoriesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleFavoriteToggle = (recipeId: string) => {
    toggleFavorite(recipeId);
    // Force re-render
    setSelectedCategory(selectedCategory);
  };

  const selectedCategoryData = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)
    : null;

  const selectedCategoryRecipes = selectedCategory 
    ? getRecipesByCategory(selectedCategory)
    : [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <H1 color={theme.color.val}>Categories</H1>
          <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
            Browse recipes by category
          </Text>
        </YStack>

        {/* Categories Grid */}
        <YStack space="$3">
          <H2 fontSize="$6" color={theme.color.val}>
            All Categories
          </H2>
          
          <YStack space="$3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onPress={() => handleCategoryPress(category.id)}
              />
            ))}
          </YStack>
        </YStack>

        {/* Selected Category Recipes */}
        {selectedCategory && (
          <YStack space="$3">
            <XStack justifyContent="space-between" alignItems="center">
              <H2 fontSize="$6" color={theme.color.val}>
                {selectedCategoryData?.name} Recipes
              </H2>
              
              <Text
                fontSize="$4"
                color={theme.color.val}
                opacity={0.7}
              >
                {selectedCategoryRecipes.length} recipe{selectedCategoryRecipes.length !== 1 ? 's' : ''}
              </Text>
            </XStack>

            {selectedCategoryRecipes.length === 0 ? (
              <EmptyState
                title={`No ${selectedCategoryData?.name} recipes yet`}
                message="This category is empty. Add some recipes to get started!"
                icon="🍽️"
                actionText="Add Recipe"
                onAction={() => navigation.navigate('Home')}
              />
            ) : (
              <YStack space="$4">
                {selectedCategoryRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onPress={() => handleRecipePress(recipe.id)}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </YStack>
            )}
          </YStack>
        )}

        {/* Empty State when no category is selected */}
        {!selectedCategory && (
          <EmptyState
            title="Select a Category"
            message="Tap on a category above to see its recipes"
            icon="👆"
          />
        )}
      </YStack>
    </ScrollView>
  );
};
