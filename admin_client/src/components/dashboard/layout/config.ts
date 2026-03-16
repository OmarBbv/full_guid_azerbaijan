import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'guide', title: 'Başlanğıc (Guide)', href: paths.dashboard.guide, icon: 'book-open' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users', matcher: { type: 'startsWith', href: paths.dashboard.customers } },
  { key: 'places', title: 'Places', href: paths.dashboard.places, icon: 'map-pin', matcher: { type: 'startsWith', href: paths.dashboard.places } },
  { key: 'hotels', title: 'Hotels', href: paths.dashboard.hotels, icon: 'buildings', matcher: { type: 'startsWith', href: paths.dashboard.hotels } },
  { key: 'hostels', title: 'Hostels', href: paths.dashboard.hostels, icon: 'bed', matcher: { type: 'startsWith', href: paths.dashboard.hostels } },
  { key: 'landmarks', title: 'Landmarks', href: paths.dashboard.landmarks, icon: 'map-pin', matcher: { type: 'startsWith', href: paths.dashboard.landmarks } },
  { key: 'restaurants', title: 'Restaurants', href: paths.dashboard.restaurants, icon: 'fork-knife', matcher: { type: 'startsWith', href: paths.dashboard.restaurants } },
  { key: 'categories', title: 'Categories', href: paths.dashboard.categories, icon: 'list', matcher: { type: 'startsWith', href: paths.dashboard.categories } },
  { key: 'venues', title: 'Venues', href: paths.dashboard.venues, icon: 'map-pin', matcher: { type: 'startsWith', href: paths.dashboard.venues } },
  { key: 'cities', title: 'Cities', href: paths.dashboard.cities, icon: 'city', matcher: { type: 'startsWith', href: paths.dashboard.cities } },
  { key: 'about', title: 'About Pages', href: paths.dashboard.about, icon: 'info', matcher: { type: 'startsWith', href: paths.dashboard.about } },
  { key: 'blog', title: 'Blog', href: paths.dashboard.blog, icon: 'notebook', matcher: { type: 'startsWith', href: paths.dashboard.blog } },
  { key: 'ads', title: 'Ads', href: paths.dashboard.ads, icon: 'megaphone', matcher: { type: 'startsWith', href: paths.dashboard.ads } },

] satisfies NavItemConfig[];