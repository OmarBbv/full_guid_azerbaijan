'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useGuidePage } from '@/hooks/use-guide-pages';
import { GuidePageForm } from '@/components/dashboard/guide/guide-page-form';

export default function Page(): React.JSX.Element {
  const { id } = useParams();
  const { data: page, isLoading } = useGuidePage(id as string);

  if (isLoading) {
    return (
      <Stack alignItems="center" justifyContent="center" sx={{ py: 10 }}>
        <CircularProgress />
      </Stack>
    );
  }

  if (!page) {
    return <Typography color="error">Səhifə tapılmadı</Typography>;
  }

  return (
    <Stack spacing={3}>
      <GuidePageForm initialData={page} />
    </Stack>
  );
}
