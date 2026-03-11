import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { AdCreateForm } from '@/components/dashboard/ads/ad-create-form';

export const metadata: Metadata = {
  title: `Yeni Reklam | Dashboard | ${config.site.name}`,
};

export default function AdCreatePage(): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <AdCreateForm />
    </Container>
  );
}
