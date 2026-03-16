import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { RestaurantEditForm } from '@/components/dashboard/restaurant/restaurant-edit-form';

export const metadata: Metadata = {
  title: `Restoranı Redaktə Et | Dashboard | ${config.site.name}`,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps): Promise<React.JSX.Element> {
  const { id } = await params;
  return <RestaurantEditForm id={id} />;
}
