import React from 'react';
import { Card, YStack, XStack, Text, Button, Image } from 'tamagui';
import { Heart, Clock, Users, Zap } from '@tamagui/lucide-icons';
import { Recipe } from '../../utils/dummyData';
import { useTheme } from 'tamagui';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onFavoriteToggle: (recipeId: string) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onPress,
  onFavoriteToggle,
}) => {
  const theme = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return theme.green10.val;
      case 'Medium':
        return theme.yellow10.val;
      case 'Hard':
        return theme.red10.val;
      default:
        return theme.gray10.val;
    }
  };

  return (
    <Card
      elevate
      size="$4"
      bordered
      borderRadius="$6"
      backgroundColor={theme.background.val}
      borderColor={theme.borderColor.val}
      pressStyle={{
        scale: 0.98,
        backgroundColor: theme.backgroundHover.val,
      }}
      animation="quick"
      onPress={onPress}
    >
      <Card.Header padded>
        <YStack space="$2">
          <Image
            source={{ uri: recipe.image }}
            width="100%"
            height={200}
            borderRadius="$4"
            resizeMode="cover"
          />
          
          <YStack space="$2">
            <Text
              fontSize="$6"
              fontWeight="bold"
              color={theme.color.val}
              numberOfLines={2}
            >
              {recipe.title}
            </Text>
            
            <XStack alignItems="center" space="$2">
              <Text
                fontSize="$3"
                color={theme.color.val}
                opacity={0.7}
              >
                {recipe.category}
              </Text>
              <Text
                fontSize="$3"
                color={theme.color.val}
                opacity={0.5}
              >
                •
              </Text>
              <XStack alignItems="center" space="$1">
                <Clock size={14} color={theme.color.val} opacity={0.7} />
                <Text fontSize="$3" color={theme.color.val} opacity={0.7}>
                  {recipe.prepTime + recipe.cookTime} min
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </YStack>
      </Card.Header>

      <Card.Footer padded>
        <XStack justifyContent="space-between" alignItems="center">
          <XStack space="$3">
            <XStack alignItems="center" space="$1">
              <Users size={16} color={theme.color.val} opacity={0.7} />
              <Text fontSize="$3" color={theme.color.val} opacity={0.7}>
                {recipe.servings}
              </Text>
            </XStack>
            
            <XStack alignItems="center" space="$1">
              <Zap size={16} color={getDifficultyColor(recipe.difficulty)} />
              <Text
                fontSize="$3"
                color={getDifficultyColor(recipe.difficulty)}
                fontWeight="500"
              >
                {recipe.difficulty}
              </Text>
            </XStack>
          </XStack>

          <Button
            size="$3"
            circular
            backgroundColor="transparent"
            borderColor={theme.borderColor.val}
            onPress={() => onFavoriteToggle(recipe.id)}
            pressStyle={{
              scale: 0.9,
              backgroundColor: theme.backgroundHover.val,
            }}
            animation="quick"
          >
            <Heart
              size={20}
              fill={recipe.isFavorite ? theme.red10.val : 'transparent'}
              color={recipe.isFavorite ? theme.red10.val : theme.color.val}
            />
          </Button>
        </XStack>
      </Card.Footer>
    </Card>
  );
};
