import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['az', 'en', 'ru', 'tr', 'ar', 'hi'],
  defaultLocale: 'az',
  // localePrefix: 'as-needed' // optional
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
