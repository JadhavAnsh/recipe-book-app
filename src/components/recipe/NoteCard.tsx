import React from 'react';
import { Card, YStack, XStack, Text, Button } from 'tamagui';
import { Star, Clock, Trash2 } from '@tamagui/lucide-icons';
import { useTheme } from 'tamagui';

type NoteView = {
  id: string;
  content: string;
  timestamp?: Date | string;
  isImportant?: boolean;
};

interface NoteCardProps {
  note: NoteView;
  onDelete?: (noteId: string) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onDelete,
}) => {
  const theme = useTheme();

  const formatDate = (date?: Date | string) => {
    if (!date) return '';
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  };

  return (
    <Card
      elevate
      size="$3"
      bordered
      borderRadius="$4"
      backgroundColor={theme.background.val}
      borderColor={note.isImportant ? theme.yellow8.val : theme.borderColor.val}
      borderWidth={note.isImportant ? 2 : 1}
      pressStyle={{
        scale: 0.98,
        backgroundColor: theme.backgroundHover.val,
      }}
      animation="quick"
    >
      <Card.Header padded>
        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="flex-start">
            <XStack alignItems="center" space="$2" flex={1}>
              {note.isImportant && (
                <Star
                  size={16}
                  fill={theme.yellow10.val}
                  color={theme.yellow10.val}
                />
              )}
              
              <XStack alignItems="center" space="$1" flex={1}>
                <Clock size={14} color={theme.color.val} opacity={0.6} />
                <Text
                  fontSize="$2"
                  color={theme.color.val}
                  opacity={0.6}
                >
                  {formatDate(note.timestamp)}
                </Text>
              </XStack>
            </XStack>

            {onDelete && (
              <Button
                size="$2"
                circular
                backgroundColor="transparent"
                borderColor={theme.borderColor.val}
                onPress={() => onDelete(note.id)}
                pressStyle={{
                  scale: 0.9,
                  backgroundColor: theme.red2.val,
                }}
                animation="quick"
              >
                <Trash2 size={14} color={theme.red10.val} />
              </Button>
            )}
          </XStack>

          <Text
            fontSize="$4"
            color={theme.color.val}
            lineHeight={20}
          >
            {note.content}
          </Text>
        </YStack>
      </Card.Header>
    </Card>
  );
};
