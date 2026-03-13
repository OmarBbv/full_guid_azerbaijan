import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';
import { venueService } from './venue.service';

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
        validateStatus: (status) => status < 500, // Prevent Axios Error on 404
      });

      if (response.status === 404) {
        const venueResponse = await apiClient.get(`/venues/${id}`, {
          validateStatus: (status) => status < 500,
        });

        if (venueResponse.status === 200 && venueResponse.data) {
          const venue: any = venueResponse.data;
          return {
            ...venue,
            id: venue.slug || venue.id.toString(),
            title: venue.name,
            short_description: venue.description || '',
            subtitle: venue.category?.name || '',
            type: (venue.category?.slug || 'other').toUpperCase(),
            average_rating: venue.rating || 0,
            review_count: venue.reviewCount || 0,
            thumbnail: venue.thumbnail,
            isPlaceEntity: false
          } as unknown as Place;
        }

        throw new Error('Place or Venue not found');
      }

      if (response.status !== 200) {
        throw new Error(`API error: ${response.status}`);
      }

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
