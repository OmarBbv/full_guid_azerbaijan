import { apiClient } from '@/lib/api-client';
import type { BlogPost, BlogQueryParams } from '@/types/blog';

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

  async getPostById(id: string): Promise<BlogPost> {
    const response = await apiClient.get<BlogPost>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async createPost(dto: any): Promise<BlogPost> {
    const response = await apiClient.post<BlogPost>(this.endpoint, dto);
    return response.data;
  }

  async updatePost(id: string, dto: any): Promise<BlogPost> {
    const response = await apiClient.patch<BlogPost>(`${this.endpoint}/${id}`, dto);
    return response.data;
  }

  async deletePost(id: string): Promise<void> {
    await apiClient.delete(`${this.endpoint}/${id}`);
  }

  async uploadCoverImage(id: string, formData: FormData): Promise<void> {
    await apiClient.post(`${this.endpoint}/${id}/cover`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export const blogService = new BlogService();
