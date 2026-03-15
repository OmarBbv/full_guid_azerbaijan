import * as React from 'react';
import type { Metadata } from 'next';
import { Stack, Typography } from '@mui/material';

import { config } from '@/config';
import { AboutPageForm } from '@/components/dashboard/about/about-page-form';

export const metadata = { title: `Yeni Səhifə | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <AboutPageForm />
    </Stack>
  );
}
