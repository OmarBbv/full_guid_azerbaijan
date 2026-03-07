import type { Landmark, CreateLandmarkDto, UpdateLandmarkDto } from '@/types/landmark';
import { apiClient } from '@/lib/api-client';

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ILandmarkService {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any>;
  create(dto: any): Promise<any>;
  update(id: string, dto: any): Promise<any>;
  remove(id: string): Promise<void>;
  uploadImages(id: string, formData: FormData): Promise<any>;
}

// ─── Implementation ───────────────────────────────────────────────────────────

class LandmarkService implements ILandmarkService {
  private readonly endpoint = '/places';

  async getAll(language?: string): Promise<any[]> {
    try {
      const { data } = await apiClient.get<any[]>(this.endpoint, {
        params: { type: 'LANDMARK', ...(language ? { language } : {}) }
      });
      return data;
    } catch (error) {
      console.error('[LandmarkService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<any> {
    try {
      const { data } = await apiClient.get<any>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error('[LandmarkService.getById]', error);
      throw error;
    }
  }

  async create(dto: any): Promise<any> {
    try {
      const { data } = await apiClient.post<any>(this.endpoint, { ...dto, type: 'LANDMARK' });
      return data;
    } catch (error) {
      console.error('[LandmarkService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: any): Promise<any> {
    try {
      const { data } = await apiClient.patch<any>(`${this.endpoint}/${id}`, dto);
      return data;
    } catch (error) {
      console.error('[LandmarkService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[LandmarkService.remove]', error);
      throw error;
    }
  }

  async uploadImages(id: string, formData: FormData): Promise<any> {
    try {
      const { data } = await apiClient.post<any>(`${this.endpoint}/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('[LandmarkService.uploadImages]', error);
      throw error;
    }
  }
}

export const landmarkService = new LandmarkService();
