import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';

import { config } from '@/config';
import { Budget } from '@/components/dashboard/overview/budget';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { LatestProducts } from '@/components/dashboard/overview/latest-products';
import { Sales } from '@/components/dashboard/overview/sales';
import { TasksProgress } from '@/components/dashboard/overview/tasks-progress';
import { TotalCustomers } from '@/components/dashboard/overview/total-customers';
import { TotalProfit } from '@/components/dashboard/overview/total-profit';
import { Traffic } from '@/components/dashboard/overview/traffic';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <Budget diff={0} trend="up" sx={{ height: '100%' }} value="$0" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TotalCustomers diff={0} trend="up" sx={{ height: '100%' }} value="0" />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TasksProgress sx={{ height: '100%' }} value={0} />
      </Grid>
      <Grid
        size={{
          lg: 3,
          sm: 6,
          xs: 12,
        }}
      >
        <TotalProfit sx={{ height: '100%' }} value="$0" />
      </Grid>
      <Grid
        size={{
          lg: 8,
          xs: 12,
        }}
      >
        <Sales
          chartSeries={[
            { name: 'This year', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
            { name: 'Last year', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
          ]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <Traffic chartSeries={[0, 0, 0]} labels={['Desktop', 'Tablet', 'Phone']} sx={{ height: '100%' }} />
      </Grid>
      <Grid
        size={{
          lg: 4,
          md: 6,
          xs: 12,
        }}
      >
        <LatestProducts
          products={[]}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid
        size={{
          lg: 8,
          md: 12,
          xs: 12,
        }}
      >
        <LatestOrders
          orders={[]}
          sx={{ height: '100%' }}
        />
      </Grid>
    </Grid>
  );
}
