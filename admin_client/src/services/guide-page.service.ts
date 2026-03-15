import axios from 'axios';
import type { GuidePage } from '@/types/guide-page';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';

export const guidePageService = {
  async getAll(params?: { language?: string; active?: boolean }) {
    const response = await axios.get<GuidePage[]>(`${API_URL}/guide-pages`, { params });
    return response.data;
  },

  async getOne(id: string) {
    const response = await axios.get<GuidePage>(`${API_URL}/guide-pages/${id}`);
    return response.data;
  },

  async create(data: Partial<GuidePage>) {
    const response = await axios.post<GuidePage>(`${API_URL}/guide-pages`, data);
    return response.data;
  },

  async update(id: string, data: Partial<GuidePage>) {
    const response = await axios.patch<GuidePage>(`${API_URL}/guide-pages/${id}`, data);
    return response.data;
  },

  async remove(id: string) {
    await axios.delete(`${API_URL}/guide-pages/${id}`);
  },

  async uploadImage(id: string, formData: FormData) {
    const response = await axios.post<GuidePage>(`${API_URL}/guide-pages/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
