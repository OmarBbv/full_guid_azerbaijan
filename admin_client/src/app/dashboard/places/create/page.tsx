import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { PlaceCreateForm } from '@/components/dashboard/place/place-create-form';

export const metadata = { title: `Yeni Məkan Əlavə Et | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <PlaceCreateForm />
    </Stack>
  );
}
