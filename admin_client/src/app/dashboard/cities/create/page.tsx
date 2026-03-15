import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { CityCreateForm } from '@/components/dashboard/city/city-create-form';

export const metadata: Metadata = {
  title: `Yeni Şəhər | Dashboard | ${config.site.name}`,
};

export default function CityCreatePage(): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <CityCreateForm />
    </Container>
  );
}
