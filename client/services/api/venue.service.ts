import { apiClient } from "@/lib/api-client";

export interface Venue {
  id: number;
  name: string;
  slug: string;
  description?: string;
  address: string;
  city?: string;
  thumbnail?: string;
  categoryId: number;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

class VenueService {
  private readonly endpoint = '/venues';

  async getAll(params?: any): Promise<{ data: Venue[]; meta: any }> {
    const { data } = await apiClient.get(this.endpoint, { params });
    return data;
  }
}

export const venueService = new VenueService();
