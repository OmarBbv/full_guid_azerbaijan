import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { HotelsView } from '@/components/dashboard/hotel/hotels-view';

export const metadata: Metadata = {
  title: `Otellər | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <HotelsView />;
}
