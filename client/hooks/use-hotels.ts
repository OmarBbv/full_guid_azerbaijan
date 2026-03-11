import { useQuery } from '@tanstack/react-query';
import { hotelService } from '@/services/api/hotel.service';

export const HOTEL_KEYS = {
  all: ['hotels'] as const,
  list: (params: any) => ['hotels', 'list', params] as const,
  detail: (id: string) => ['hotels', 'detail', id] as const,
  slug: (slug: string) => ['hotels', 'slug', slug] as const,
};

export function useHotels(params: any = {}) {
  return useQuery({
    queryKey: HOTEL_KEYS.list(params),
    queryFn: () => hotelService.getHotels(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useHotelById(id: string) {
  return useQuery({
    queryKey: HOTEL_KEYS.detail(id),
    queryFn: () => hotelService.getHotelById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useHotelBySlug(slug: string) {
  return useQuery({
    queryKey: HOTEL_KEYS.slug(slug),
    queryFn: () => hotelService.getHotelBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
