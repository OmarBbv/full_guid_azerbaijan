import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CategoryEditForm } from '@/components/dashboard/category/category-edit-form';

export const metadata: Metadata = {
  title: `Kateqoriya Redaktə | Dashboard | ${config.site.name}`,
};

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps): React.JSX.Element {
  return <CategoryEditForm id={Number(params.id)} />;
}
