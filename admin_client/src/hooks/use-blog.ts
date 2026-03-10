import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { blogService } from '@/services/blog.service';
import type { BlogQueryParams } from '@/types/blog';

export const BLOG_BASE_KEY = ['blog'];

export const BLOG_KEYS = {
  all: (params?: BlogQueryParams) => ['blog', 'all', params] as const,
  detail: (id: string) => ['blog', 'detail', id] as const,
};

export function useBlogPosts(params?: BlogQueryParams) {
  return useQuery({
    queryKey: BLOG_KEYS.all(params),
    queryFn: () => blogService.getPosts(params),
  });
}

export function useBlogPost(id: string) {
  return useQuery({
    queryKey: BLOG_KEYS.detail(id),
    queryFn: () => blogService.getPostById(id),
    enabled: Boolean(id),
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => blogService.deletePost(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BLOG_BASE_KEY });
    },
  });
}

export function useCreateBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: any) => blogService.createPost(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BLOG_BASE_KEY });
    },
  });
}

export function useUpdateBlogPost(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dto: any) => blogService.updatePost(id, dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: BLOG_BASE_KEY });
      qc.invalidateQueries({ queryKey: BLOG_KEYS.detail(id) });
    },
  });
}

export function useUploadBlogCover() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      blogService.uploadCoverImage(id, formData),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: BLOG_KEYS.detail(variables.id) });
    },
  });
}
