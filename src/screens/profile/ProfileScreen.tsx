import React from 'react';
import { ScrollView } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Button,
  H1,
  H2,
  Card,
  Separator,
} from 'tamagui';
import { Moon, Sun, Heart, BookOpen, Settings, Info } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';
import { useAppTheme } from '../../context/ThemeContext';
import { recipes, categories, notes } from '../../utils/dummyData';

export const ProfileScreen: React.FC = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useAppTheme();

  const stats = {
    totalRecipes: recipes.length,
    totalCategories: categories.length,
    totalNotes: notes.length,
    favoriteRecipes: recipes.filter(r => r.isFavorite).length,
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background.val }}>
      <YStack padding="$4" space="$6">
        {/* Header */}
        <YStack space="$2">
          <H1 color={theme.color.val}>Profile</H1>
          <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
            Manage your Recipe Book settings and preferences
          </Text>
        </YStack>

        {/* Theme Toggle */}
        <Card
          elevate
          size="$4"
          bordered
          borderRadius="$6"
          backgroundColor={theme.background.val}
          borderColor={theme.borderColor.val}
        >
          <Card.Header padded>
            <YStack space="$3">
              <H2 fontSize="$6" color={theme.color.val}>
                Appearance
              </H2>
              
              <XStack justifyContent="space-between" alignItems="center">
                <YStack space="$1">
                  <Text fontSize="$4" color={theme.color.val}>
                    Theme
                  </Text>
                  <Text fontSize="$3" color={theme.color.val} opacity={0.7}>
                    {isDark ? 'Dark mode' : 'Light mode'}
                  </Text>
                </YStack>
                
                <Button
                  size="$4"
                  circular
                  backgroundColor={isDark ? theme.yellow10.val : theme.blue10.val}
                  onPress={toggleTheme}
                  pressStyle={{
                    scale: 0.9,
                    backgroundColor: isDark ? theme.yellow9.val : theme.blue9.val,
                  }}
                  animation="quick"
                >
                  {isDark ? (
                    <Sun size={24} color="white" />
                  ) : (
                    <Moon size={24} color="white" />
                  )}
                </Button>
              </XStack>
            </YStack>
          </Card.Header>
        </Card>

        {/* Stats */}
        <YStack space="$3">
          <H2 fontSize="$6" color={theme.color.val}>
            Your Recipe Book Stats
          </H2>
          
          <YStack space="$3">
            <Card
              elevate
              size="$3"
              bordered
              borderRadius="$4"
              backgroundColor={theme.background.val}
              borderColor={theme.borderColor.val}
            >
              <Card.Header padded>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space="$2">
                    <BookOpen size={20} color={theme.blue10.val} />
                    <Text fontSize="$4" color={theme.color.val}>
                      Total Recipes
                    </Text>
                  </XStack>
                  <Text fontSize="$6" fontWeight="bold" color={theme.blue10.val}>
                    {stats.totalRecipes}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>

            <Card
              elevate
              size="$3"
              bordered
              borderRadius="$4"
              backgroundColor={theme.background.val}
              borderColor={theme.borderColor.val}
            >
              <Card.Header padded>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space="$2">
                    <Heart size={20} color={theme.red10.val} />
                    <Text fontSize="$4" color={theme.color.val}>
                      Favorite Recipes
                    </Text>
                  </XStack>
                  <Text fontSize="$6" fontWeight="bold" color={theme.red10.val}>
                    {stats.favoriteRecipes}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>

            <Card
              elevate
              size="$3"
              bordered
              borderRadius="$4"
              backgroundColor={theme.background.val}
              borderColor={theme.borderColor.val}
            >
              <Card.Header padded>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space="$2">
                    <Settings size={20} color={theme.green10.val} />
                    <Text fontSize="$4" color={theme.color.val}>
                      Categories
                    </Text>
                  </XStack>
                  <Text fontSize="$6" fontWeight="bold" color={theme.green10.val}>
                    {stats.totalCategories}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>

            <Card
              elevate
              size="$3"
              bordered
              borderRadius="$4"
              backgroundColor={theme.background.val}
              borderColor={theme.borderColor.val}
            >
              <Card.Header padded>
                <XStack justifyContent="space-between" alignItems="center">
                  <XStack alignItems="center" space="$2">
                    <Info size={20} color={theme.orange10.val} />
                    <Text fontSize="$4" color={theme.color.val}>
                      Total Notes
                    </Text>
                  </XStack>
                  <Text fontSize="$6" fontWeight="bold" color={theme.orange10.val}>
                    {stats.totalNotes}
                  </Text>
                </XStack>
              </Card.Header>
            </Card>
          </YStack>
        </YStack>

        {/* App Info */}
        <Card
          elevate
          size="$4"
          bordered
          borderRadius="$6"
          backgroundColor={theme.background.val}
          borderColor={theme.borderColor.val}
        >
          <Card.Header padded>
            <YStack space="$3">
              <H2 fontSize="$6" color={theme.color.val}>
                About Recipe Book
              </H2>
              
              <YStack space="$2">
                <Text fontSize="$4" color={theme.color.val}>
                  Version 1.0.0
                </Text>
                <Text fontSize="$3" color={theme.color.val} opacity={0.7}>
                  Built with React Native, Expo, and Tamagui
                </Text>
                <Text fontSize="$3" color={theme.color.val} opacity={0.7}>
                  A beautiful and intuitive way to organize your recipes
                </Text>
              </YStack>
            </YStack>
          </Card.Header>
        </Card>

        {/* Coming Soon Features */}
        <Card
          elevate
          size="$4"
          bordered
          borderRadius="$6"
          backgroundColor={theme.background.val}
          borderColor={theme.borderColor.val}
        >
          <Card.Header padded>
            <YStack space="$3">
              <H2 fontSize="$6" color={theme.color.val}>
                Coming Soon
              </H2>
              
              <YStack space="$2">
                <Text fontSize="$4" color={theme.color.val}>
                  🖼️ Recipe Image Upload
                </Text>
                <Text fontSize="$4" color={theme.color.val}>
                  📱 Cloud Sync
                </Text>
                <Text fontSize="$4" color={theme.color.val}>
                  🍳 Cooking Timer
                </Text>
                <Text fontSize="$4" color={theme.color.val}>
                  📊 Nutritional Information
                </Text>
                <Text fontSize="$4" color={theme.color.val}>
                  🌍 Recipe Sharing
                </Text>
              </YStack>
            </YStack>
          </Card.Header>
        </Card>
      </YStack>
    </ScrollView>
  );
};
