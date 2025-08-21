# Recipe Book App 🍳

A beautiful and intuitive React Native app for organizing and managing your favorite recipes, built with Expo and Tamagui.

## ✨ Features

- **Recipe Management**: Create, view, and organize recipes with detailed ingredients and instructions
- **Categories**: Organize recipes by categories (Breakfast, Lunch, Dinner, Dessert, Snacks)
- **Notes System**: Add personal notes and tips to each recipe
- **Favorites**: Save your favorite recipes for quick access
- **Search & Filter**: Find recipes quickly with search and category filtering
- **Dark/Light Mode**: Automatic theme switching with manual toggle option
- **Beautiful UI**: Modern design with smooth animations and Tamagui components
- **Deep Linking**: Support for deep links to specific recipes and screens

## 🚀 Tech Stack

- **React Native** with **Expo**
- **Tamagui** for UI components and theming
- **React Navigation** for navigation and deep linking
- **TypeScript** for type safety
- **Lucide Icons** for beautiful icons

## 📱 Screens

### Home Screen
- Recipe feed with search functionality
- Category filters
- Quick add recipe button
- Pull-to-refresh support

### Recipe Detail Screen
- Full recipe information (ingredients, steps, timing)
- Notes section with add/delete functionality
- Favorite toggle
- Beautiful image display

### Add Recipe Screen
- Form for creating new recipes
- Dynamic ingredient and step inputs
- Category selection
- Form validation

### Categories Screen
- Browse all recipe categories
- View recipes by category
- Empty state handling

### Favorites Screen
- All your favorite recipes
- Quick unfavorite functionality
- Pull-to-refresh support

### Profile Screen
- Theme toggle (dark/light mode)
- App statistics
- App information
- Coming soon features

## 🔗 Deep Linking

The app supports deep linking with the following schemes:

- `myapp://recipe/:id` - Opens a specific recipe
- `myapp://add-recipe` - Opens the add recipe screen
- `myapp://category/:id` - Opens a specific category

## 🎨 Design Features

- **Modern UI**: Rounded corners, shadows, and smooth spacing
- **Smooth Animations**: Button press effects, card hover states
- **Responsive Design**: Adapts to different screen sizes
- **Theme Support**: Automatic dark/light mode with manual toggle
- **Empty States**: Friendly messages when no content is available
- **Consistent Spacing**: Uses Tamagui's spacing system throughout

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── common/
│   │   └── EmptyState.tsx
│   └── recipe/
│       ├── RecipeCard.tsx
│       ├── CategoryCard.tsx
│       └── NoteCard.tsx
├── screens/
│   ├── home/
│   │   └── HomeScreen.tsx
│   ├── recipe/
│   │   └── RecipeDetailScreen.tsx
│   ├── addRecipe/
│   │   └── AddRecipeScreen.tsx
│   ├── categories/
│   │   └── CategoriesScreen.tsx
│   ├── favorites/
│   │   └── FavoritesScreen.tsx
│   └── profile/
│       └── ProfileScreen.tsx
├── navigation/
│   ├── RootNavigator.tsx
│   └── TabNavigator.tsx
├── context/
│   └── ThemeContext.tsx
└── utils/
    └── dummyData.ts
```

## 🎯 Key Components

### RecipeCard
Beautiful card component displaying recipe information with favorite toggle.

### CategoryCard
Interactive category cards with recipe counts and icons.

### NoteCard
Note display with timestamp, importance indicator, and delete functionality.

### EmptyState
Reusable component for showing friendly empty states throughout the app.

## 🌟 Highlights

- **Human-like Code**: Clean, readable, and maintainable code structure
- **Reusable Components**: Well-designed components that can be easily extended
- **Type Safety**: Full TypeScript support with proper type definitions
- **Performance**: Optimized rendering and state management
- **Accessibility**: Proper contrast and touch targets
- **Cross-platform**: Works on both iOS and Android

## 🔮 Future Enhancements

- Recipe image upload functionality
- Cloud sync and backup
- Cooking timer integration
- Nutritional information
- Recipe sharing capabilities
- Meal planning features
- Shopping list generation

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React Native, Expo, and Tamagui
