import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { LandmarkCreateForm } from '@/components/dashboard/landmark/landmark-create-form';

export const metadata: Metadata = {
  title: `Yeni Landmark | Dashboard | ${config.site.name}`,
};

export default function LandmarkCreatePage(): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <LandmarkCreateForm />
    </Container>
  );
}
