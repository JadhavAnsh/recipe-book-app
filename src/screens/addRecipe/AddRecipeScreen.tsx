import React, { useState } from 'react';
import { ScrollView, Alert, RefreshControl, Platform } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  H1,
  H2,
  Card,
  Separator,
  Select,
} from 'tamagui';
import { Plus, Minus, ArrowLeft, Save, Image as ImageIcon } from '@tamagui/lucide-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'tamagui';
import { categories, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../../utils/dummyData';

type RootStackParamList = {
  Home: undefined;
};

type NavigationProp = {
  navigate: (screen: keyof RootStackParamList) => void;
  goBack: () => void;
};

export const AddRecipeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const route = useRoute();
  const params = (route.params || {}) as { recipeId?: string };
  const recipeId = params.recipeId;
  
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const isEditing = !!recipeId;

  React.useEffect(() => {
    if (!isEditing) return;
    const recipe = getRecipeById(recipeId!);
    if (recipe) {
      setTitle(recipe.title);
      setSelectedCategory(recipe.categoryId);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setPrepTime(String(recipe.prepTime));
      setCookTime(String(recipe.cookTime));
      setServings(String(recipe.servings));
    }
  }, [isEditing, recipeId]);

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, '']);
  };

  const removeStep = (index: number) => {
    if (steps.length > 1) {
      const newSteps = steps.filter((_, i) => i !== index);
      setSteps(newSteps);
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleSave = () => {
    // Validate form
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a recipe title');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }
    if (ingredients.some(ing => !ing.trim())) {
      Alert.alert('Error', 'Please fill in all ingredients');
      return;
    }
    if (steps.some(step => !step.trim())) {
      Alert.alert('Error', 'Please fill in all steps');
      return;
    }

    const payload = {
      title: title.trim(),
      categoryId: selectedCategory,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      ingredients: ingredients.map(i => i.trim()),
      steps: steps.map(s => s.trim()),
      prepTime: parseInt(prepTime || '0', 10) || 0,
      cookTime: parseInt(cookTime || '0', 10) || 0,
      servings: parseInt(servings || '0', 10) || 0,
      difficulty: 'Easy' as const,
    };

    if (isEditing) {
      updateRecipe(recipeId!, payload);
    } else {
      addRecipe(payload);
    }

    Alert.alert(
      'Success!',
      isEditing ? 'Recipe updated successfully!' : 'Recipe added successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  const isValid = title.trim() && selectedCategory &&
    ingredients.every(ing => ing.trim()) &&
    steps.every(step => step.trim());

  const Content = () => (
    <YStack padding="$4" space="$6">
        {/* Header */}
        <XStack alignItems="center" space="$3">
          <Button
            size="$4"
            circular
            backgroundColor="transparent"
            borderColor={theme.borderColor.val}
            onPress={() => navigation.goBack()}
            pressStyle={{
              scale: 0.9,
              backgroundColor: theme.backgroundHover.val,
            }}
            animation="quick"
          >
            <ArrowLeft size={24} color={theme.color.val} />
          </Button>
          
          <H1 fontSize="$4" color={theme.color.val}>{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</H1>
        </XStack>

        {/* Recipe Image Placeholder */}
        <Card
          elevate
          size="$4"
          bordered
          borderRadius="$6"
          backgroundColor={theme.backgroundHover.val}
          borderColor={theme.borderColor.val}
          borderStyle="dashed"
        >
          <Card.Header padded>
            <YStack alignItems="center" space="$3" padding="$6">
              <ImageIcon size={48} color={theme.color.val} opacity={0.5} />
              <Text fontSize="$4" color={theme.color.val} opacity={0.7}>
                Recipe Image
              </Text>
              <Text fontSize="$3" color={theme.color.val} opacity={0.5}>
                Tap to add image (coming soon)
              </Text>
            </YStack>
          </Card.Header>
        </Card>

        {/* Basic Info */}
        <YStack space="$3">
          <H2 fontSize="$6" color={theme.color.val}>Basic Information</H2>
          
          <Input
            placeholder="Recipe Title"
            value={title}
            onChangeText={setTitle}
            backgroundColor={theme.backgroundHover.val}
            borderColor={theme.borderColor.val}
            borderRadius="$4"
            paddingHorizontal="$3"
            paddingVertical="$2"
            fontSize="$4"
            color={theme.color.val}
          />

          {Platform.OS === 'web' ? (
            // Plain HTML select for web to ensure correct rendering and no portals
            // @ts-ignore - using native HTML element on web
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory((e.target as HTMLSelectElement).value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 8,
                backgroundColor: theme.backgroundHover.val,
                border: `1px solid ${theme.borderColor.val}`,
                color: theme.color.val,
              }}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          ) : (
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <Select.Trigger
                backgroundColor={theme.backgroundHover.val}
                borderColor={theme.borderColor.val}
                borderRadius="$4"
                paddingHorizontal="$3"
                paddingVertical="$2"
              >
                <Select.Value placeholder="Select Category" />
              </Select.Trigger>
              <Select.Content>
                <Select.Viewport>
                  {categories.map((cat, index) => (
                    <Select.Item key={cat.id} value={cat.id} index={index}>
                      <Select.ItemText>{cat.name}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select>
          )}

          <XStack space="$3">
            <Input
              flex={1}
              placeholder="Prep Time (min)"
              value={prepTime}
              onChangeText={setPrepTime}
              keyboardType="numeric"
              backgroundColor={theme.backgroundHover.val}
              borderColor={theme.borderColor.val}
              borderRadius="$4"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize="$4"
              color={theme.color.val}
            />
            
            <Input
              flex={1}
              placeholder="Cook Time (min)"
              value={cookTime}
              onChangeText={setCookTime}
              keyboardType="numeric"
              backgroundColor={theme.backgroundHover.val}
              borderColor={theme.borderColor.val}
              borderRadius="$4"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize="$4"
              color={theme.color.val}
            />
          </XStack>

          <XStack space="$3">
            <Input
              flex={1}
              placeholder="Servings"
              value={servings}
              onChangeText={setServings}
              keyboardType="numeric"
              backgroundColor={theme.backgroundHover.val}
              borderColor={theme.borderColor.val}
              borderRadius="$4"
              paddingHorizontal="$3"
              paddingVertical="$2"
              fontSize="$4"
              color={theme.color.val}
            />
          </XStack>
        </YStack>

        <Separator />

        {/* Ingredients */}
        <YStack space="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <H2 fontSize="$6" color={theme.color.val}>Ingredients</H2>
            <Button
              size="$3"
              circular
              backgroundColor={theme.green10.val}
              onPress={addIngredient}
              pressStyle={{
                scale: 0.9,
                backgroundColor: theme.green9.val,
              }}
              animation="quick"
            >
              <Plus size={16} color="white" />
            </Button>
          </XStack>
          
          <YStack space="$2">
            {ingredients.map((ingredient, index) => (
              <XStack key={index} space="$2" alignItems="center">
                <Input
                  flex={1}
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChangeText={(value) => updateIngredient(index, value)}
                  backgroundColor={theme.backgroundHover.val}
                  borderColor={theme.borderColor.val}
                  borderRadius="$4"
                  paddingHorizontal="$3"
                  paddingVertical="$2"
                  fontSize="$4"
                  color={theme.color.val}
                />
                
                {ingredients.length > 1 && (
                  <Button
                    size="$3"
                    circular
                    backgroundColor={theme.red10.val}
                    onPress={() => removeIngredient(index)}
                    pressStyle={{
                      scale: 0.9,
                      backgroundColor: theme.red9.val,
                    }}
                    animation="quick"
                  >
                    <Minus size={16} color="white" />
                  </Button>
                )}
              </XStack>
            ))}
          </YStack>
        </YStack>

        <Separator />

        {/* Steps */}
        <YStack space="$3">
          <XStack justifyContent="space-between" alignItems="center">
            <H2 fontSize="$6" color={theme.color.val}>Instructions</H2>
            <Button
              size="$3"
              circular
              backgroundColor={theme.blue10.val}
              onPress={addStep}
              pressStyle={{
                scale: 0.9,
                backgroundColor: theme.blue9.val,
              }}
              animation="quick"
            >
              <Plus size={16} color="white" />
            </Button>
          </XStack>
          
          <YStack space="$2">
            {steps.map((step, index) => (
              <XStack key={index} space="$2" alignItems="flex-start">
                <Text
                  fontSize="$4"
                  fontWeight="bold"
                  color={theme.blue10.val}
                  minWidth={30}
                  marginTop="$2"
                >
                  {index + 1}
                </Text>
                
                <Input
                  flex={1}
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChangeText={(value) => updateStep(index, value)}
                  backgroundColor={theme.backgroundHover.val}
                  borderColor={theme.borderColor.val}
                  borderRadius="$4"
                  paddingHorizontal="$3"
                  paddingVertical="$2"
                  fontSize="$4"
                  color={theme.color.val}
                  multiline
                  numberOfLines={2}
                />
                
                {steps.length > 1 && (
                  <Button
                    size="$3"
                    circular
                    backgroundColor={theme.red10.val}
                    onPress={() => removeStep(index)}
                    pressStyle={{
                      scale: 0.9,
                      backgroundColor: theme.red9.val,
                    }}
                    animation="quick"
                  >
                    <Minus size={16} color="white" />
                  </Button>
                )}
              </XStack>
            ))}
          </YStack>
        </YStack>

        {/* Save / Delete Buttons */}
        <Button
          size="$5"
          backgroundColor={isValid ? theme.blue10.val : theme.gray8.val}
          color="white"
          borderRadius="$4"
          paddingVertical="$3"
          onPress={handleSave}
          disabled={!isValid}
          pressStyle={{
            scale: isValid ? 0.95 : 1,
            backgroundColor: isValid ? theme.blue9.val : theme.gray8.val,
          }}
          animation="quick"
        >
          <Save size={20} color="white" marginRight="$2" />
          {isEditing ? 'Update Recipe' : 'Save Recipe'}
        </Button>

        {isEditing && (
          <Button
            size="$5"
            backgroundColor={theme.red10.val}
            color="white"
            borderRadius="$4"
            paddingVertical="$3"
            onPress={() => {
              Alert.alert('Delete Recipe', 'Are you sure you want to delete this recipe?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => { deleteRecipe(recipeId!); navigation.navigate('Home'); } },
              ]);
            }}
            pressStyle={{
              scale: 0.95,
              backgroundColor: theme.red9.val,
            }}
            animation="quick"
          >
            Delete Recipe
          </Button>
        )}
      </YStack>
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
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Content />
    </ScrollView>
  );
};
