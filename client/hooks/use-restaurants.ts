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
    queryFn: async () => {
      const data: any = await restaurantService.getRestaurantById(id);
      if (data && data.place) {
        const { place, ...restaurantFields } = data;
        return { ...place, ...restaurantFields };
      }
      return data;
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useRestaurantBySlug(slug: string) {
  return useQuery({
    queryKey: RESTAURANT_KEYS.slug(slug),
    queryFn: async () => {
      const data: any = await restaurantService.getRestaurantBySlug(slug);
      if (data && data.place) {
        const { place, ...restaurantFields } = data;
        return { ...place, ...restaurantFields };
      }
      return data;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
