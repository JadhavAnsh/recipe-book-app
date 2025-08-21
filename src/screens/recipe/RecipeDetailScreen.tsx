import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, Platform } from 'react-native';
import { YStack, XStack, Text, Input, Button, H1, H2, H3, Card, Image, Separator } from 'tamagui';
import { Heart, Clock, Users, Star, Plus, ArrowLeft } from '@tamagui/lucide-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { NoteCard } from '../../components/recipe/NoteCard';
import { EmptyState } from '../../components/common/EmptyState';
import { toggleFavorite } from '../../utils/dummyData';
import { useNotesByRecipe, useCreateNote, useUpdateNote, useDeleteNote, NoteDto } from '../../hooks/useNotes';
import { useQuery } from '@apollo/client';
import { RECIPE_QUERY } from '../../services/api/recipes';

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
  const { data, loading } = useQuery(RECIPE_QUERY, { variables: { id: recipeId } });
  const recipe = data?.recipe ? {
    id: data.recipe.id,
    title: data.recipe.title,
    category: data.recipe.category,
    categoryId: data.recipe.categoryId || '',
    image: data.recipe.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    ingredients: data.recipe.ingredients,
    steps: data.recipe.steps,
    prepTime: data.recipe.prepTime,
    cookTime: data.recipe.cookTime,
    servings: data.recipe.servings,
    difficulty: 'Easy' as const,
    isFavorite: false,
  } : undefined;
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState('');

  const { data: notesData = [], isLoading: notesLoading, refetch } = useNotesByRecipe(recipeId);
  const createNoteMutation = useCreateNote(recipeId);
  const updateNoteMutation = useUpdateNote(recipeId);
  const deleteNoteMutation = useDeleteNote(recipeId);

  useEffect(() => {
    if (!loading && !recipe) {
      Alert.alert('Error', 'Recipe not found');
      navigation.goBack();
    }
  }, [recipe, loading, navigation]);

  if (!recipe) {
    return null;
  }

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await createNoteMutation.mutateAsync(newNote.trim());
      setNewNote('');
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };

  const handleStartEditNote = (noteId: string) => {
    const n = notesData.find((n: NoteDto) => n.id === noteId);
    if (!n) return;
    setEditingNoteId(noteId);
    setEditingNoteContent(n.text);
  };

  const handleSaveEditNote = async () => {
    if (!editingNoteId) return;
    try {
      await updateNoteMutation.mutateAsync({ id: editingNoteId, text: editingNoteContent.trim() });
      setEditingNoteId(null);
      setEditingNoteContent('');
    } catch (e) {
      Alert.alert('Error', (e as Error).message);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteNoteMutation.mutateAsync(noteId);
          } catch (e) {
            Alert.alert('Error', (e as Error).message);
          }
        },
      },
    ]);
  };


  const handleFavoriteToggle = () => {
    toggleFavorite(recipeId);
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
            {recipe.ingredients.map((ingredient: string, index: number) => (
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
            {recipe.steps.map((step: string, index: number) => (
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

          {notesLoading ? (
            <Text color={theme.color.val}>Loading notes...</Text>
          ) : notesData.length === 0 ? (
            <EmptyState
              title="No notes yet"
              message="Add your first note below to remember tips and modifications for this recipe!"
              icon="📝"
            />
          ) : (
            <YStack padding="$3">
              {notesData.map((note: NoteDto) => (
                <YStack key={note.id} space="$2">
                  {editingNoteId === note.id ? (
                    <YStack space="$2">
                      <Input
                        value={editingNoteContent}
                        onChangeText={setEditingNoteContent}
                        multiline
                        numberOfLines={3}
                      />
                      <XStack space="$2">
                        <Button onPress={handleSaveEditNote}>Save</Button>
                        <Button backgroundColor={theme.gray8.val} onPress={() => { setEditingNoteId(null); setEditingNoteContent(''); }}>Cancel</Button>
                      </XStack>
                    </YStack>
                  ) : (
                    <NoteCard note={{ id: note.id, content: note.text, timestamp: note.updatedAt || note.createdAt }} onDelete={handleDeleteNote} />
                  )}
                  {editingNoteId !== note.id && (
                    <XStack>
                      <Button size="$3" onPress={() => handleStartEditNote(note.id)}>Edit</Button>
                    </XStack>
                  )}
                </YStack>
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
    >
      <Content />
    </ScrollView>
  );
};
