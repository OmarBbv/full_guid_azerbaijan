import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { CityEditForm } from '@/components/dashboard/city/city-edit-form';

export const metadata: Metadata = {
  title: `Şəhərə Düzəliş Et | Dashboard | ${config.site.name}`,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CityEditPage(props: PageProps): Promise<React.JSX.Element> {
  const params = await props.params;
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <CityEditForm id={params.id} />
    </Container>
  );
}
