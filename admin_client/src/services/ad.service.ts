import { apiClient } from '@/lib/api-client';
import type { Ad, CreateAdDto, UpdateAdDto, AdPosition } from '@/types/ad';

export interface IAdService {
  getAll(position?: AdPosition, activeOnly?: boolean): Promise<Ad[]>;
  getById(id: string): Promise<Ad>;
  create(dto: CreateAdDto): Promise<Ad>;
  update(id: string, dto: UpdateAdDto): Promise<Ad>;
  remove(id: string): Promise<void>;
  uploadImage(file: File): Promise<{ url: string }>;
}

class AdService implements IAdService {
  private readonly endpoint = '/ads';

  async getAll(position?: AdPosition, activeOnly?: boolean): Promise<Ad[]> {
    try {
      const { data } = await apiClient.get<{ data: Ad[] }>(this.endpoint, {
        params: { position, activeOnly: activeOnly ? 'true' : undefined }
      });
      return data.data;
    } catch (error) {
      console.error('[AdService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Ad> {
    try {
      const { data } = await apiClient.get<{ data: Ad }>(`${this.endpoint}/${id}`);
      return data.data;
    } catch (error) {
      console.error('[AdService.getById]', error);
      throw error;
    }
  }

  async create(dto: CreateAdDto): Promise<Ad> {
    try {
      const { data } = await apiClient.post<{ data: Ad }>(this.endpoint, dto);
      return data.data;
    } catch (error) {
      console.error('[AdService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateAdDto): Promise<Ad> {
    try {
      const { data } = await apiClient.patch<{ data: Ad }>(`${this.endpoint}/${id}`, dto);
      return data.data;
    } catch (error) {
      console.error('[AdService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[AdService.remove]', error);
      throw error;
    }
  }

  async uploadImage(file: File): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      // Using a generic upload endpoint if available, otherwise we might need to add one
      const { data } = await apiClient.post<{ data: { url: string } }>('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data.data;
    } catch (error) {
      console.error('[AdService.uploadImage]', error);
      throw error;
    }
  }
}

export const adService = new AdService();
