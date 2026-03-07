import type { Restaurant, CreateRestaurantDto, UpdateRestaurantDto } from '@/types/restaurant';
import { apiClient } from '@/lib/api-client';

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IRestaurantService {
  getAll(): Promise<Restaurant[]>;
  getById(id: string): Promise<Restaurant>;
  create(dto: CreateRestaurantDto): Promise<Restaurant>;
  update(id: string, dto: UpdateRestaurantDto): Promise<Restaurant>;
  remove(id: string): Promise<void>;
  uploadImages(id: string, formData: FormData): Promise<Restaurant>;
}

// ─── Implementation ───────────────────────────────────────────────────────────

class RestaurantService implements IRestaurantService {
  private readonly endpoint = '/restaurants';

  async getAll(): Promise<Restaurant[]> {
    try {
      const { data } = await apiClient.get<Restaurant[]>(this.endpoint);
      return data;
    } catch (error) {
      console.error('[RestaurantService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Restaurant> {
    try {
      const { data } = await apiClient.get<Restaurant>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error('[RestaurantService.getById]', error);
      throw error;
    }
  }

  async create(dto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const { data } = await apiClient.post<Restaurant>(this.endpoint, dto);
      return data;
    } catch (error) {
      console.error('[RestaurantService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateRestaurantDto): Promise<Restaurant> {
    try {
      const { data } = await apiClient.patch<Restaurant>(`${this.endpoint}/${id}`, dto);
      return data;
    } catch (error) {
      console.error('[RestaurantService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[RestaurantService.remove]', error);
      throw error;
    }
  }

  async uploadImages(id: string, formData: FormData): Promise<Restaurant> {
    try {
      const { data } = await apiClient.post<Restaurant>(`${this.endpoint}/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('[RestaurantService.uploadImages]', error);
      throw error;
    }
  }
}

export const restaurantService = new RestaurantService();
