import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { RestaurantCreateForm } from '@/components/dashboard/restaurant/restaurant-create-form';

export const metadata: Metadata = {
  title: `Yeni Restoran | Dashboard | ${config.site.name}`,
};

export default function RestaurantCreatePage(): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <RestaurantCreateForm />
    </Container>
  );
}
