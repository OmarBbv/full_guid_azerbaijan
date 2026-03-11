import { useQuery } from '@tanstack/react-query';
import { regionService } from '@/services/api/region.service';

export const REGION_KEYS = {
  all: ['regions'] as const,
  list: () => ['regions', 'list'] as const,
  detail: (slug: string) => ['regions', 'detail', slug] as const,
};

export function useRegions() {
  return useQuery({
    queryKey: REGION_KEYS.list(),
    queryFn: () => regionService.getRegions(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRegionBySlug(slug: string) {
  return useQuery({
    queryKey: REGION_KEYS.detail(slug),
    queryFn: () => regionService.getRegionBySlug(slug),
    enabled: !!slug,
    staleTime: 10 * 60 * 1000,
  });
}
