'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Stack, Typography, CircularProgress, Box } from '@mui/material';
import { AboutPageForm } from '@/components/dashboard/about/about-page-form';
import { aboutPageService } from '@/services/about-page.service';
import type { AboutPage } from '@/types/about-page';
import { toast } from 'sonner';

export default function Page(): React.JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = React.useState<AboutPage | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchPage = async () => {
      try {
        const data = await aboutPageService.getById(id);
        setPage(data);
      } catch (error) {
        toast.error('Səhifə məlumatları yüklənərkən xəta baş verdi');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPage();
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!page) {
    return <Typography>Səhifə tapılmadı</Typography>;
  }

  return (
    <Stack spacing={3}>
      <AboutPageForm initialData={page} />
    </Stack>
  );
}
