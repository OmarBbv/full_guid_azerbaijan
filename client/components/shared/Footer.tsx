"use client";

import { Separator } from "@/components/ui/separator";
import { Link, usePathname } from "@/i18n/routing";

export default function Footer() {
  const pathname = usePathname();
  const authRoutes = ['/login', '/register'];
  const isAuthPage = authRoutes.some(route => pathname?.includes(route));

  if (isAuthPage) return null;

  return (
    <footer className="w-full bg-background text-foreground py-12 pb-6 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        {/* Top section: Logo & Columns */}
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          {/* Logo / Brand */}
          <div className="md:max-w-xs">
            <Link href="/" className="text-2xl font-bold tracking-tight text-primary flex items-center gap-2">
              <div className="w-6 h-6 bg-accent rounded-sm rotate-45 shrink-0" />
              <span>Full <span className="text-accent">Guide</span></span>
            </Link>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full uppercase text-xs font-semibold tracking-wider">
            {/* Column 1 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground">Turlar & Əyləncə</h3>
              <ul className="flex flex-col gap-4 text-muted-foreground font-medium normal-case text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Tarixi Turlar</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Şəhər Turları</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Təbiət Turları</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Aktiv Əyləncə</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Mədəniyyət</Link></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground">Faydalı Məlumat</h3>
              <ul className="flex flex-col gap-4 text-muted-foreground font-medium normal-case text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Gürcüstan (Nümunə)</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Regionlar</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Xəritə</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Populyar Məkanlar</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground">Əlaqə</h3>
              <ul className="flex flex-col gap-4 text-muted-foreground font-medium normal-case text-sm">
                <li>Hotline: <span className="text-foreground font-medium">0 800 80 09 09</span></li>
                <li>Ünvan: <span>Bakı şəh., Nümunəvi küç.</span></li>
                <li>E-mail: <a href="mailto:info@fullguide.az" className="hover:text-primary transition-colors">info@fullguide.az</a></li>
              </ul>

              <h3 className="text-foreground mt-4">Sosial Şəbəkələr</h3>
              <ul className="flex flex-col gap-4 text-muted-foreground font-medium normal-case text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Facebook</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Instagram</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">X (Twitter)</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">YouTube</Link></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-6">
              <h3 className="text-foreground">Faydalı Linklər</h3>
              <ul className="flex flex-col gap-4 text-muted-foreground font-medium normal-case text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Turizm Nazirliyi</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Dövlət Agentliyi</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Qoruqlar</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Bottom section: Legal & Copyright text */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Məxfilik Siyasəti</Link>
            <Link href="#" className="hover:text-primary transition-colors">Kuki (Cookie) Siyasəti</Link>
            <Link href="#" className="hover:text-primary transition-colors">İstifadə Şərtləri</Link>
          </div>
          <div>
            © {new Date().getFullYear()} Full Guide Azerbaijan. Bütün hüquqlar qorunur.
          </div>
        </div>
      </div>
    </footer>
  );
}
