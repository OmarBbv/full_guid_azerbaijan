import type { Place, CreatePlaceDto, UpdatePlaceDto } from '@/types/restaurant';
import { apiClient } from '@/lib/api-client';

// ─── Interface ────────────────────────────────────────────────────────────────

export interface IPlaceService {
  getAll(): Promise<Place[]>;
  getById(id: string): Promise<Place>;
  create(dto: CreatePlaceDto): Promise<Place>;
  update(id: string, dto: UpdatePlaceDto): Promise<Place>;
  remove(id: string): Promise<void>;
  uploadImages(id: string, formData: FormData): Promise<Place>;
}

// ─── Implementation ───────────────────────────────────────────────────────────

class PlaceService implements IPlaceService {
  private readonly endpoint = '/places';

  async getAll(): Promise<Place[]> {
    try {
      const { data } = await apiClient.get<Place[]>(`${this.endpoint}?exclude_types=HOTEL,HOSTEL,RESTAURANT`);
      return data;
    } catch (error) {
      console.error('[PlaceService.getAll]', error);
      throw error;
    }
  }

  async getById(id: string): Promise<Place> {
    try {
      const { data } = await apiClient.get<Place>(`${this.endpoint}/${id}`);
      return data;
    } catch (error) {
      console.error('[PlaceService.getById]', error);
      throw error;
    }
  }

  async create(dto: CreatePlaceDto): Promise<Place> {
    try {
      const { data } = await apiClient.post<Place>(this.endpoint, dto);
      return data;
    } catch (error) {
      console.error('[PlaceService.create]', error);
      throw error;
    }
  }

  async update(id: string, dto: UpdatePlaceDto): Promise<Place> {
    try {
      const { data } = await apiClient.patch<Place>(`${this.endpoint}/${id}`, dto);
      return data;
    } catch (error) {
      console.error('[PlaceService.update]', error);
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.endpoint}/${id}`);
    } catch (error) {
      console.error('[PlaceService.remove]', error);
      throw error;
    }
  }

  async uploadImages(id: string, formData: FormData): Promise<Place> {
    try {
      const { data } = await apiClient.post<Place>(`${this.endpoint}/${id}/images`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (error) {
      console.error('[PlaceService.uploadImages]', error);
      throw error;
    }
  }
}

export const placeService = new PlaceService();
