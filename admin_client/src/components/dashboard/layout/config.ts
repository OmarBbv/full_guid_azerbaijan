import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'guide', title: 'Başlanğıc', href: paths.dashboard.guide, icon: 'book-open' },
  { key: 'customers', title: 'İstifadəçilər', href: paths.dashboard.customers, icon: 'users', matcher: { type: 'startsWith', href: paths.dashboard.customers } },
  { key: 'places', title: 'Digər Məkanlar', href: paths.dashboard.places, icon: 'map-pin', matcher: { type: 'startsWith', href: paths.dashboard.places } },
  { key: 'hotels', title: 'Otellər', href: paths.dashboard.hotels, icon: 'buildings', matcher: { type: 'startsWith', href: paths.dashboard.hotels } },
  { key: 'hostels', title: 'Hostellər', href: paths.dashboard.hostels, icon: 'bed', matcher: { type: 'startsWith', href: paths.dashboard.hostels } },
  { key: 'landmarks', title: 'Görməli Yerlər', href: paths.dashboard.landmarks, icon: 'map-pin', matcher: { type: 'startsWith', href: paths.dashboard.landmarks } },
  { key: 'restaurants', title: 'Restoranlar', href: paths.dashboard.restaurants, icon: 'fork-knife', matcher: { type: 'startsWith', href: paths.dashboard.restaurants } },
  { key: 'categories', title: 'Kateqoriyalar', href: paths.dashboard.categories, icon: 'list', matcher: { type: 'startsWith', href: paths.dashboard.categories } },
  { key: 'venues', title: 'Tədbir Məkanları', href: paths.dashboard.venues, icon: 'map-pin', matcher: { type: 'startsWith', href: paths.dashboard.venues } },
  { key: 'cities', title: 'Şəhər və Regionlar', href: paths.dashboard.cities, icon: 'city', matcher: { type: 'startsWith', href: paths.dashboard.cities } },
  { key: 'about', title: 'Haqqımızda', href: paths.dashboard.about, icon: 'info', matcher: { type: 'startsWith', href: paths.dashboard.about } },
  { key: 'blog', title: 'Bloqlar', href: paths.dashboard.blog, icon: 'notebook', matcher: { type: 'startsWith', href: paths.dashboard.blog } },
  { key: 'ads', title: 'Reklamlar', href: paths.dashboard.ads, icon: 'megaphone', matcher: { type: 'startsWith', href: paths.dashboard.ads } },

] satisfies NavItemConfig[];