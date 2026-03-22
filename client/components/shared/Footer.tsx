"use client";

import { Separator } from "@/components/ui/separator";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useCategories } from "@/hooks/use-categories";
import { useCities } from "@/hooks/use-cities";
import { useAboutPages } from "@/hooks/use-about-pages";

export default function Footer() {
  const pathname = usePathname();
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');
  const locale = useLocale();
  
  const { data: dynamicCategories = [] } = useCategories(locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  const { data: aboutPages = [] } = useAboutPages({ language: locale, active: true });

  const authRoutes = ['/login', '/register'];
  const isAuthPage = authRoutes.some(route => pathname?.includes(route));

  if (isAuthPage) return null;

  return (
    <footer className="w-full bg-background text-foreground py-12 pb-6 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        {/* Top section: Logo & Columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Logo / Brand */}
          <div className="lg:max-w-xs flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link href="/" className="text-2xl font-bold tracking-tight text-primary flex items-center justify-center lg:justify-start gap-2">
              <div className="w-6 h-6 bg-accent rounded-sm rotate-45 shrink-0" />
              <span>Full <span className="text-accent">Guide</span></span>
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full uppercase text-xs font-semibold tracking-wider text-center sm:text-left">
            {/* Column 1: Məkanlar */}
            <div className="flex flex-col gap-5">
              <h3 className="text-foreground">{tNav('destinations')}</h3>
              <ul className="flex flex-col gap-3 text-muted-foreground font-medium normal-case text-sm">
                <li><Link href="/places/landmarks" className="hover:text-primary transition-colors">{tNav('landmarks')}</Link></li>
                <li><Link href="/places/restaurants" className="hover:text-primary transition-colors">{tNav('restaurants')}</Link></li>
                <li><Link href="/places/hotels" className="hover:text-primary transition-colors">{tNav('hotels')}</Link></li>
                <li><Link href="/places/hostels" className="hover:text-primary transition-colors">{tNav('hostels')}</Link></li>
                {dynamicCategories.slice(0, 3).map((cat) => (
                  <li key={`cat-${cat.id}`}><Link href={`/mekanlar?category=${cat.slug}`} className="hover:text-primary transition-colors">{cat.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Column 2: Regionlar / Şəhərlər */}
            <div className="flex flex-col gap-5">
              <h3 className="text-foreground">{tNav('where_to_go')}</h3>
              <ul className="flex flex-col gap-3 text-muted-foreground font-medium normal-case text-sm">
                {cities.slice(0, 6).map((city) => (
                  <li key={`city-${city.id}`}><Link href={`/regions/${city.id}`} className="hover:text-primary transition-colors">{city.name}</Link></li>
                ))}
              </ul>
            </div>

            {/* Column 3: Haqqımızda & Faydalı */}
            <div className="flex flex-col gap-5">
              <h3 className="text-foreground">{tNav('about')}</h3>
              <ul className="flex flex-col gap-3 text-muted-foreground font-medium normal-case text-sm">
                {aboutPages.map((page) => (
                  <li key={`page-${page.slug}`}><Link href={`/about/${page.slug}`} className="hover:text-primary transition-colors">{page.title}</Link></li>
                ))}
                <li><Link href="/contact" className="hover:text-primary transition-colors">{tNav('contact')}</Link></li>
                <li><Link href="/secilmisler" className="hover:text-primary transition-colors">{tNav('favorites')}</Link></li>
              </ul>
            </div>

            {/* Column 4: Əlaqə */}
            <div className="flex flex-col gap-5">
              <h3 className="text-foreground">{t('contact')}</h3>
              <ul className="flex flex-col gap-3 text-muted-foreground font-medium normal-case text-sm">
                <li>E-mail: <a href="mailto:fullguideazerbaijan@gmail.com" className="hover:text-primary transition-colors break-all">fullguideazerbaijan@gmail.com</a></li>
              </ul>

              <h3 className="text-foreground mt-2">{t('social_networks')}</h3>
              <ul className="flex flex-col gap-3 text-muted-foreground font-medium normal-case text-sm">
                <li><a href="https://instagram.com/fullguideazerbaijan/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://facebook.com/fullguideazerbaijan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a></li>
                <li><a href="https://www.youtube.com/@fullguideazerbaijan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a></li>
                <li><a href="https://www.tiktok.com/@fullguideazerbaijan" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">TikTok</a></li>
                <li><a href="https://wa.me/994514151107" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom section: Legal & Copyright text */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground font-medium text-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-primary transition-colors">{t('privacy_policy')}</Link>
            <Link href="#" className="hover:text-primary transition-colors">{t('cookie_policy')}</Link>
            <Link href="#" className="hover:text-primary transition-colors">{t('terms_of_use')}</Link>
          </div>
          <div>
            © {new Date().getFullYear()} {t('all_rights_reserved')}
          </div>
        </div>
      </div>
    </footer>
  );
}
