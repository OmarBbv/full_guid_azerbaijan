import { apiClient } from '@/lib/api-client';

export interface Region {
  id: string;
  slug: string;
  name: string;
  language: string;
  description: string | null;
  image_url: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  google_maps_url: string | null;
  region: string | null;
  highlights: string[] | null;
  attractions: Array<{ name: string; type: string }> | null;
}

export interface IRegionService {
  getRegionBySlug(slug: string, language?: string): Promise<Region>;
  getRegionById(id: string, language?: string): Promise<Region>;
}

class RegionService implements IRegionService {
  private readonly endpoint = '/regions';

  async getRegions(): Promise<Region[]> {
    try {
      const response = await apiClient.get<Region[]>(this.endpoint);
      return response.data;
    } catch (error) {
      console.error('[RegionService.getRegions]', error);
      throw error;
    }
  }

  async getRegionBySlug(slug: string, language?: string): Promise<Region> {
    try {
      const response = await apiClient.get<Region>(`${this.endpoint}/${slug}`, {
        params: { language },
      });
      return response.data;
    } catch (error) {
      console.error('[RegionService.getRegionBySlug]', error);
      throw error;
    }
  }

  async getRegionById(id: string, language?: string): Promise<Region> {
    try {
      const response = await apiClient.get<Region>(`${this.endpoint}/id/${id}`, {
        params: { language },
      });
      return response.data;
    } catch (error) {
      console.error('[RegionService.getRegionById]', error);
      throw error;
    }
  }
}

export const regionService = new RegionService();
