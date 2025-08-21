import { buildApiUrl } from '../../config/api';

export interface NoteDto {
  id: string;
  recipeId: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoteInput {
  recipeId: string;
  text: string;
}

export interface UpdateNoteInput {
  text?: string;
}

async function handleJsonResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchNotesByRecipe(recipeId: string): Promise<NoteDto[]> {
  const url = buildApiUrl(`/notes/by-recipe/${encodeURIComponent(recipeId)}`);
  const res = await fetch(url, { method: 'GET' });
  return handleJsonResponse<NoteDto[]>(res);
}

export async function createNote(input: CreateNoteInput): Promise<NoteDto> {
  const url = buildApiUrl('/notes');
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handleJsonResponse<NoteDto>(res);
}

export async function updateNoteById(id: string, input: UpdateNoteInput): Promise<NoteDto> {
  const url = buildApiUrl(`/notes/${encodeURIComponent(id)}`);
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return handleJsonResponse<NoteDto>(res);
}

export async function deleteNoteById(id: string): Promise<NoteDto> {
  const url = buildApiUrl(`/notes/${encodeURIComponent(id)}`);
  const res = await fetch(url, { method: 'DELETE' });
  return handleJsonResponse<NoteDto>(res);
}


