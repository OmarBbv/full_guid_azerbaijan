import type { City, CreateCityDto, UpdateCityDto } from '@/types/city';
import { apiClient } from '@/lib/api-client';

// ─── Interface ────────────────────────────────────────────────────────────────

export interface ICityService {
  getAll(params?: { language?: string; active?: boolean; featured?: boolean }): Promise<City[]>;
  getById(id: string): Promise<City>;
  create(dto: CreateCityDto): Promise<City>;
  update(id: string, dto: UpdateCityDto): Promise<City>;
  remove(id: string): Promise<void>;
  uploadImages(id: string, formData: FormData): Promise<City>;
}

// ─── Implementation ───────────────────────────────────────────────────────────

class CityService implements ICityService {
  private readonly endpoint = '/cities';

  async getAll(params?: { language?: string; active?: boolean; featured?: boolean }): Promise<City[]> {
    try {
      const { data } = await apiClient.get<City[]>(this.endpoint, {
        params: params
          ? {
              ...(params.language !== undefined && { language: params.language }),
              ...(params.active !== undefined && { active: params.active }),
              ...(params.featured !== undefined && { featured: params.featured }),
            }
          : undefined,
      });
      return data;
    } catch (error) {
      console.error('[CityService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<City> {
    try {
      const { data } = await apiClient.get<City>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error('[CityService.getById]', error);
      throw error;
    }
  }

  async create(dto: CreateCityDto): Promise<City> {
    try {
      const { data } = await apiClient.post<City>(this.endpoint, dto);
      return data;
    } catch (error) {
      console.error('[CityService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateCityDto): Promise<City> {
    try {
      const { data } = await apiClient.patch<City>(`${this.endpoint}/${id}`, dto);
      return data;
    } catch (error) {
      console.error('[CityService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[CityService.remove]', error);
      throw error;
    }
  }

  async uploadImages(id: string, formData: FormData): Promise<City> {
    try {
      const { data } = await apiClient.post<City>(`${this.endpoint}/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('[CityService.uploadImages]', error);
      throw error;
    }
  }
}

export const cityService = new CityService();
