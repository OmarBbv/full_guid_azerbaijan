"use client";

import { Link, usePathname } from '@/i18n/routing';
import { Map, User, Menu, MapPin, Search, Globe, ChevronRight, Heart, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { id: 'home', label: 'Ana Səhifə', href: '/' },
  {
    id: 'getting-started',
    label: 'Başlanğıc',
    subLinks: [
      { label: 'Azərbaycan / Bakı haqqında ümumi məlumat', href: '/info/baku' },
      { label: 'Hava limanı ilə bağlı məlumat və istiqamətləndirmə', href: '/info/airport' },
    ]
  },
  {
    id: 'getting-around',
    label: 'Hərəkət',
    subLinks: [
      { label: 'Taksi xidmətləri', href: '/transport/taxi' },
      { label: 'İctimai nəqliyyat', href: '/transport/public' },
    ]
  },
  {
    id: 'destinations',
    label: 'Məkanlar',
    subLinks: [
      { label: 'Tarixi və turistik məkanlar (Landmarks)', href: '/places/landmarks' },
      { label: 'Restoranlar', href: '/places/restaurants' },
      { label: 'Otellər', href: '/places/hotels' },
      { label: 'Hostellər', href: '/places/hostels' },
    ]
  },
  {
    id: 'about',
    label: 'Haqqımızda',
    subLinks: [
      { label: 'FGA haqqında', href: '/about/fga' },
      { label: 'Platformanın prinsipləri', href: '/about/principles' },
      { label: 'Şəffaflıq və fəaliyyət çərçivəsi', href: '/about/transparency' },
    ]
  },
  { id: 'contact', label: 'Əlaqə', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const authRoutes = ['/login', '/register'];
  const isAuthPage = authRoutes.some(route => pathname?.includes(route));
  const lightRoutes = ['/mekanlar', '/blog', '/contact', '/secilmisler', '/login', '/register'];
  const isLightPage = false; // Always dark text to contrast with dark glass effect

  useEffect(() => {
    if (isAuthPage) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isAuthPage]);

  if (isAuthPage) return null;

  const navColor = 'text-white';
  const navColorMuted = 'text-white/70';
  const activeLinkColor = '#3b9cf5';

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-50 w-full transition-all duration-500"
        style={{
          background: 'rgba(10, 12, 20, 0.75)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          paddingTop: scrolled ? 0 : 0,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? 60 : 72 }}
          >

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #3b9cf5, #6f5cf6)' }}
              >
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className={`font-extrabold text-lg tracking-tight ${isLightPage ? 'text-foreground' : 'text-white'}`}>
                Full<span style={{ color: '#3b9cf5' }}>Guide</span>
              </span>
            </Link>

            {/* Center Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.subLinks && link.subLinks.some(sub => pathname === sub.href));
                return link.subLinks ? (
                  <div key={link.id} className="relative group/nav-item py-4 cursor-pointer">
                    <span className={`relative flex items-center gap-1 text-[14px] font-semibold transition-colors duration-200 ${isActive ? navColor : navColorMuted} group-hover/nav-item:${navColor}`}>
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover/nav-item:rotate-180 transition-transform duration-300" />
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover/nav-item:w-full ${isActive ? 'w-full' : ''}`}
                        style={{ background: activeLinkColor }}
                      />
                    </span>

                    {/* PC Dropdown Menu */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover/nav-item:opacity-100 group-hover/nav-item:translate-y-0 group-hover/nav-item:pointer-events-auto transition-all duration-300">
                      <div
                        className="w-[280px] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden py-2"
                        style={{
                          background: isLightPage ? '#ffffff' : 'rgba(15, 18, 25, 0.98)',
                          border: isLightPage ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(255,255,255,0.08)',
                          backdropFilter: 'blur(20px)'
                        }}
                      >
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-5 py-3 text-[13.5px] font-medium transition-colors ${isLightPage
                              ? 'text-foreground/80 hover:text-primary hover:bg-slate-50/50'
                              : 'text-white/80 hover:text-white hover:bg-white/5'
                              } ${pathname === sub.href ? (isLightPage ? 'text-primary bg-slate-50' : 'text-white bg-white/10') : ''}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href as any}
                    className={`relative text-[14px] font-semibold transition-colors duration-200 group ${pathname === link.href ? navColor : navColorMuted} hover:${navColor}`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`}
                      style={{ background: activeLinkColor }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors duration-200`}
                aria-label="Axtar"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <button
                className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors duration-200`}
                aria-label="Xəritə"
              >
                <Map className="w-[18px] h-[18px]" />
              </button>

              <Link
                href="/secilmisler"
                className={`relative ${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors duration-200`}
                aria-label="Bəyənilənlər"
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              {/* Language */}
              <div className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} flex items-center gap-1 cursor-pointer transition-colors duration-200 text-[13px] font-semibold`}>
                <Globe className="w-4 h-4" />
                AZ
                <ChevronRight className="w-3.5 h-3.5" />
              </div>

              {/* User Avatar */}
              <Link
                href="/login"
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #3b9cf5, #6f5cf6)',
                  boxShadow: isLightPage ? '0 0 0 2px rgba(59,156,245,0.2)' : '0 0 0 2px rgba(59,156,245,0.35)',
                }}
              >
                <User className="w-4 h-4 text-white" />
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className={`lg:hidden ${isLightPage ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'} transition-colors`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menyu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-400"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className="absolute top-0 right-0 h-full w-[85vw] max-w-[320px] flex flex-col pt-24 pb-8 px-6 transition-transform duration-400 overflow-y-auto"
          style={{
            background: isLightPage ? 'rgba(255, 255, 255, 0.98)' : 'rgba(10, 12, 22, 0.98)',
            borderLeft: isLightPage ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.id} className="flex flex-col border-b border-border/10 pb-2">
                {link.subLinks ? (
                  <>
                    <button
                      className={`flex items-center justify-between w-full text-left ${isLightPage ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'} text-[16px] font-semibold py-2 transition-colors`}
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === link.id ? null : link.id)}
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openMobileDropdown === link.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openMobileDropdown === link.id && (
                      <div className="flex flex-col gap-2 mt-2 ml-4 mb-2 animate-in slide-in-from-top-2 duration-200">
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={`text-[14px] py-1.5 transition-colors ${isLightPage ? 'text-foreground/60 hover:text-primary' : 'text-white/60 hover:text-white'
                              }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href as any}
                    className={`${isLightPage ? 'text-foreground/80 hover:text-foreground' : 'text-white/80 hover:text-white'} text-[16px] font-semibold py-2 transition-colors`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 flex items-center justify-between gap-4">
            <div className="flex gap-4">
              <button className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors`}>
                <Search className="w-5 h-5" />
              </button>
              <button className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors`}>
                <Map className="w-5 h-5" />
              </button>
              <Link
                href="/secilmisler"
                className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors`}
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/10">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-black text-center block shadow-lg shadow-primary/20"
            >
              Daxil Ol
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
