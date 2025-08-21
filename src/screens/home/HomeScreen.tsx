import React, { useState, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  H1,
  H2,
} from 'tamagui';
import { Search, Plus, Filter } from '@tamagui/lucide-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { RecipeCard } from '../../components/recipe/RecipeCard';
import { CategoryCard } from '../../components/recipe/CategoryCard';
import { EmptyState } from '../../components/common/EmptyState';
import {
  recipes,
  categories,
  getRecipesByCategory,
  toggleFavorite,
} from '../../utils/dummyData';

type RootStackParamList = {
  RecipeDetail: { recipeId: string };
  AddRecipe: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList, params?: any) => void;
};

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const filteredRecipes = useMemo(() => {
    let filtered = recipes;
    
    if (selectedCategory) {
      filtered = getRecipesByCategory(selectedCategory);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate('RecipeDetail', { recipeId });
  };

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleAddRecipe = () => {
    navigation.navigate('AddRecipe');
  };

  const handleFavoriteToggle = (recipeId: string) => {
    toggleFavorite(recipeId);
    // Force re-render
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 100);
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
          <H1 color={theme.color.val}>Recipe Book</H1>
          <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
            Discover delicious recipes and organize your cooking journey
          </Text>
        </YStack>

        {/* Search and Add Recipe */}
        <XStack space="$3" alignItems="center">
          <XStack flex={1} space="$2" alignItems="center">
            <Search size={20} color={theme.color.val} opacity={0.6} />
            <Input
              flex={1}
              placeholder="Search recipes..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              backgroundColor={theme.backgroundHover.val}
              borderColor={theme.borderColor.val}
              borderRadius="$4"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize="$4"
              color={theme.color.val}
            />
          </XStack>
          
          <Button
            size="$4"
            circular
            backgroundColor={theme.blue10.val}
            onPress={handleAddRecipe}
            pressStyle={{
              scale: 0.9,
              backgroundColor: theme.blue9.val,
            }}
            animation="quick"
          >
            <Plus size={24} color="white" />
          </Button>
        </XStack>

        {/* Categories */}
        <YStack space="$3">
          <H2 fontSize="$6" color={theme.color.val}>
            Categories
          </H2>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            <XStack space="$3">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onPress={() => handleCategoryPress(category.id)}
                />
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        {/* Recipes */}
        <YStack space="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <H2 fontSize="$6" color={theme.color.val}>
              {selectedCategory 
                ? `${categories.find(c => c.id === selectedCategory)?.name} Recipes`
                : 'All Recipes'
              }
            </H2>
            
            {selectedCategory && (
              <Button
                size="$3"
                backgroundColor="transparent"
                borderColor={theme.borderColor.val}
                onPress={() => setSelectedCategory(null)}
                pressStyle={{
                  scale: 0.95,
                  backgroundColor: theme.backgroundHover.val,
                }}
                animation="quick"
              >
                <Filter size={16} color={theme.color.val} />
                <Text fontSize="$3" color={theme.color.val} marginLeft="$2">
                  Clear
                </Text>
              </Button>
            )}
          </XStack>

          {filteredRecipes.length === 0 ? (
            <EmptyState
              title="No recipes found"
              message={
                searchQuery.trim()
                  ? `No recipes match "${searchQuery}"`
                  : selectedCategory
                  ? `No recipes in this category yet`
                  : "No recipes available"
              }
              icon="🔍"
            />
          ) : (
            <YStack space="$4">
              {filteredRecipes.map((recipe) => (
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
      </YStack>
    </ScrollView>
  );
};
