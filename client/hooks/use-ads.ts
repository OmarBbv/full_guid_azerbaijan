import { useQuery } from '@tanstack/react-query';
import { adService, type AdPosition } from '@/services/api/ad.service';

export const AD_KEYS = {
  byPosition: (position: AdPosition) => ['ads', 'position', position] as const,
};

export function useAdsByPosition(position: AdPosition) {
  return useQuery({
    queryKey: AD_KEYS.byPosition(position),
    queryFn: () => adService.getByPosition(position),
    staleTime: 10 * 60 * 1000, // 10 minutes — ads don't change that often
    select: (ads) =>
      ads.length > 0 ? ads[Math.floor(Math.random() * ads.length)] : null,
  });
}
