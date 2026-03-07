import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';

export interface IPlaceService {
  getHeroPlaces(): Promise<Place[]>;
  getPlaceById(id: string): Promise<Place>;
  getPlacesByType(type: string): Promise<Place[]>;
}

class PlaceService implements IPlaceService {
  private readonly endpoint = '/places';

  async getHeroPlaces(): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, {
        params: {
          show_in_hero: true,
        },
      });
      return response.data;
    } catch (error) {
      console.error('[PlaceService.getHeroPlaces]', error);
      throw error;
    }
  }

  async getPlaceById(id: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('[PlaceService.getPlaceById]', error);
      throw error;
    }
  }

  async getPlacesByType(type: string): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, {
        params: {
          type: type.toUpperCase(),
        },
      });
      return response.data;
    } catch (error) {
      console.error('[PlaceService.getPlacesByType]', error);
      throw error;
    }
  }
}

export const placeService = new PlaceService();
