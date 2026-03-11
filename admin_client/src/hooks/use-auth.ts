import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface AdminLoginDto {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: string;
  };
}

async function adminLoginFn(dto: AdminLoginDto): Promise<AdminLoginResponse> {
  const { data } = await apiClient.post<AdminLoginResponse>('/auth/admin/login', dto);
  return data;
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: adminLoginFn,
    onSuccess: ({ access_token }) => {
      // Store JWT for all subsequent API requests
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('custom-auth-token', access_token);
      }
    },
  });
}
