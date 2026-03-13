import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CategoryCreateForm } from '@/components/dashboard/category/category-create-form';

export const metadata: Metadata = {
  title: `Yeni Kateqoriya | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <CategoryCreateForm />;
}
