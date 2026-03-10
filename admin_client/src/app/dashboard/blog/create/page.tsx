import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { BlogCreateForm } from '@/components/dashboard/blog/blog-create-form';

export const metadata: Metadata = {
  title: `Yeni Məqalə | Blog | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <BlogCreateForm />;
}
