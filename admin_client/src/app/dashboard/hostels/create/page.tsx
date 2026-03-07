import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { HostelCreateForm } from '@/components/dashboard/hostel/hostel-create-form';

export const metadata: Metadata = {
  title: `Yeni Hostel | Dashboard | ${config.site.name}`,
};

export default function HostelCreatePage(): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <HostelCreateForm />
    </Container>
  );
}
