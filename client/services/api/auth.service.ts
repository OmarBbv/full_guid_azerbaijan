import { apiClient } from '@/lib/api-client';

export const authService = {
  async requestOtp(email: string, password: string) {
    const response = await apiClient.post('/auth/login/request-otp', { email, password });
    return response.data;
  },

  async verifyOtp(email: string, otp: string) {
    const response = await apiClient.post('/auth/login/verify-otp', { email, otp });
    return response.data;
  },

  async register(data: any) {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  async getProfile() {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  async updateProfile(id: string, data: any) {
    const response = await apiClient.patch(`/users/${id}`, data);
    return response.data;
  },
};
