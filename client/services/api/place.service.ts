import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';

export interface IPlaceService {
  getHeroPlaces(locale?: string): Promise<Place[]>;
  getPlaceById(id: string, locale?: string): Promise<Place>;
  getPlacesByType(type: string, locale?: string): Promise<Place[]>;
}

class PlaceService implements IPlaceService {
  private readonly endpoint = '/places';

  async getHeroPlaces(locale?: string): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, {
        params: {
          show_in_hero: true,
          ...(locale ? { language: locale } : {}),
        },
      });
      return response.data;
    } catch (error) {
      console.error('[PlaceService.getHeroPlaces]', error);
      throw error;
    }
  }

  async getPlaceById(id: string, locale?: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/${id}`, {
        params: locale ? { language: locale } : {},
      });
      return response.data;
    } catch (error) {
      console.error('[PlaceService.getPlaceById]', error);
      throw error;
    }
  }

  async getPlacesByType(type: string, locale?: string): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, {
        params: {
          type: type.toUpperCase(),
          ...(locale ? { language: locale } : {}),
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
