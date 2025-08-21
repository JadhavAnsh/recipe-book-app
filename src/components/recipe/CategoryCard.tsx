import React from 'react';
import { Card, YStack, XStack, Text } from 'tamagui';
import { Category } from '../../utils/dummyData';
import { useTheme } from 'tamagui';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <Card
      elevate
      size="$3"
      bordered
      borderRadius="$6"
      backgroundColor={theme.background.val}
      borderColor={theme.borderColor.val}
      pressStyle={{
        scale: 0.95,
        backgroundColor: theme.backgroundHover.val,
      }}
      animation="quick"
      onPress={onPress}
    >
      <Card.Header padded>
        <YStack alignItems="center" space="$3">
          <Text fontSize="$12" color={category.color}>
            {category.icon}
          </Text>
          
          <YStack alignItems="center" space="$1">
            <Text
              fontSize="$5"
              fontWeight="bold"
              color={theme.color.val}
              textAlign="center"
            >
              {category.name}
            </Text>
            
            <Text
              fontSize="$3"
              color={theme.color.val}
              opacity={0.7}
              textAlign="center"
            >
              {category.recipeCount} recipe{category.recipeCount !== 1 ? 's' : ''}
            </Text>
          </YStack>
        </YStack>
      </Card.Header>
    </Card>
  );
};
