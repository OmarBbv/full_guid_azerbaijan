"use client";

import { Link } from '@/i18n/routing';
import { Map, User, Menu, MapPin, Search, Globe, ChevronRight, Heart, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { id: 'home', label: 'Ana Səhifə', href: '/' },
  { id: 'destinations', label: 'Məkanlar', href: '/mekanlar' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'contact', label: 'Əlaqə', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-50 w-full transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(10, 12, 20, 0.82)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
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
              <span className="font-extrabold text-lg text-white tracking-tight">
                Full<span style={{ color: '#3b9cf5' }}>Guide</span>
              </span>
            </Link>

            {/* Center Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="relative text-[14px] font-semibold text-white/70 hover:text-white transition-colors duration-200 group"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full transition-all duration-300 group-hover:w-full"
                    style={{ background: '#3b9cf5' }}
                  />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-5">
              <button
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Axtar"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              <button
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Xəritə"
              >
                <Map className="w-[18px] h-[18px]" />
              </button>

              <button
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label="Bəyənilənlər"
              >
                <Heart className="w-[18px] h-[18px]" />
              </button>

              {/* Language */}
              <div className="flex items-center gap-1 text-white/60 hover:text-white cursor-pointer transition-colors duration-200 text-[13px] font-semibold">
                <Globe className="w-4 h-4" />
                AZ
                <ChevronRight className="w-3.5 h-3.5" />
              </div>

              {/* User Avatar */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #3b9cf5, #6f5cf6)',
                  boxShadow: '0 0 0 2px rgba(59,156,245,0.35)',
                }}
              >
                <User className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-white/80 hover:text-white transition-colors"
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
          className="absolute top-0 right-0 h-full w-72 flex flex-col pt-20 pb-8 px-8 transition-transform duration-400"
          style={{
            background: 'rgba(10, 12, 22, 0.98)',
            border: '1px solid rgba(255,255,255,0.07)',
            transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          }}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-white/70 hover:text-white text-lg font-semibold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <Map className="w-5 h-5" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
