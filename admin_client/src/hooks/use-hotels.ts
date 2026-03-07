import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelService } from '@/services/hotel.service';
import type { CreateHotelDto, UpdateHotelDto } from '@/types/hotel';

// Use ['hotels'] as the base prefix for all invalidations
export const HOTEL_BASE_KEY = ['hotels'];

export const HOTEL_KEYS = {
  all: (language?: string) => ['hotels', language ?? 'all'] as const,
  detail: (id: string) => ['hotels', 'detail', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useHotels(language?: string) {
  return useQuery({
    queryKey: HOTEL_KEYS.all(language),
    queryFn: () => hotelService.getAll(language),
  });
}

// ─── Get By ID ────────────────────────────────────────────────────────────────

export function useHotel(id: string) {
  return useQuery({
    queryKey: HOTEL_KEYS.detail(id),
    queryFn: () => hotelService.getById(id),
    enabled: Boolean(id),
  });
}

// ─── Create ───────────────────────────────────────────────────────────────────

export function useCreateHotel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateHotelDto) => hotelService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOTEL_BASE_KEY });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateHotel(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateHotelDto) => hotelService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOTEL_BASE_KEY });
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.detail(id) });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteHotel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => hotelService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOTEL_BASE_KEY });
    },
  });
}

// ─── Upload Images ────────────────────────────────────────────────────────────

export function useUploadHotelImages() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      hotelService.uploadImages(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: HOTEL_BASE_KEY });
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.detail(variables.id) });
    },
  });
}
