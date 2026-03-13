import { useQuery } from '@tanstack/react-query';
import { searchService } from '@/services/api/search.service';

export interface UseSearchParams {
  q?: string;
  city?: string;
  type?: string;
  language?: string;
  limit?: number;
  enabled?: boolean;
}

export function useSearch(params: UseSearchParams) {
  const { enabled = true, ...searchParams } = params;
  const hasQuery = Boolean(searchParams.q || searchParams.city || searchParams.type);

  return useQuery({
    queryKey: ['search', searchParams],
    queryFn: () => searchService.search(searchParams),
    enabled: enabled && hasQuery,
    staleTime: 1000 * 30, // 30s
  });
}
