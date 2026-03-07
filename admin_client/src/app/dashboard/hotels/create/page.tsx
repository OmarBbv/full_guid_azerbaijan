import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { HotelCreateForm } from '@/components/dashboard/hotel/hotel-create-form';

export const metadata: Metadata = {
  title: `Yeni Otel | Dashboard | ${config.site.name}`,
};

export default function HotelCreatePage(): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <HotelCreateForm />
    </Container>
  );
}
