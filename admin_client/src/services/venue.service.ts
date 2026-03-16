import { apiClient } from '@/lib/api-client';
import type { Venue, CreateVenueDto, UpdateVenueDto, QueryVenueDto, VenueStatus } from '@/types/venue';

class VenueService {
  private readonly endpoint = '/venues';

  async getAll(query?: QueryVenueDto): Promise<{ data: Venue[]; meta: any }> {
    const { data } = await apiClient.get(this.endpoint, { params: query });
    return data;
  }

  async getById(id: number): Promise<Venue> {
    const { data } = await apiClient.get<Venue>(`${this.endpoint}/${id}`);
    return data;
  }

  async getByIdAdmin(id: number): Promise<Venue> {
    const { data } = await apiClient.get<Venue>(`${this.endpoint}/admin-detail/${id}`);
    return data;
  }

  async getBySlug(slug: string): Promise<Venue> {
    const { data } = await apiClient.get<Venue>(`${this.endpoint}/${slug}`);
    return data;
  }

  async create(dto: CreateVenueDto): Promise<Venue> {
    const { data } = await apiClient.post<Venue>(this.endpoint, dto);
    return data;
  }

  async update(id: number, dto: UpdateVenueDto): Promise<Venue> {
    const { data } = await apiClient.put<Venue>(`${this.endpoint}/${id}`, dto);
    return data;
  }

  async changeStatus(id: number, status: VenueStatus): Promise<Venue> {
    const { data } = await apiClient.patch<Venue>(`${this.endpoint}/${id}/status`, { status });
    return data;
  }

  async remove(id: number): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }
}

export const venueService = new VenueService();
