import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { RECIPES_QUERY } from '../services/api/recipes';

type Recipe = {
  id: string;
  categoryId?: string | null;
};

export function useRecipeCounts() {
  const { data, loading, error } = useQuery(RECIPES_QUERY, {
    fetchPolicy: 'cache-first',
  });

  const allRecipes = (data?.recipes ?? []) as Recipe[];

  const countsByCategoryId = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of allRecipes) {
      const key = (r.categoryId ?? '').toString();
      if (!key) continue;
      counts[key] = (counts[key] ?? 0) + 1;
    }
    return counts;
  }, [allRecipes]);

  const totalRecipes = allRecipes.length;

  return { countsByCategoryId, totalRecipes, loading, error };
}


