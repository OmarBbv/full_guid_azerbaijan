import { useQuery } from '@tanstack/react-query';
import { aboutPageService } from '@/services/api/about-page.service';

export function useAboutPages(params?: { language?: string; active?: boolean }) {
  return useQuery({
    queryKey: ['about-pages', params],
    queryFn: () => aboutPageService.getAll(params),
  });
}

export function useAboutPageBySlug(slug: string, language?: string) {
  return useQuery({
    queryKey: ['about-page', slug, language],
    queryFn: () => aboutPageService.getBySlug(slug, language),
    enabled: !!slug,
  });
}
