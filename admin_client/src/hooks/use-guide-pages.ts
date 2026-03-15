import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { guidePageService } from '@/services/guide-page.service';
import { toast } from 'sonner';

export function useGuidePages(params?: { language?: string; active?: boolean }) {
  return useQuery({
    queryKey: ['guide-pages', params],
    queryFn: () => guidePageService.getAll(params),
  });
}

export function useGuidePage(id: string) {
  return useQuery({
    queryKey: ['guide-pages', id],
    queryFn: () => guidePageService.getOne(id),
    enabled: !!id,
  });
}

export function useDeleteGuidePage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => guidePageService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guide-pages'] });
      toast.success('Səhifə silindi');
    },
    onError: () => {
      toast.error('Silinərkən xəta baş verdi');
    },
  });
}
