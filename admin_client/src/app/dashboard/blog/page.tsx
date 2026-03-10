import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { BlogView } from '@/components/dashboard/blog/blog-view';

export const metadata: Metadata = {
  title: `Blog | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <BlogView />;
}
