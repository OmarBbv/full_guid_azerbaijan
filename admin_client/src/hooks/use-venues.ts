import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { venueService } from '@/services/venue.service';
import type { CreateVenueDto, UpdateVenueDto, QueryVenueDto, VenueStatus } from '@/types/venue';

export const VENUE_KEYS = {
  all: (query?: QueryVenueDto) => ['venues', query] as const,
  detail: (id: number) => ['venues', 'detail', id] as const,
  slug: (slug: string) => ['venues', 'slug', slug] as const,
};

export function useVenues(query?: QueryVenueDto) {
  return useQuery({
    queryKey: VENUE_KEYS.all(query),
    queryFn: () => venueService.getAll(query),
  });
}

export function useVenue(id: number) {
  return useQuery({
    queryKey: VENUE_KEYS.detail(id),
    queryFn: () => venueService.getById(id),
    enabled: !!id,
  });
}

export function useVenueAdmin(id: number) {
  return useQuery({
    queryKey: VENUE_KEYS.detail(id),
    queryFn: () => venueService.getByIdAdmin(id),
    enabled: !!id,
  });
}

export function useCreateVenue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateVenueDto) => venueService.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['venues'] });
    },
  });
}

export function useUpdateVenue(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateVenueDto) => venueService.update(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['venues'] });
      qc.invalidateQueries({ queryKey: VENUE_KEYS.detail(id) });
    },
  });
}

export function useChangeVenueStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number, status: VenueStatus }) =>
      venueService.changeStatus(id, status),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['venues'] });
      qc.invalidateQueries({ queryKey: VENUE_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteVenue() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => venueService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['venues'] });
    },
  });
}
