import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { AdEditForm } from '@/components/dashboard/ads/ad-edit-form';

export const metadata: Metadata = {
  title: `Reklam Redaktə Et | Dashboard | ${config.site.name}`,
};

interface PageProps {
  params: { id: string };
}

export default function AdEditPage({ params }: PageProps): React.JSX.Element {
  const { id } = params;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AdEditForm id={id} />
    </Container>
  );
}
