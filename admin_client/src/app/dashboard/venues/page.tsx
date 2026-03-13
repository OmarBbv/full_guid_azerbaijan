import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { VenuesView } from '@/components/dashboard/venue/venues-view';

export const metadata: Metadata = {
  title: `Məkanlar | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <VenuesView />;
}
