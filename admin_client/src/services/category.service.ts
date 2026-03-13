import { apiClient } from '@/lib/api-client';
import type { Category, CreateCategoryDto, UpdateCategoryDto } from '@/types/category';

class CategoryService {
  private readonly endpoint = '/categories';

  async getAll(language?: string): Promise<Category[]> {
    const { data } = await apiClient.get<Category[]>(this.endpoint, {
      params: language ? { language } : {},
    });
    return data;
  }

  async getById(id: number): Promise<Category> {
    const { data } = await apiClient.get<Category>(`${this.endpoint}/${id}`);
    return data;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const { data } = await apiClient.post<Category>(this.endpoint, dto);
    return data;
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<Category> {
    const { data } = await apiClient.patch<Category>(`${this.endpoint}/${id}`, dto);
    return data;
  }

  async remove(id: number): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }
}

export const categoryService = new CategoryService();
