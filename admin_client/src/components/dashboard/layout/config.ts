import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'guide', title: 'Başlanğıc (Guide)', href: paths.dashboard.guide, icon: 'book-open' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'places', title: 'Places', href: paths.dashboard.places, icon: 'map-pin' },
  { key: 'hotels', title: 'Hotels', href: paths.dashboard.hotels, icon: 'buildings' },
  { key: 'hostels', title: 'Hostels', href: paths.dashboard.hostels, icon: 'bed' },
  { key: 'landmarks', title: 'Landmarks', href: paths.dashboard.landmarks, icon: 'map-pin' },
  { key: 'restaurants', title: 'Restaurants', href: paths.dashboard.restaurants, icon: 'fork-knife' },
  { key: 'categories', title: 'Categories', href: paths.dashboard.categories, icon: 'list' },
  { key: 'venues', title: 'Venues', href: paths.dashboard.venues, icon: 'map-pin' },
  { key: 'cities', title: 'Cities', href: paths.dashboard.cities, icon: 'city' },
  { key: 'about', title: 'About Pages', href: paths.dashboard.about, icon: 'info' },
  { key: 'blog', title: 'Blog', href: paths.dashboard.blog, icon: 'notebook' },
  { key: 'ads', title: 'Ads', href: paths.dashboard.ads, icon: 'megaphone' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
