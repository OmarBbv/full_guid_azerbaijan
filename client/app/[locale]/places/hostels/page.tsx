"use client";

import { useState } from "react";
import { Users, Backpack, MapPin, PiggyBank, ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { usePlacesByType } from '@/hooks/use-places';
import { useCities } from '@/hooks/use-cities';
import { getImageUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';
import un_photo_1555854877_bab0e564b8d5_1934a6f6 from "@/assets/unsplash/photo-1555854877-bab0e564b8d5_1934a6f6.jpg";

export default function HostelsPage() {
  const t = useTranslations("PlacesPage");
  const { locale } = useParams<{ locale: string }>();
  const { data: hostelsData, isLoading } = usePlacesByType('hostel', locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  
  const [activeCity, setActiveCity] = useState("ALL");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const hostels = hostelsData || [];
  const filteredHostels = hostels.filter((h: any) => activeCity === "ALL" ? true : h.city === activeCity);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-transparent to-black/30" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={un_photo_1555854877_bab0e564b8d5_1934a6f6.src}
            alt="Hostels"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white backdrop-blur-md flex items-center justify-center mb-6 text-emerald-600 shadow-xl border-4 border-white/20">
            <Backpack className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            {t("hostels_title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            {t("hostels_subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center relative z-30">
        <h2 className="text-2xl font-bold">{filteredHostels.length} {t("found_count")}</h2>
        
        {/* City Dropdown Filter */}
        <div className="relative">
          <button
            onClick={() => setCityDropdownOpen((v) => !v)}
            className="flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all min-w-[160px] justify-between"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {activeCity === 'ALL' ? 'Bütün Şəhərlər' : activeCity}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${cityDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {cityDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 max-h-64 overflow-y-auto bg-card border border-border rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <button
                onClick={() => { setActiveCity('ALL'); setCityDropdownOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${activeCity === 'ALL'
                    ? 'bg-primary text-primary-foreground focus:bg-primary'
                    : 'hover:bg-muted text-foreground'
                  }`}
              >
                <span>Bütün Şəhərlər</span>
                <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
                  {hostels.length}
                </span>
              </button>
              {cities.map((city) => {
                const isActive = activeCity === city.name;
                const count = hostels.filter((p: any) => p.city === city.name).length;
                return (
                  <button
                    key={city.id}
                    onClick={() => { setActiveCity(city.name); setCityDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors border-t border-border/50 ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                      }`}
                  >
                    <span className="truncate">{city.name}</span>
                    <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
        {!filteredHostels || filteredHostels.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground text-xl">{t("no_items")}</p>
          </div>
        ) : (
          filteredHostels.map((hostel: any, i: number) => (
            <Link
              key={i}
              href={`/places/hostels/${hostel.id}`}
              className="bg-card group border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  unoptimized
                  src={getImageUrl(hostel, un_photo_1555854877_bab0e564b8d5_1934a6f6)}
                  alt={hostel.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                  {hostel.price_range || hostel.priceRange || 'Gündəlik'}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <Backpack className="text-emerald-500 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{hostel.title}</h3>
                </div>
                <p className="text-muted-foreground flex-1 mb-6 line-clamp-3">{hostel.short_description || hostel.subtitle || ''}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-auto">
                  {t("learn_more")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
