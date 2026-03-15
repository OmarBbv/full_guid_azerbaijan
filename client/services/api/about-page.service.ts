import { apiClient } from '@/lib/api-client';
import type { AboutPage } from '@/types/about-page';

class AboutPageService {
  private readonly endpoint = '/about-pages';

  async getAll(params?: { language?: string; active?: boolean }): Promise<AboutPage[]> {
    try {
      const response = await apiClient.get<AboutPage[]>(this.endpoint, { 
        params: {
          ...params,
          active: params?.active ?? true
        } 
      });
      return response.data;
    } catch (error) {
      console.error('[AboutPageService.getAll]', error);
      throw error;
    }
  }

  async getBySlug(slug: string, language = 'az'): Promise<AboutPage> {
    try {
      const response = await apiClient.get<AboutPage>(`${this.endpoint}/slug/${slug}`, {
        params: { language }
      });
      return response.data;
    } catch (error) {
      console.error('[AboutPageService.getBySlug]', error);
      throw error;
    }
  }
}

export const aboutPageService = new AboutPageService();
