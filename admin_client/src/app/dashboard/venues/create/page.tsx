import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { VenueCreateForm } from '@/components/dashboard/venue/venue-create-form';

export const metadata: Metadata = {
  title: `Yeni Məkan | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <VenueCreateForm />;
}
