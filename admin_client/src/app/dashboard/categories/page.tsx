import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CategoriesView } from '@/components/dashboard/category/categories-view';

export const metadata: Metadata = {
  title: `Kateqoriyalar | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <CategoriesView />;
}
