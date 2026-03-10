import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';

export interface PlaceQueryParams {
  language?: string;
  type?: string;
  show_in_hero?: boolean;
  is_featured?: boolean;
  exclude_types?: string[];
  limit?: number;
}

export interface IPlaceService {
  getPlaces(params?: PlaceQueryParams): Promise<Place[]>;
  getHeroPlaces(locale?: string): Promise<Place[]>;
  getPlaceById(id: string, locale?: string): Promise<Place>;
  getPlacesByType(type: string, locale?: string): Promise<Place[]>;
}

class PlaceService implements IPlaceService {
  private readonly endpoint = '/places';

  async getPlaces(params: PlaceQueryParams = {}): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, {
        params: {
          ...params,
          exclude_types: params.exclude_types?.join(','),
        },
      });
      return response.data;
    } catch (error) {
      console.error('[PlaceService.getPlaces]', error);
      throw error;
    }
  }

  async getHeroPlaces(locale?: string): Promise<Place[]> {
    return this.getPlaces({ show_in_hero: true, language: locale });
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
    return this.getPlaces({ type: type.toUpperCase(), language: locale });
  }
}

export const placeService = new PlaceService();
