'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import Stack from '@mui/material/Stack';
import { LandmarkEditForm } from '@/components/dashboard/landmark/landmark-edit-form';

export default function Page(): React.JSX.Element {
  const { id } = useParams() as { id: string };

  return (
    <Stack spacing={3}>
      <LandmarkEditForm id={id} />
    </Stack>
  );
}
