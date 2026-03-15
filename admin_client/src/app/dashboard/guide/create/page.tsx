'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import { GuidePageForm } from '@/components/dashboard/guide/guide-page-form';

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <GuidePageForm />
    </Stack>
  );
}
