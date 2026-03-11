import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';

export interface HotelQueryParams {
  language?: string;
  limit?: number;
}

export interface IHotelService {
  getHotels(params?: HotelQueryParams): Promise<Place[]>;
  getHotelById(id: string): Promise<Place>;
  getHotelBySlug(slug: string): Promise<Place>;
}

class HotelService implements IHotelService {
  private readonly endpoint = '/hotels';

  async getHotels(params: HotelQueryParams = {}): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('[HotelService.getHotels]', error);
      throw error;
    }
  }

  async getHotelById(id: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('[HotelService.getHotelById]', error);
      throw error;
    }
  }

  async getHotelBySlug(slug: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('[HotelService.getHotelBySlug]', error);
      throw error;
    }
  }
}

export const hotelService = new HotelService();
