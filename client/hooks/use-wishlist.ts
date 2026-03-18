import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '@/services/api/wishlist.service';
import { useUser } from '@/hooks/use-user';

export const WISHLIST_KEYS = {
  all: ['wishlist'] as const,
  status: (id: string, type: string) => [...WISHLIST_KEYS.all, 'status', id, type] as const,
};

export function useWishlist() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const useStatus = (targetId: string, targetType: string) => {
    return useQuery({
      queryKey: WISHLIST_KEYS.status(targetId, targetType),
      queryFn: () => wishlistService.getStatus(targetId, targetType),
      enabled: !!user,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useUserWishlist = () => {
    return useQuery({
      queryKey: WISHLIST_KEYS.all,
      queryFn: () => wishlistService.getWishlist(),
      enabled: !!user,
    });
  };

  const toggleMutation = useMutation({
    mutationFn: async ({ targetId, targetType, isFavorite }: { targetId: string, targetType: string, isFavorite: boolean }) => {
      if (!user) throw new Error('Unauthorized');
      if (isFavorite) {
        return wishlistService.removeFromWishlist(targetId, targetType);
      } else {
        return wishlistService.addToWishlist(targetId, targetType);
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.status(variables.targetId, variables.targetType) });
      queryClient.invalidateQueries({ queryKey: WISHLIST_KEYS.all });
    },
  });

  return {
    useStatus,
    useUserWishlist,
    toggleMutation,
  };
}
