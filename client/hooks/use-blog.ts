import { useQuery } from '@tanstack/react-query';
import { blogService, type BlogQueryParams } from '@/services/api/blog.service';
import type { BlogPost } from '@/types/blog';

export const BLOG_KEYS = {
  all: ['blog'] as const,
  list: (params: BlogQueryParams) =>
    ['blog', 'list', params] as const,
  detail: (slug: string, language?: string) =>
    ['blog', 'detail', slug, language] as const,
};

export function useBlogPosts(params: BlogQueryParams) {
  return useQuery({
    queryKey: BLOG_KEYS.list(params),
    queryFn: () => blogService.getPosts(params),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogPost(slug: string, language?: string) {
  return useQuery<BlogPost>({
    queryKey: BLOG_KEYS.detail(slug, language),
    queryFn: () => blogService.getPostBySlug(slug, language),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
}

