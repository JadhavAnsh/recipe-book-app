import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/home/HomeScreen';
import { CategoriesScreen } from '../screens/categories/CategoriesScreen';
import { FavoritesScreen } from '../screens/favorites/FavoritesScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { useTheme } from 'tamagui';
import { Home, Grid3x3, Heart, User } from '@tamagui/lucide-icons';

export type TabParamList = {
  Home: undefined;
  Categories: undefined;
  Favorites: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Home size={size} color={focused ? theme.blue10.val : color} />;
          } else if (route.name === 'Categories') {
            return <Grid3x3 size={size} color={focused ? theme.blue10.val : color} />;
          } else if (route.name === 'Favorites') {
            return <Heart size={size} color={focused ? theme.blue10.val : color} />;
          } else if (route.name === 'Profile') {
            return <User size={size} color={focused ? theme.blue10.val : color} />;
          }
          return null;
        },
        tabBarActiveTintColor: theme.blue10.val,
        tabBarInactiveTintColor: theme.color.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Categories',
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
