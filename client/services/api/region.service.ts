import { apiClient } from '@/lib/api-client';

export interface Region {
  id: string;
  slug: string;
  name: string;
  azName: string;
  description: string;
  azDescription: string;
  imageUrl: string;
  highlights: string[];
  attractions: Array<{ name: string; type: string }>;
  coordinates?: { lat: number; lng: number };
}

export interface IRegionService {
  getRegions(): Promise<Region[]>;
  getRegionBySlug(slug: string): Promise<Region>;
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

  async getRegionBySlug(slug: string): Promise<Region> {
    try {
      const response = await apiClient.get<Region>(`${this.endpoint}/${slug}`);
      return response.data;
    } catch (error) {
      console.error('[RegionService.getRegionBySlug]', error);
      throw error;
    }
  }
}

export const regionService = new RegionService();
