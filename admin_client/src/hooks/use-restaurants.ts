import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant.service';
import type { CreateRestaurantDto, UpdateRestaurantDto } from '@/types/restaurant';

export const RESTAURANT_KEYS = {
  all: ['restaurants'] as const,
  detail: (id: string) => ['restaurants', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useRestaurants() {
  return useQuery({
    queryKey: RESTAURANT_KEYS.all,
    queryFn: () => restaurantService.getAll(),
  });
}

// ─── Get By ID ────────────────────────────────────────────────────────────────

export function useRestaurant(id: string) {
  return useQuery({
    queryKey: RESTAURANT_KEYS.detail(id),
    queryFn: () => restaurantService.getById(id),
    enabled: Boolean(id),
  });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export function useCreateRestaurant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateRestaurantDto) => restaurantService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RESTAURANT_KEYS.all });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateRestaurant(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateRestaurantDto) => restaurantService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RESTAURANT_KEYS.all });
      qc.invalidateQueries({ queryKey: RESTAURANT_KEYS.detail(id) });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteRestaurant() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => restaurantService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: RESTAURANT_KEYS.all });
    },
  });
}

// ─── Upload Images ────────────────────────────────────────────────────────────

export function useUploadRestaurantImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      restaurantService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: RESTAURANT_KEYS.all });
      qc.invalidateQueries({ queryKey: RESTAURANT_KEYS.detail(variables.id) });
    },
  });
}
