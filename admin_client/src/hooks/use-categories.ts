import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoryService } from '@/services/category.service';
import type { CreateCategoryDto, UpdateCategoryDto } from '@/types/category';

export const CATEGORY_KEYS = {
  all: ['categories'] as const,
  list: (language?: string) => ['categories', 'list', language] as const,
  detail: (id: number) => ['categories', id] as const,
};

export function useCategories(language?: string) {
  return useQuery({
    queryKey: CATEGORY_KEYS.list(language),
    queryFn: () => categoryService.getAll(language),
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: CATEGORY_KEYS.detail(id),
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCategoryDto) => categoryService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
}

export function useUpdateCategory(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateCategoryDto) => categoryService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
      qc.invalidateQueries({ queryKey: CATEGORY_KEYS.detail(id) });
    },
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => categoryService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CATEGORY_KEYS.all });
    },
  });
}
