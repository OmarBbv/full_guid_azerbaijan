import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/api/category.service';

export function useCategories(language?: string) {
  return useQuery({
    queryKey: ['categories', language],
    queryFn: () => categoryService.getAll(language),
    staleTime: 5 * 60 * 1000,
  });
}
