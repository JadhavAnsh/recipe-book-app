import React, { useState, useMemo } from 'react';
import { ScrollView } from 'react-native';
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
  categories,
  getRecipesByCategory,
  Recipe as UIRecipe,
} from '../../utils/dummyData';
import { useQuery } from '@apollo/client';
import { RECIPES_QUERY, RECIPES_BY_CATEGORY_QUERY } from '../../services/api/recipes';
import { useDebouncedValue } from '~/utils/useDebouncedValue';
import { useRecipeCounts } from '../../hooks/useRecipeCounts';

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
  const [refreshTick, setRefreshTick] = useState(0);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const { data, loading } = useQuery(RECIPES_QUERY, { skip: !!selectedCategory });
  const { data: byCatData, loading: byCatLoading } = useQuery(RECIPES_BY_CATEGORY_QUERY, {
    skip: !selectedCategory,
    variables: { categoryId: selectedCategory as string },
  });

  const { countsByCategoryId } = useRecipeCounts();
  const apiRecipes = (data?.recipes ?? []) as Array<{
    id: string;
    title: string;
    category: string;
    categoryId?: string | null;
    image?: string | null;
    ingredients: string[];
    steps: string[];
    prepTime: number;
    cookTime: number;
    servings: number;
  }>;

  const byCatRecipes = (byCatData?.recipesByCategory ?? []) as typeof apiRecipes;

  const uiRecipes: UIRecipe[] = useMemo(() => {
    const list = selectedCategory ? byCatRecipes : apiRecipes;
    return list.map((r) => ({
      id: r.id,
      title: r.title,
      category: r.category,
      categoryId: r.categoryId || '',
      image: r.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      ingredients: r.ingredients,
      steps: r.steps,
      prepTime: r.prepTime,
      cookTime: r.cookTime,
      servings: r.servings,
      difficulty: 'Easy',
      isFavorite: favoriteIds.has(r.id),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiRecipes, byCatRecipes, selectedCategory, favoriteIds, refreshTick]);

  const debouncedSearch = useDebouncedValue(searchQuery, 200);

  const filteredRecipes = useMemo(() => {
    let filtered = uiRecipes;
    
    if (selectedCategory) {
      // Filter by category id when provided
      filtered = filtered.filter((r) => r.categoryId === selectedCategory);
    }
    
    if (debouncedSearch.trim()) {
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        recipe.category.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    
    return filtered;
  }, [debouncedSearch, selectedCategory, uiRecipes]);

  // Pull-to-refresh removed; keep a manual tick to force re-render when needed

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
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) next.delete(recipeId); else next.add(recipeId);
      return next;
    });
    setRefreshTick((t) => t + 1);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background.val }}
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
                  count={countsByCategoryId[category.id]}
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

          {(selectedCategory ? byCatLoading : loading) ? (
            <Text color={theme.color.val}>Loading recipes...</Text>
          ) : filteredRecipes.length === 0 ? (
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
