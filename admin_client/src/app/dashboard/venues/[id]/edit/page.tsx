import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { VenueEditForm } from '@/components/dashboard/venue/venue-edit-form';

export const metadata: Metadata = {
  title: `Məkanı Redaktə Et | Dashboard | ${config.site.name}`,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  return <VenueEditForm id={Number(id)} />;
}
