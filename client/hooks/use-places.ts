import { useQuery } from '@tanstack/react-query';
import { placeService } from '@/services/api/place.service';

export const PLACE_KEYS = {
  all: ['places'] as const,
  hero: ['places', 'hero'] as const,
  type: (type: string) => ['places', 'type', type] as const,
  detail: (id: string) => ['places', 'detail', id] as const,
};

export function useHeroPlaces() {
  return useQuery({
    queryKey: PLACE_KEYS.hero,
    queryFn: () => placeService.getHeroPlaces(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePlacesByType(type: string) {
  return useQuery({
    queryKey: PLACE_KEYS.type(type),
    queryFn: () => placeService.getPlacesByType(type),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlaceById(id: string) {
  return useQuery({
    queryKey: PLACE_KEYS.detail(id),
    queryFn: () => placeService.getPlaceById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
