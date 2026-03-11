import { apiClient } from '@/lib/api-client';

export type AdPosition =
  | 'hero_alti'
  | 'orta_banner'
  | 'kateqoriya_ust'
  | 'mekan_sidebar';

export interface Ad {
  id: string;
  title: string;
  image_url: string;
  redirect_url?: string;
  is_active: boolean;
  position: AdPosition;
}

class AdService {
  private readonly endpoint = '/ads';

  async getByPosition(position: AdPosition): Promise<Ad[]> {
    try {
      const { data } = await apiClient.get<{ status: string; data: Ad[] }>(
        this.endpoint,
        { params: { position, activeOnly: 'true' } }
      );
      console.log(data);
      return data?.data ?? [];
    } catch (error) {
      console.error('[AdService.getByPosition]', error);
      return [];
    }
  }
}

export const adService = new AdService();
