import { apiClient } from '@/lib/api-client';

export interface City {
  id: string;
  name: string;
  slug: string;
  language: string;
  description: string | null;
  image_url: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  latitude: number | null;
  longitude: number | null;
  region: string | null;
  country_code: string | null;
  highlights: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
}

class CityService {
  private readonly endpoint = '/cities';

  async getCities(params?: { language?: string; active?: boolean; featured?: boolean }): Promise<City[]> {
    try {
      const { data } = await apiClient.get<City[]>(this.endpoint, { params });
      return data;
    } catch (error) {
      console.error('[CityService.getCities]', error);
      throw error;
    }
  }

  async getCityBySlug(slug: string, language?: string): Promise<City> {
    try {
      const { data } = await apiClient.get<City>(`${this.endpoint}/slug/${slug}`, {
        params: { language }
      });
      return data;
    } catch (error) {
      console.error('[CityService.getCityBySlug]', error);
      throw error;
    }
  }
}

export const cityService = new CityService();
