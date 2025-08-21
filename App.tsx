import React from 'react';

import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { TamaguiProvider } from 'tamagui';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

import config from './tamagui.config';
import { RootNavigator } from './src/navigation/RootNavigator';
import { ThemeProvider } from './src/context/ThemeContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TamaguiProvider config={config}>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}
