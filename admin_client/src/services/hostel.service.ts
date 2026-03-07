import type { Hostel, CreateHostelDto, UpdateHostelDto } from '@/types/hostel';
import { apiClient } from '@/lib/api-client';

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IHostelService {
  getAll(): Promise<Hostel[]>;
  getById(id: string): Promise<Hostel>;
  create(dto: CreateHostelDto): Promise<Hostel>;
  update(id: string, dto: UpdateHostelDto): Promise<Hostel>;
  remove(id: string): Promise<void>;
  uploadImages(id: string, formData: FormData): Promise<Hostel>;
}

// ─── Implementation ───────────────────────────────────────────────────────────

class HostelService implements IHostelService {
  private readonly endpoint = '/hostels';

  async getAll(): Promise<Hostel[]> {
    try {
      const { data } = await apiClient.get<Hostel[]>(this.endpoint);
      return data;
    } catch (error) {
      console.error('[HostelService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Hostel> {
    try {
      const { data } = await apiClient.get<Hostel>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error('[HostelService.getById]', error);
      throw error;
    }
  }

  async create(dto: CreateHostelDto): Promise<Hostel> {
    try {
      const { data } = await apiClient.post<Hostel>(this.endpoint, dto);
      return data;
    } catch (error) {
      console.error('[HostelService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateHostelDto): Promise<Hostel> {
    try {
      const { data } = await apiClient.patch<Hostel>(`${this.endpoint}/${id}`, dto);
      return data;
    } catch (error) {
      console.error('[HostelService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[HostelService.remove]', error);
      throw error;
    }
  }

  async uploadImages(id: string, formData: FormData): Promise<Hostel> {
    try {
      const { data } = await apiClient.post<Hostel>(`${this.endpoint}/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('[HostelService.uploadImages]', error);
      throw error;
    }
  }
}

export const hostelService = new HostelService();
