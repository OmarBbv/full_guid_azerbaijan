import type { Hotel, CreateHotelDto, UpdateHotelDto } from '@/types/hotel';
import { apiClient } from '@/lib/api-client';

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IHotelService {
  getAll(language?: string): Promise<Hotel[]>;
  getById(id: string): Promise<Hotel>;
  create(dto: CreateHotelDto): Promise<Hotel>;
  update(id: string, dto: UpdateHotelDto): Promise<Hotel>;
  remove(id: string): Promise<void>;
  uploadImages(id: string, formData: FormData): Promise<Hotel>;
}

// ─── Implementation ───────────────────────────────────────────────────────────

class HotelService implements IHotelService {
  private readonly endpoint = '/hotels';

  async getAll(language?: string): Promise<Hotel[]> {
    try {
      const { data } = await apiClient.get<Hotel[]>(this.endpoint, {
        params: language ? { language } : undefined,
      });
      return data;
    } catch (error) {
      console.error('[HotelService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Hotel> {
    try {
      const { data } = await apiClient.get<Hotel>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error('[HotelService.getById]', error);
      throw error;
    }
  }

  async create(dto: CreateHotelDto): Promise<Hotel> {
    try {
      const { data } = await apiClient.post<Hotel>(this.endpoint, dto);
      return data;
    } catch (error) {
      console.error('[HotelService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdateHotelDto): Promise<Hotel> {
    try {
      const { data } = await apiClient.patch<Hotel>(`${this.endpoint}/${id}`, dto);
      return data;
    } catch (error) {
      console.error('[HotelService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[HotelService.remove]', error);
      throw error;
    }
  }

  async uploadImages(id: string, formData: FormData): Promise<Hotel> {
    try {
      const { data } = await apiClient.post<Hotel>(`${this.endpoint}/${id}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      console.error('[HotelService.uploadImages]', error);
      throw error;
    }
  }
}

export const hotelService = new HotelService();
