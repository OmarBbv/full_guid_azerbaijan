import { useQuery } from '@tanstack/react-query';
import { placeService } from '@/services/api/place.service';

export const PLACE_KEYS = {
  all: ['places'] as const,
  list: (params: any) => ['places', 'list', params] as const,
  hero: (locale?: string) => ['places', 'hero', locale] as const,
  type: (type: string, locale?: string) => ['places', 'type', type, locale] as const,
  detail: (id: string, locale?: string) => ['places', 'detail', id, locale] as const,
};

export function usePlaces(params: any) {
  return useQuery({
    queryKey: PLACE_KEYS.list(params),
    queryFn: () => placeService.getPlaces(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useHeroPlaces(locale?: string) {
  return useQuery({
    queryKey: PLACE_KEYS.hero(locale),
    queryFn: () => placeService.getHeroPlaces(locale),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function usePlacesByType(type: string, locale?: string) {
  return useQuery({
    queryKey: PLACE_KEYS.type(type, locale),
    queryFn: () => placeService.getPlacesByType(type, locale),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePlaceById(id: string, locale?: string) {
  return useQuery({
    queryKey: PLACE_KEYS.detail(id, locale),
    queryFn: () => placeService.getPlaceById(id, locale),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}
