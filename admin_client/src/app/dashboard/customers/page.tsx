import * as React from 'react';
import type { Metadata } from 'next';
import { config } from '@/config';
import { CustomersView } from '@/components/dashboard/customer/customers-view';

export const metadata = { title: `İstifadəçilər | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return <CustomersView />;
}
