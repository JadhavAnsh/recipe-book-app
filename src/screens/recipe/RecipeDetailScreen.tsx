import React, { useState, useEffect } from 'react';
import { ScrollView, Alert } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  H1,
  H2,
  H3,
  Card,
  Image,
  Separator,
} from 'tamagui';
import { Heart, Clock, Users, Zap, Star, Plus, ArrowLeft } from '@tamagui/lucide-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { NoteCard } from '../../components/recipe/NoteCard';
import { EmptyState } from '../../components/common/EmptyState';
import {
  recipes,
  getNotesByRecipe,
  addNote,
  toggleFavorite,
} from '../../utils/dummyData';
import { RefreshControl } from 'react-native-gesture-handler';

type RouteParams = {
  recipeId: string;
};

type RootStackParamList = {
  Home: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

export const RecipeDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const theme = useTheme();
  const { recipeId } = route.params as RouteParams;
  
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(getNotesByRecipe(recipeId));
  const [recipe, setRecipe] = useState(recipes.find(r => r.id === recipeId));
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!recipe) {
      Alert.alert('Error', 'Recipe not found');
      navigation.goBack();
    }
  }, [recipe, navigation]);

  if (!recipe) {
    return null;
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      const addedNote = addNote(recipeId, newNote.trim());
      setNotes([...notes, addedNote]);
      setNewNote('');
    }
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedNotes = notes.filter(note => note.id !== noteId);
            setNotes(updatedNotes);
          },
        },
      ]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(recipeId);
    setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
  };

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
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <YStack space="$0">
        {/* Header Image */}
        <Image
          source={{ uri: recipe.image }}
          width="100%"
          height={300}
          resizeMode="cover"
        />

        {/* Back Button Overlay */}
        <Button
          position="absolute"
          top={50}
          left={20}
          size="$4"
          circular
          backgroundColor="rgba(0,0,0,0.3)"
          onPress={() => navigation.goBack()}
          pressStyle={{
            scale: 0.9,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          animation="quick"
        >
          <ArrowLeft size={24} color="white" />
        </Button>

        {/* Favorite Button Overlay */}
        <Button
          position="absolute"
          top={50}
          right={20}
          size="$4"
          circular
          backgroundColor="rgba(0,0,0,0.3)"
          onPress={handleFavoriteToggle}
          pressStyle={{
            scale: 0.9,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          animation="quick"
        >
          <Heart
            size={24}
            fill={recipe.isFavorite ? theme.red10.val : 'transparent'}
            color={recipe.isFavorite ? theme.red10.val : 'white'}
          />
        </Button>

        {/* Recipe Content */}
        <YStack padding="$4" space="$6">
          {/* Recipe Header */}
          <YStack space="$2">
            <H1 color={theme.color.val}>{recipe.title}</H1>
            
            <XStack alignItems="center" space="$3">
              <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
                {recipe.category}
              </Text>
              <Text fontSize="$4" color={theme.color.val} opacity={0.5}>
                •
              </Text>
              <XStack alignItems="center" space="$1">
                <Clock size={16} color={theme.color.val} opacity={0.7} />
                <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
                  {recipe.prepTime + recipe.cookTime} min
                </Text>
              </XStack>
            </XStack>

            <XStack space="$4">
              <XStack alignItems="center" space="$1">
                <Users size={16} color={theme.color.val} opacity={0.7} />
                <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
                  {recipe.servings} servings
                </Text>
              </XStack>
              
              <XStack alignItems="center" space="$1">
                <Zap size={16} color={getDifficultyColor(recipe.difficulty)} />
                <Text
                  fontSize="$4"
                  color={getDifficultyColor(recipe.difficulty)}
                  fontWeight="500"
                >
                  {recipe.difficulty}
                </Text>
              </XStack>
            </XStack>
          </YStack>

          <Separator />

          {/* Ingredients */}
          <YStack space="$3">
            <H2 fontSize="$6" color={theme.color.val}>
              Ingredients
            </H2>
            
            <YStack space="$2">
              {recipe.ingredients.map((ingredient, index) => (
                <XStack key={index} alignItems="center" space="$2">
                  <Text fontSize="$3" color={theme.color.val} opacity={0.5}>
                    •
                  </Text>
                  <Text fontSize="$4" color={theme.color.val}>
                    {ingredient}
                  </Text>
                </XStack>
              ))}
            </YStack>
          </YStack>

          <Separator />

          {/* Steps */}
          <YStack space="$3">
            <H2 fontSize="$6" color={theme.color.val}>
              Instructions
            </H2>
            
            <YStack space="$3">
              {recipe.steps.map((step, index) => (
                <Card
                  key={index}
                  elevate
                  size="$2"
                  bordered
                  borderRadius="$4"
                  backgroundColor={theme.backgroundHover.val}
                  borderColor={theme.borderColor.val}
                >
                  <Card.Header padded>
                    <XStack space="$3" alignItems="flex-start">
                      <Text
                        fontSize="$4"
                        fontWeight="bold"
                        color={theme.blue10.val}
                        minWidth={30}
                      >
                        {index + 1}
                      </Text>
                      <Text fontSize="$4" color={theme.color.val} flex={1}>
                        {step}
                      </Text>
                    </XStack>
                  </Card.Header>
                </Card>
              ))}
            </YStack>
          </YStack>

          <Separator />

          {/* Notes Section */}
          <YStack space="$3">
            <H2 fontSize="$6" color={theme.color.val}>
              Notes
            </H2>
            
            {notes.length === 0 ? (
              <EmptyState
                title="No notes yet"
                message="Add your first note below to remember tips and modifications for this recipe!"
                icon="📝"
              />
            ) : (
              <YStack padding="$3">
                {notes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </YStack>
            )}

            {/* Add Note Input */}
            <Card
              elevate
              size="$3"
              bordered
              borderRadius="$4"
              backgroundColor={theme.background.val}
              borderColor={theme.borderColor.val}
            >
              <Card.Header padded>
                <YStack space="$3">
                  <Input
                    placeholder="Add a note about this recipe..."
                    value={newNote}
                    onChangeText={setNewNote}
                    backgroundColor={theme.backgroundHover.val}
                    borderColor={theme.borderColor.val}
                    borderRadius="$4"
                    paddingHorizontal="$3"
                    paddingVertical="$2"
                    fontSize="$4"
                    color={theme.color.val}
                    multiline
                    numberOfLines={3}
                  />
                  
                  <Button
                    backgroundColor={theme.blue10.val}
                    color="white"
                    borderRadius="$4"
                    paddingHorizontal="$4"
                    paddingVertical="$2"
                    onPress={handleAddNote}
                    disabled={!newNote.trim()}
                    pressStyle={{
                      scale: 0.95,
                      backgroundColor: theme.blue9.val,
                    }}
                    animation="quick"
                  >
                    <Plus size={16} color="white" marginRight="$2" />
                    Add Note
                  </Button>
                </YStack>
              </Card.Header>
            </Card>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
};
