import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placeService } from '@/services/place.service';
import type { CreatePlaceDto, UpdatePlaceDto } from '@/types/restaurant';

export const PLACE_KEYS = {
  all: ['places'] as const,
  detail: (id: string) => ['places', id] as const,
};

export function usePlaces() {
  return useQuery({
    queryKey: PLACE_KEYS.all,
    queryFn: () => placeService.getAll(),
  });
}

export function usePlace(id: string) {
  return useQuery({
    queryKey: PLACE_KEYS.detail(id),
    queryFn: () => placeService.getById(id),
    enabled: Boolean(id),
  });
}

export function useCreatePlace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreatePlaceDto) => placeService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PLACE_KEYS.all });
    },
  });
}

export function useUpdatePlace(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdatePlaceDto) => placeService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PLACE_KEYS.all });
      qc.invalidateQueries({ queryKey: PLACE_KEYS.detail(id) });
    },
  });
}

export function useDeletePlace() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => placeService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: PLACE_KEYS.all });
    },
  });
}

export function useUploadPlaceImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      placeService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: PLACE_KEYS.all });
      qc.invalidateQueries({ queryKey: PLACE_KEYS.detail(variables.id) });
    },
  });
}
