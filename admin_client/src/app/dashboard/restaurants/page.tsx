import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { RestaurantsView } from '@/components/dashboard/restaurant/restaurants-view';

export const metadata: Metadata = {
  title: `Restoranlar | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <RestaurantsView />;
}
