"use client";

import { useState } from "react";
import { Bed, Star, MapPin, Wifi, Coffee, ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { usePlacesByType } from '@/hooks/use-places';
import { useCities } from '@/hooks/use-cities';
import { Place } from '@/types/place';
import { getImageUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';
import un_photo_1566073771259_6a8506099945_24bb943f from "@/assets/unsplash/photo-1566073771259-6a8506099945_24bb943f.jpg";

export default function HotelsPage() {
  const t = useTranslations("PlacesPage");
  const { locale } = useParams<{ locale: string }>();
  const { data: hotelsData, isLoading } = usePlacesByType('hotel', locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  
  const [activeCity, setActiveCity] = useState("ALL");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const hotels = hotelsData || [];
  const filteredHotels = hotels.filter((h: any) => activeCity === "ALL" ? true : h.city === activeCity);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
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
            src={un_photo_1566073771259_6a8506099945_24bb943f.src}
            alt="Hotels"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-white shadow-xl border border-white/20">
            <Bed className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            {t("hotels_title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            {t("hotels_subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center relative z-30">
        <h2 className="text-2xl font-bold">{filteredHotels.length} {t("found_count")}</h2>
        
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
                  {hotels.length}
                </span>
              </button>
              {cities.map((city) => {
                const isActive = activeCity === city.name;
                const count = hotels.filter((p: any) => p.city === city.name).length;
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

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
        {!filteredHotels || filteredHotels.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground text-xl">{t("no_items")}</p>
          </div>
        ) : (
          filteredHotels.map((hotel: any, i: number) => (
            <Link
              key={i}
              href={`/places/hotels/${hotel.id}`}
              className="flex flex-col lg:flex-row bg-card border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
                <Image src={getImageUrl(hotel, un_photo_1566073771259_6a8506099945_24bb943f)} alt={hotel.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
              </div>
              <div className="p-8 lg:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-3">
                    {/* Simplified static stars for now, or dynamic if data has stars / average_rating */}
                    {Array.from({ length: Math.round(Number(hotel.average_rating || 5)) }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{hotel.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{hotel.short_description || hotel.subtitle || ''}</p>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    {hotel.has_wifi && <Wifi className="w-4 h-4 text-blue-500" />}
                    {hotel.has_outdoor_seating && <Coffee className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="ml-auto font-black text-foreground flex items-center gap-2">
                    {t("learn_more")} <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
