import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hotelService } from '@/services/hotel.service';
import type { CreateHotelDto, UpdateHotelDto } from '@/types/hotel';

export const HOTEL_KEYS = {
  all: ['hotels'] as const,
  detail: (id: string) => ['hotels', id] as const,
};

// ─── Get All ──────────────────────────────────────────────────────────────────

export function useHotels() {
  return useQuery({
    queryKey: HOTEL_KEYS.all,
    queryFn: () => hotelService.getAll(),
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
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.all });
    },
  });
}

// ─── Update ───────────────────────────────────────────────────────────────────

export function useUpdateHotel(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateHotelDto) => hotelService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.all });
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
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.all });
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
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.all });
      qc.invalidateQueries({ queryKey: HOTEL_KEYS.detail(variables.id) });
    },
  });
}

