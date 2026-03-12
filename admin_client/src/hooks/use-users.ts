import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';

export const USER_BASE_KEY = ['users'];

export const USER_KEYS = {
  all: () => ['users', 'all'] as const,
  detail: (id: string) => ['users', 'detail', id] as const,
};

export function useUsers() {
  return useQuery({
    queryKey: USER_KEYS.all(),
    queryFn: () => userService.getAll(),
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: USER_KEYS.detail(id),
    queryFn: () => userService.getById(id),
    enabled: Boolean(id),
  });
}
