import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hostelService } from '@/services/hostel.service';
import type { CreateHostelDto, UpdateHostelDto } from '@/types/hostel';

export const HOSTEL_KEYS = {
  all: ['hostels'] as const,
  detail: (id: string) => ['hostels', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useHostels() {
  return useQuery({
    queryKey: HOSTEL_KEYS.all,
    queryFn: () => hostelService.getAll(),
  });
}

// ─── Get By ID ────────────────────────────────────────────────────────────────

export function useHostel(id: string) {
  return useQuery({
    queryKey: HOSTEL_KEYS.detail(id),
    queryFn: () => hostelService.getById(id),
    enabled: Boolean(id),
  });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export function useCreateHostel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateHostelDto) => hostelService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOSTEL_KEYS.all });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateHostel(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateHostelDto) => hostelService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOSTEL_KEYS.all });
      qc.invalidateQueries({ queryKey: HOSTEL_KEYS.detail(id) });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteHostel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => hostelService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOSTEL_KEYS.all });
    },
  });
}

// ─── Upload Images ────────────────────────────────────────────────────────────

export function useUploadHostelImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      hostelService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: HOSTEL_KEYS.all });
      qc.invalidateQueries({ queryKey: HOSTEL_KEYS.detail(variables.id) });
    },
  });
}

