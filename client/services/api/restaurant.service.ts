import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';

export interface RestaurantQueryParams {
  language?: string;
  limit?: number;
}

export interface IRestaurantService {
  getRestaurants(params?: RestaurantQueryParams): Promise<Place[]>;
  getRestaurantById(id: string): Promise<Place>;
  getRestaurantBySlug(slug: string): Promise<Place>;
}

class RestaurantService implements IRestaurantService {
  private readonly endpoint = '/restaurants';

  async getRestaurants(params: RestaurantQueryParams = {}): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('[RestaurantService.getRestaurants]', error);
      throw error;
    }
  }

  async getRestaurantById(id: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('[RestaurantService.getRestaurantById]', error);
      throw error;
    }
  }

  async getRestaurantBySlug(slug: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('[RestaurantService.getRestaurantBySlug]', error);
      throw error;
    }
  }
}

export const restaurantService = new RestaurantService();
