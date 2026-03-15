import { apiClient } from '@/lib/api-client';
import type { AboutPage, CreateAboutPageDto, UpdateAboutPageDto } from '@/types/about-page';

class AboutPageService {
  private readonly endpoint = '/about-pages';

  async getAll(params?: { language?: string; active?: boolean }) {
    const { data } = await apiClient.get<AboutPage[]>(this.endpoint, { params });
    return data;
  }

  async getById(id: string) {
    const { data } = await apiClient.get<AboutPage>(`${this.endpoint}/${id}`);
    return data;
  }

  async create(dto: CreateAboutPageDto) {
    const { data } = await apiClient.post<AboutPage>(this.endpoint, dto);
    return data;
  }

  async update(id: string, dto: UpdateAboutPageDto) {
    const { data } = await apiClient.patch<AboutPage>(`${this.endpoint}/${id}`, dto);
    return data;
  }

  async remove(id: string) {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }

  async uploadImage(id: string, formData: FormData) {
    const { data } = await apiClient.post<AboutPage>(`${this.endpoint}/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  }
}

export const aboutPageService = new AboutPageService();
