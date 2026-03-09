"use client";

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Map, User, Menu, MapPin, Search, Globe, ChevronRight, Heart, X, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: t('home'), href: '/' },
    {
      id: 'getting-started',
      label: t('getting_started'),
      subLinks: [
        { label: t('about_baku'), href: '/info/baku' },
        { label: t('airport_info'), href: '/info/airport' },
      ]
    },
    {
      id: 'getting-around',
      label: t('getting_around'),
      subLinks: [
        { label: t('taxi_services'), href: '/transport/taxi' },
        { label: t('public_transport'), href: '/transport/public' },
      ]
    },
    {
      id: 'destinations',
      label: t('destinations'),
      subLinks: [
        { label: t('landmarks'), href: '/places/landmarks' },
        { label: t('restaurants'), href: '/places/restaurants' },
        { label: t('hotels'), href: '/places/hotels' },
        { label: t('hostels'), href: '/places/hostels' },
      ]
    },
    {
      id: 'about',
      label: t('about'),
      subLinks: [
        { label: t('about_fga'), href: '/about/fga' },
        { label: t('platform_principles'), href: '/about/principles' },
        { label: t('transparency'), href: '/about/transparency' },
      ]
    },
    { id: 'contact', label: t('contact'), href: '/contact' },
  ];
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const LANGUAGES = [
    { code: 'az', label: 'Azərbaycan', flag: '🇦🇿' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  const currentLang = LANGUAGES.find(l => l.code === locale) ?? LANGUAGES[0];

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const authRoutes = ['/login', '/register'];
  const isAuthPage = authRoutes.some(route => pathname?.includes(route));
  const isLightPage = false;

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
                aria-label={t('search')}
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <button
                className={`${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors duration-200`}
                aria-label={t('map')}
              >
                <Map className="w-[18px] h-[18px]" />
              </button>

              <Link
                href="/secilmisler"
                className={`relative ${isLightPage ? 'text-foreground/60 hover:text-foreground' : 'text-white/60 hover:text-white'} transition-colors duration-200`}
                aria-label={t('favorites')}
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              {/* Language Switcher */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200 text-[13px] font-semibold cursor-pointer"
                  aria-label={t('select_language')}
                >
                  <Globe className="w-4 h-4" />
                  <span>{currentLang.flag} {currentLang.code.toUpperCase()}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${langOpen ? 'rotate-180' : ''}`} />
                </button>

                {langOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-44 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] overflow-hidden py-1.5 z-50"
                    style={{
                      background: 'rgba(10, 12, 22, 0.98)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          router.replace(pathname, { locale: lang.code as 'az' | 'en' | 'ru' });
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium transition-colors ${locale === lang.code
                          ? 'text-white bg-white/10'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {locale === lang.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />}
                      </button>
                    ))}
                  </div>
                )}
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
              aria-label={t('menu')}
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
          className="absolute top-0 right-0 h-full w-full max-w-md flex flex-col pt-20 pb-8 px-6 transition-transform duration-400 overflow-y-auto"
          style={{
            background: isLightPage ? 'rgba(255, 255, 255, 1)' : 'rgba(10, 12, 22, 1)',
            borderLeft: isLightPage ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.07)',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <div key={link.id} className="flex flex-col border-b border-white/10 last:border-0">
                {link.subLinks ? (
                  <>
                    <button
                      className={`flex items-center justify-between w-full text-left ${isLightPage ? 'text-foreground/90 hover:text-foreground' : 'text-white/90 hover:text-white'} text-[14px] tracking-wider uppercase font-bold py-4 transition-colors`}
                      onClick={() => setOpenMobileDropdown(openMobileDropdown === link.id ? null : link.id)}
                    >
                      {link.label}
                      <ChevronRight className={`w-4 h-4 text-blue-500 transition-transform duration-300 ${openMobileDropdown === link.id ? 'rotate-90' : ''}`} />
                    </button>
                    {openMobileDropdown === link.id && (
                      <div className="flex flex-col gap-0 bg-black/20 rounded-xl mb-4 overflow-hidden border border-white/5">
                        {link.subLinks.map(sub => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setMobileOpen(false)}
                            className={`text-[13px] py-3 px-5 transition-colors border-b border-white/5 last:border-0 ${isLightPage ? 'text-foreground/70 hover:text-primary' : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10'
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
                    className={`flex items-center justify-between w-full text-left ${isLightPage ? 'text-foreground/90 hover:text-foreground' : 'text-white/90 hover:text-white'} text-[14px] tracking-wider uppercase font-bold py-4 transition-colors`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-blue-500" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-[1px] bg-white/10 border border-white/10 rounded-xl overflow-hidden shadow-sm">
            {/* Map */}
            <button className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group">
              <Map className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">{t('map')}</span>
            </button>

            {/* Profile */}
            <Link href="/login" onClick={() => setMobileOpen(false)} className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group">
              <User className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">{t('login')}</span>
            </Link>

            {/* Favorites */}
            <Link href="/secilmisler" onClick={() => setMobileOpen(false)} className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group">
              <Heart className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">{t('favorites')}</span>
            </Link>

            {/* Search */}
            <button className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group">
              <Search className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">{t('search')}</span>
            </button>
          </div>

          {/* Languages Section at bottom matching the style if needed, or keeping it below */}
          <div className="mt-6 flex flex-col border border-white/10 rounded-xl overflow-hidden">
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => {
                  router.replace(pathname, { locale: lang.code as 'az' | 'en' | 'ru' });
                  setMobileOpen(false);
                }}
                className={`flex items-center justify-between px-5 py-3 text-[13px] font-bold transition-all border-b border-white/5 last:border-0 ${locale === lang.code
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-white/70 hover:text-white bg-[#0A0C16] hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="uppercase tracking-wider">{lang.label}</span>
                </div>
                {locale === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
