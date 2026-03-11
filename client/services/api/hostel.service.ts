import { apiClient } from '@/lib/api-client';
import { Place } from '@/types/place';

export interface HostelQueryParams {
  language?: string;
  limit?: number;
}

export interface IHostelService {
  getHostels(params?: HostelQueryParams): Promise<Place[]>;
  getHostelById(id: string): Promise<Place>;
  getHostelBySlug(slug: string): Promise<Place>;
}

class HostelService implements IHostelService {
  private readonly endpoint = '/hostels';

  async getHostels(params: HostelQueryParams = {}): Promise<Place[]> {
    try {
      const response = await apiClient.get<Place[]>(this.endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('[HostelService.getHostels]', error);
      throw error;
    }
  }

  async getHostelById(id: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error('[HostelService.getHostelById]', error);
      throw error;
    }
  }

  async getHostelBySlug(slug: string): Promise<Place> {
    try {
      const response = await apiClient.get<Place>(`${this.endpoint}/slug/${slug}`);
      return response.data;
    } catch (error) {
      console.error('[HostelService.getHostelBySlug]', error);
      throw error;
    }
  }
}

export const hostelService = new HostelService();
