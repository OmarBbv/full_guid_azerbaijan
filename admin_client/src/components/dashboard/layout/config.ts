import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'places', title: 'Places', href: paths.dashboard.places, icon: 'map-pin' },
  { key: 'hotels', title: 'Hotels', href: paths.dashboard.hotels, icon: 'buildings' },
  { key: 'hostels', title: 'Hostels', href: paths.dashboard.hostels, icon: 'bed' },
  { key: 'landmarks', title: 'Landmarks', href: paths.dashboard.landmarks, icon: 'map-pin' },
  { key: 'restaurants', title: 'Restaurants', href: paths.dashboard.restaurants, icon: 'fork-knife' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
