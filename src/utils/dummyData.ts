export interface Recipe {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  image: string;
  ingredients: string[];
  steps: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  recipeCount: number;
}

export interface Note {
  id: string;
  recipeId: string;
  content: string;
  timestamp: Date;
  isImportant: boolean;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Breakfast',
    icon: '🍳',
    color: '#FF6B6B',
    recipeCount: 2,
  },
  {
    id: '2',
    name: 'Lunch',
    icon: '🥪',
    color: '#4ECDC4',
    recipeCount: 1,
  },
  {
    id: '3',
    name: 'Dinner',
    icon: '🍽️',
    color: '#45B7D1',
    recipeCount: 2,
  },
  {
    id: '4',
    name: 'Dessert',
    icon: '🍰',
    color: '#96CEB4',
    recipeCount: 1,
  },
  {
    id: '5',
    name: 'Snacks',
    icon: '🥨',
    color: '#FFEAA7',
    recipeCount: 0,
  },
];

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Fluffy Pancakes',
    category: 'Breakfast',
    categoryId: '1',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
    ingredients: [
      '2 cups all-purpose flour',
      '2 tablespoons sugar',
      '2 teaspoons baking powder',
      '1/2 teaspoon salt',
      '2 eggs',
      '1 3/4 cups milk',
      '1/4 cup melted butter',
    ],
    steps: [
      'In a large bowl, whisk together flour, sugar, baking powder, and salt.',
      'In another bowl, beat eggs, then add milk and melted butter.',
      'Pour wet ingredients into dry ingredients and stir until just combined.',
      'Heat a griddle or large skillet over medium heat.',
      'Pour 1/4 cup batter for each pancake and cook until bubbles form.',
      'Flip and cook until golden brown on both sides.',
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Avocado Toast',
    category: 'Breakfast',
    categoryId: '1',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop',
    ingredients: [
      '2 slices whole grain bread',
      '1 ripe avocado',
      '1/2 lemon',
      'Salt and pepper to taste',
      'Red pepper flakes (optional)',
      'Microgreens for garnish',
    ],
    steps: [
      'Toast the bread until golden and crispy.',
      'Mash the avocado in a bowl with lemon juice, salt, and pepper.',
      'Spread the mashed avocado evenly on both slices of toast.',
      'Sprinkle with red pepper flakes if desired.',
      'Garnish with microgreens and serve immediately.',
    ],
    prepTime: 5,
    cookTime: 3,
    servings: 1,
    difficulty: 'Easy',
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Caesar Salad',
    category: 'Lunch',
    categoryId: '2',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
    ingredients: [
      '1 head romaine lettuce, chopped',
      '1/2 cup croutons',
      '1/4 cup grated Parmesan cheese',
      '2 tablespoons lemon juice',
      '1 tablespoon Dijon mustard',
      '1 clove garlic, minced',
      '1/4 cup olive oil',
      'Salt and pepper to taste',
    ],
    steps: [
      'Wash and chop the romaine lettuce.',
      'Make the dressing by whisking together lemon juice, mustard, garlic, and olive oil.',
      'Season with salt and pepper.',
      'Toss the lettuce with the dressing.',
      'Top with croutons and Parmesan cheese.',
      'Serve immediately.',
    ],
    prepTime: 15,
    cookTime: 0,
    servings: 2,
    difficulty: 'Easy',
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Grilled Salmon',
    category: 'Dinner',
    categoryId: '3',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '2 tablespoons olive oil',
      '1 lemon, sliced',
      '2 sprigs fresh dill',
      'Salt and pepper to taste',
      '1 tablespoon butter',
    ],
    steps: [
      'Preheat grill to medium-high heat.',
      'Brush salmon with olive oil and season with salt and pepper.',
      'Place salmon skin-side down on the grill.',
      'Add lemon slices and dill sprigs on top.',
      'Grill for 4-5 minutes per side until flaky.',
      'Serve with grilled lemon and fresh dill.',
    ],
    prepTime: 10,
    cookTime: 10,
    servings: 4,
    difficulty: 'Medium',
    isFavorite: false,
  },
  {
    id: '5',
    title: 'Chocolate Cake',
    category: 'Dessert',
    categoryId: '4',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    ingredients: [
      '2 cups all-purpose flour',
      '2 cups sugar',
      '3/4 cup unsweetened cocoa powder',
      '2 teaspoons baking soda',
      '1 teaspoon baking powder',
      '1 teaspoon salt',
      '2 eggs',
      '1 cup milk',
      '1 cup vegetable oil',
      '1 teaspoon vanilla extract',
      '1 cup hot water',
    ],
    steps: [
      'Preheat oven to 350°F (175°C).',
      'Mix dry ingredients in a large bowl.',
      'Add eggs, milk, oil, and vanilla to dry ingredients.',
      'Stir in hot water until well combined.',
      'Pour into greased 9x13 inch pan.',
      'Bake for 30-35 minutes until toothpick comes out clean.',
      'Cool completely before frosting.',
    ],
    prepTime: 20,
    cookTime: 35,
    servings: 12,
    difficulty: 'Medium',
    isFavorite: true,
  },
];

export const notes: Note[] = [
  {
    id: '1',
    recipeId: '1',
    content: 'Add a pinch of cinnamon for extra flavor!',
    timestamp: new Date('2024-01-15T10:30:00'),
    isImportant: true,
  },
  {
    id: '2',
    recipeId: '1',
    content: 'Perfect for Sunday brunch with family.',
    timestamp: new Date('2024-01-20T09:15:00'),
    isImportant: false,
  },
  {
    id: '3',
    recipeId: '3',
    content: 'Try adding grilled chicken for a protein boost.',
    timestamp: new Date('2024-01-18T12:45:00'),
    isImportant: true,
  },
  {
    id: '4',
    recipeId: '5',
    content: 'Double the recipe for a layer cake!',
    timestamp: new Date('2024-01-22T16:20:00'),
    isImportant: false,
  },
];

export const favorites: string[] = ['1', '3', '5'];

export const getRecipesByCategory = (categoryId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.categoryId === categoryId);
};

export const getNotesByRecipe = (recipeId: string): Note[] => {
  return notes.filter(note => note.recipeId === recipeId);
};

export const toggleFavorite = (recipeId: string): void => {
  const recipe = recipes.find(r => r.id === recipeId);
  if (recipe) {
    recipe.isFavorite = !recipe.isFavorite;
  }
};

export const addNote = (recipeId: string, content: string): Note => {
  const newNote: Note = {
    id: Date.now().toString(),
    recipeId,
    content,
    timestamp: new Date(),
    isImportant: false,
  };
  notes.push(newNote);
  return newNote;
};
