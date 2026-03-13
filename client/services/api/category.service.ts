import { apiClient } from '@/lib/api-client';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  language?: string;
}

class CategoryService {
  async getAll(language?: string): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>('/categories', {
      params: language ? { language } : {},
    });
    return data;
  }
}

export const categoryService = new CategoryService();
