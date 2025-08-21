import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, RefreshControl, Platform } from 'react-native';
import { YStack, XStack, Text, Input, Button, H1, H2, H3, Card, Image, Separator } from 'tamagui';
import { Heart, Clock, Users, Star, Plus, ArrowLeft } from '@tamagui/lucide-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { NoteCard } from '../../components/recipe/NoteCard';
import { EmptyState } from '../../components/common/EmptyState';
import { recipes, getNotesByRecipe, addNote, toggleFavorite } from '../../utils/dummyData';

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
  const params = (route.params || {}) as Partial<RouteParams> & { id?: string };
  const recipeId = params.recipeId || params.id || '1';

  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(getNotesByRecipe(recipeId));
  const [recipe, setRecipe] = useState(recipes.find((r) => r.id === recipeId));
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
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          const updatedNotes = notes.filter((note) => note.id !== noteId);
          setNotes(updatedNotes);
        },
      },
    ]);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(recipeId);
    setRecipe({ ...recipe, isFavorite: !recipe.isFavorite });
  };

  // Difficulty has been removed from backend; no color mapping needed

  const Content = () => (
    <>
      {/* Header Image Container */}
      <YStack position="relative">
        <Image source={{ uri: recipe.image }} width="100%" height={300} resizeMode="cover" />

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
          zIndex={10}>
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
          zIndex={10}>
          <Heart
            size={24}
            fill={recipe.isFavorite ? theme.red10.val : 'transparent'}
            color={recipe.isFavorite ? theme.red10.val : 'white'}
          />
        </Button>
      </YStack>

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
                borderColor={theme.borderColor.val}>
                <Card.Header padded>
                  <XStack space="$3" alignItems="flex-start">
                    <Text fontSize="$4" fontWeight="bold" color={theme.blue10.val} minWidth={30}>
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
                <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} />
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
            borderColor={theme.borderColor.val}>
            <Card.Header padded>
              <YStack padding="$3">
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
                  animation="quick">
                  <Plus size={16} color="white" marginRight="$2" />
                  Add Note
                </Button>
              </YStack>
            </Card.Header>
          </Card>
        </YStack>
      </YStack>
    </>
  );

  if (Platform.OS === 'web') {
    return (
      <YStack height="100vh" overflow="scroll" backgroundColor={theme.background.val}>
        <Content />
      </YStack>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.background.val }}
      contentContainerStyle={{ paddingBottom: 80, flexGrow: 1 }}
      scrollEnabled
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
      <Content />
    </ScrollView>
  );
};
