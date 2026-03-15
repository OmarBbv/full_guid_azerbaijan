import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cityService } from '@/services/city.service';
import type { CreateCityDto, UpdateCityDto } from '@/types/city';

export const CITY_BASE_KEY = ['cities'];

export const CITY_KEYS = {
  all: (params?: { language?: string; active?: boolean; featured?: boolean }) =>
    ['cities', params ?? 'all'] as const,
  detail: (id: string) => ['cities', 'detail', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useCities(params?: { language?: string; active?: boolean; featured?: boolean }) {
  return useQuery({
    queryKey: CITY_KEYS.all(params),
    queryFn: () => cityService.getAll(params),
  });
}

// ─── Get By ID ────────────────────────────────────────────────────────────────

export function useCity(id: string) {
  return useQuery({
    queryKey: CITY_KEYS.detail(id),
    queryFn: () => cityService.getById(id),
    enabled: Boolean(id),
  });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export function useCreateCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCityDto) => cityService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CITY_BASE_KEY });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateCity(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateCityDto) => cityService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CITY_BASE_KEY });
      qc.invalidateQueries({ queryKey: CITY_KEYS.detail(id) });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteCity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => cityService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CITY_BASE_KEY });
    },
  });
}

// ─── Upload Images ────────────────────────────────────────────────────────────

export function useUploadCityImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      cityService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: CITY_BASE_KEY });
      qc.invalidateQueries({ queryKey: CITY_KEYS.detail(variables.id) });
    },
  });
}
