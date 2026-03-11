import { useQuery } from '@tanstack/react-query';
import { hostelService } from '@/services/api/hostel.service';

export const HOSTEL_KEYS = {
  all: ['hostels'] as const,
  list: (params: any) => ['hostels', 'list', params] as const,
  detail: (id: string) => ['hostels', 'detail', id] as const,
  slug: (slug: string) => ['hostels', 'slug', slug] as const,
};

export function useHostels(params: any = {}) {
  return useQuery({
    queryKey: HOSTEL_KEYS.list(params),
    queryFn: () => hostelService.getHostels(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useHostelById(id: string) {
  return useQuery({
    queryKey: HOSTEL_KEYS.detail(id),
    queryFn: () => hostelService.getHostelById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useHostelBySlug(slug: string) {
  return useQuery({
    queryKey: HOSTEL_KEYS.slug(slug),
    queryFn: () => hostelService.getHostelBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}
