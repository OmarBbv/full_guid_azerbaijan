import * as React from 'react';
import type { Metadata } from 'next';
import Container from '@mui/material/Container';

import { config } from '@/config';
import { BlogEditForm } from '@/components/dashboard/blog/blog-edit-form';

export const metadata: Metadata = {
  title: `Yazını Redaktə Et | Dashboard | ${config.site.name}`,
};

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps): React.JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <BlogEditForm id={params.id} />
    </Container>
  );
}
