import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adService } from '@/services/ad.service';
import type { CreateAdDto, UpdateAdDto, AdPosition } from '@/types/ad';

export const AD_BASE_KEY = ['ads'];

export const AD_KEYS = {
  all: (position?: AdPosition, activeOnly?: boolean) => ['ads', position ?? 'all', activeOnly ? 'active' : 'all'] as const,
  detail: (id: string) => ['ads', 'detail', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useAds(position?: AdPosition, activeOnly?: boolean) {
  return useQuery({
    queryKey: AD_KEYS.all(position, activeOnly),
    queryFn: () => adService.getAll(position, activeOnly),
  });
}

// ─── Get By ID ────────────────────────────────────────────────────────────────

export function useAd(id: string) {
  return useQuery({
    queryKey: AD_KEYS.detail(id),
    queryFn: () => adService.getById(id),
    enabled: Boolean(id),
  });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export function useCreateAd() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateAdDto) => adService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AD_BASE_KEY });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateAd(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateAdDto) => adService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AD_BASE_KEY });
      qc.invalidateQueries({ queryKey: AD_KEYS.detail(id) });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteAd() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: AD_BASE_KEY });
    },
  });
}

// ─── Upload Image ─────────────────────────────────────────────────────────────

export function useUploadAdImage() {
  return useMutation({
    mutationFn: (file: File) => adService.uploadImage(file),
  });
}
