import { apiClient } from '@/lib/api-client';
import type { BlogPost } from '@/types/blog';

export interface BlogQueryParams {
  language?: string;
  category?: string;
  search?: string;
  featured?: boolean;
  published?: boolean;
}

class BlogService {
  private readonly endpoint = '/blog';

  async getPosts(params: BlogQueryParams = {}): Promise<BlogPost[]> {
    const response = await apiClient.get<BlogPost[]>(this.endpoint, {
      params: {
        ...params,
        featured: params.featured ? 'true' : undefined,
        published: params.published ? 'true' : undefined,
      },
    });
    return response.data;
  }

  async getPostBySlug(
    slug: string,
    language?: string,
  ): Promise<BlogPost> {
    const response = await apiClient.get<BlogPost>(
      `${this.endpoint}/slug/${slug}`,
      {
        params: language ? { language } : {},
      },
    );
    return response.data;
  }

  async getPostById(id: string): Promise<BlogPost> {
    const response = await apiClient.get<BlogPost>(`${this.endpoint}/${id}`);
    return response.data;
  }
}

export const blogService = new BlogService();

