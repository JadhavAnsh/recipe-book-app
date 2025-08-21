import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createNote, deleteNoteById, fetchNotesByRecipe, updateNoteById, CreateNoteInput, UpdateNoteInput, NoteDto } from '../services/api/notes';

const queryKeys = {
  notesByRecipe: (recipeId: string) => ['notes', 'by-recipe', recipeId] as const,
};

export function useNotesByRecipe(recipeId: string) {
  return useQuery({
    queryKey: queryKeys.notesByRecipe(recipeId),
    queryFn: () => fetchNotesByRecipe(recipeId),
    enabled: !!recipeId,
  });
}

export function useCreateNote(recipeId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (text: string) => createNote({ recipeId, text } as CreateNoteInput),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notesByRecipe(recipeId) });
    },
  });
}

export function useUpdateNote(recipeId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) => updateNoteById(id, { text } as UpdateNoteInput),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notesByRecipe(recipeId) });
    },
  });
}

export function useDeleteNote(recipeId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNoteById(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.notesByRecipe(recipeId) });
    },
  });
}

export type { NoteDto };


