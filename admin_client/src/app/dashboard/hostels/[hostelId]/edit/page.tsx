import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { HostelEditForm } from '@/components/dashboard/hostel/hostel-edit-form';

export const metadata = { title: `Hosteli Yenilə | Dashboard | ${config.site.name}` } satisfies Metadata;

interface PageProps {
  params: Promise<{ hostelId: string }>;
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const { hostelId } = await params;
  return (
    <Stack spacing={4}>
      <HostelEditForm hostelId={hostelId} />
    </Stack>
  );
}
