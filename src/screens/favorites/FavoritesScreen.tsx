import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H1,
  H2,
} from 'tamagui';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { EmptyState } from '../../components/common/EmptyState';
import {
  recipes,
  toggleFavorite,
} from '../../utils/dummyData';

type RootStackParamList = {
  RecipeDetail: { recipeId: string };
  Home: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
};

export const FavoritesScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [favoriteRecipes, setFavoriteRecipes] = useState(recipes.filter(r => r.isFavorite));
  const [refreshing, setRefreshing] = useState(false);

  // Refresh favorites when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      setFavoriteRecipes(recipes.filter(r => r.isFavorite));
    }, [])
  );

  const handleRefresh = () => {
    setRefreshing(true);
    // Refresh favorites
    setFavoriteRecipes(recipes.filter(r => r.isFavorite));
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleFavoriteToggle = (recipeId: string) => {
    toggleFavorite(recipeId);
    // Update local state
    setFavoriteRecipes(recipes.filter(r => r.isFavorite));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <H1 color={theme.color.val}>Favorites</H1>
          <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
            Your saved recipes and cooking inspiration
          </Text>
        </YStack>

        {/* Favorites Count */}
        <XStack justifyContent="space-between" alignItems="center">
          <H2 fontSize="$6" color={theme.color.val}>
            Favorite Recipes
          </H2>
          
          <Text
            fontSize="$4"
            color={theme.color.val}
            opacity={0.7}
          >
            {favoriteRecipes.length} recipe{favoriteRecipes.length !== 1 ? 's' : ''}
          </Text>
        </XStack>

        {/* Favorites List */}
        {favoriteRecipes.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            message="Start adding recipes to your favorites to see them here!"
            icon="❤️"
            actionText="Browse Recipes"
            onAction={() => navigation.navigate('Home')}
          />
        ) : (
          <YStack space="$4">
            {favoriteRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onPress={() => handleRecipePress(recipe.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </YStack>
        )}

        {/* Tips */}
        {favoriteRecipes.length > 0 && (
          <YStack
            padding="$4"
            backgroundColor={theme.backgroundHover.val}
            borderRadius="$4"
            space="$2"
          >
            <Text
              fontSize="$4"
              fontWeight="bold"
              color={theme.color.val}
            >
              💡 Pro Tip
            </Text>
            <Text
              fontSize="$3"
              color={theme.color.val}
              opacity={0.7}
            >
              Tap the heart icon on any recipe to add or remove it from your favorites. 
              Your favorites are saved locally and will persist between app sessions.
            </Text>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
};
