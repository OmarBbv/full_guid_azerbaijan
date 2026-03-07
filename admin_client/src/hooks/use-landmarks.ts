import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { landmarkService } from '@/services/landmark.service';
import type { CreateLandmarkDto, UpdateLandmarkDto } from '@/types/landmark';

export const LANDMARK_KEYS = {
  all: ['landmarks'] as const,
  detail: (id: string) => ['landmarks', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useLandmarks() {
  return useQuery({
    queryKey: LANDMARK_KEYS.all,
    queryFn: () => landmarkService.getAll(),
  });
}

// ─── Get By ID ────────────────────────────────────────────────────────────────

export function useLandmark(id: string) {
  return useQuery({
    queryKey: LANDMARK_KEYS.detail(id),
    queryFn: () => landmarkService.getById(id),
    enabled: Boolean(id),
  });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export function useCreateLandmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateLandmarkDto) => landmarkService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: LANDMARK_KEYS.all });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateLandmark(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateLandmarkDto) => landmarkService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: LANDMARK_KEYS.all });
      qc.invalidateQueries({ queryKey: LANDMARK_KEYS.detail(id) });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteLandmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => landmarkService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: LANDMARK_KEYS.all });
    },
  });
}

// ─── Upload Images ────────────────────────────────────────────────────────────

export function useUploadLandmarkImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      landmarkService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: LANDMARK_KEYS.all });
      qc.invalidateQueries({ queryKey: LANDMARK_KEYS.detail(variables.id) });
    },
  });
}

