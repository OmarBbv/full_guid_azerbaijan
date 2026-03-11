import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/services/api/restaurant.service';

export const RESTAURANT_KEYS = {
  all: ['restaurants'] as const,
  list: (params: any) => ['restaurants', 'list', params] as const,
  detail: (id: string) => ['restaurants', 'detail', id] as const,
  slug: (slug: string) => ['restaurants', 'slug', slug] as const,
};

export function useRestaurants(params: any = {}) {
  return useQuery({
    queryKey: RESTAURANT_KEYS.list(params),
    queryFn: () => restaurantService.getRestaurants(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useRestaurantById(id: string) {
  return useQuery({
    queryKey: RESTAURANT_KEYS.detail(id),
    queryFn: () => restaurantService.getRestaurantById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRestaurantBySlug(slug: string) {
  return useQuery({
    queryKey: RESTAURANT_KEYS.slug(slug),
    queryFn: () => restaurantService.getRestaurantBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
