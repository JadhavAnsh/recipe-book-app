import { YStack, H2, Text, Theme, XStack, Switch } from 'tamagui';
import { useCallback, useState } from 'react';
import { useColorScheme } from 'react-native';

export default function HomeScreen() {
  const systemScheme = useColorScheme();
  const [themeName, setThemeName] = useState<'light' | 'dark'>(systemScheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = useCallback(() => {
    setThemeName((t) => (t === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <Theme name={themeName}>
      <YStack f={1} jc="center" ai="center" p="$6" bg="$background">
        <XStack position="absolute" t={0} r={0} p="$4" ai="center" gap="$3">
          <Text color="$color">{themeName === 'dark' ? 'Dark' : 'Light'}</Text>
          <Switch size="$3" checked={themeName === 'dark'} onCheckedChange={toggleTheme} />
        </XStack>

        <H2 ta="center" col="$color" mb="$6">
          Welcome to Recipe Book
        </H2>

        <Text ta="center" col="$color" fontSize="$5">
          Your personal recipe collection
        </Text>

        <Text ta="center" col="$color" fontSize="$4" mt="$4" opacity={0.7}>
          Authentication will be added later
        </Text>
      </YStack>
    </Theme>
  );
}
