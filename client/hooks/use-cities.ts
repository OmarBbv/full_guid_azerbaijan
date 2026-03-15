import { useQuery } from '@tanstack/react-query';
import { cityService } from '@/services/api/city.service';

export const CITY_KEYS = {
  all: ['cities'] as const,
  list: (params?: any) => ['cities', 'list', params] as const,
  detail: (slug: string, lang?: string) => ['cities', 'detail', slug, lang] as const,
};

export function useCities(params?: { language?: string; active?: boolean; featured?: boolean }) {
  return useQuery({
    queryKey: CITY_KEYS.list(params),
    queryFn: () => cityService.getCities(params),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCityBySlug(slug: string, language?: string) {
  return useQuery({
    queryKey: CITY_KEYS.detail(slug, language),
    queryFn: () => cityService.getCityBySlug(slug, language),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}
