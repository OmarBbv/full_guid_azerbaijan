import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/api/auth.service';

export function useUser() {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => authService.getProfile(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => authService.updateProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });
}
