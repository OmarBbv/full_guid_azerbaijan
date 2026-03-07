import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { HostelsView } from '@/components/dashboard/hostel/hostels-view';

export const metadata: Metadata = {
  title: `Hostellər | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <HostelsView />;
}
