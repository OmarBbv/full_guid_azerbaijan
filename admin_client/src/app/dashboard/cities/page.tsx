import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { CitiesView } from '@/components/dashboard/city/cities-view';

export const metadata: Metadata = {
  title: `Şəhərlər | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <CitiesView />;
}
