import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import RouterLink from 'next/link';

import { paths } from '@/paths';
import { AdsTable } from '@/components/dashboard/ads/ads-table';

export const metadata = { title: `Ads | Dashboard | Full Guide Azerbaijan` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Ads Management</Typography>
        </Stack>
        <div>
          <Button 
            component={RouterLink}
            href={paths.dashboard.adsCreate}
            startIcon={<PlusIcon />} 
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
      <AdsTable />
    </Stack>
  );
}
