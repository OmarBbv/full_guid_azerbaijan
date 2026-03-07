import * as React from 'react';
import type { Metadata } from 'next';
import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { PlaceEditForm } from '@/components/dashboard/place/place-edit-form';

export const metadata = { title: `Məkana Düzəliş Et | Dashboard | ${config.site.name}` } satisfies Metadata;

interface PageProps {
  params: Promise<{ placeId: string }>;
}

export default async function Page(props: PageProps): Promise<React.JSX.Element> {
  const { placeId } = await props.params;

  return (
    <Stack spacing={3}>
      <PlaceEditForm placeId={placeId} />
    </Stack>
  );
}
