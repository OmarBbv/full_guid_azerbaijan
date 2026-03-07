import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { HostelEditForm } from '@/components/dashboard/hostel/hostel-edit-form';

export const metadata = { title: `Hosteli Yenilə | Dashboard | ${config.site.name}` } satisfies Metadata;

interface PageProps {
  params: {
    hostelId: string;
  };
}

export default function Page({ params }: PageProps): React.JSX.Element {
  return (
    <Stack spacing={4}>
      <HostelEditForm hostelId={params.hostelId} />
    </Stack>
  );
}
