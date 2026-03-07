import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { LandmarksView } from '@/components/dashboard/landmark/landmarks-view';

export const metadata: Metadata = {
  title: `Landmarklər | Dashboard | ${config.site.name}`,
};

export default function Page(): React.JSX.Element {
  return <LandmarksView />;
}
