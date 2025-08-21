import React from 'react';
import { YStack, Text, Button, XStack } from 'tamagui';
import { useTheme } from 'tamagui';

interface EmptyStateProps {
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  icon?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionText,
  onAction,
  icon = '📝',
}) => {
  const theme = useTheme();

  return (
    <YStack
      flex={1}
      justifyContent="center"
      alignItems="center"
      padding="$6"
      space="$4"
      backgroundColor={theme.background.val}
    >
      <Text fontSize="$12" color={theme.color.val}>
        {icon}
      </Text>
      
      <YStack alignItems="center" space="$2">
        <Text
          fontSize="$8"
          fontWeight="bold"
          textAlign="center"
          color={theme.color.val}
        >
          {title}
        </Text>
        
        <Text
          fontSize="$4"
          textAlign="center"
          color={theme.color.val}
          opacity={0.7}
          maxWidth={280}
        >
          {message}
        </Text>
      </YStack>

      {actionText && onAction && (
        <Button
          onPress={onAction}
          backgroundColor={theme.blue10.val}
          color="white"
          borderRadius="$4"
          paddingHorizontal="$4"
          paddingVertical="$2"
          pressStyle={{
            scale: 0.95,
            backgroundColor: theme.blue9.val,
          }}
          animation="quick"
        >
          {actionText}
        </Button>
      )}
    </YStack>
  );
};
