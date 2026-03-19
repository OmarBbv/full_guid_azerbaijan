"use client";

import { useState } from "react";
import { Castle, Camera, Eye, MapPin, Loader2, ChevronDown } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePlacesByType } from '@/hooks/use-places';
import { useCities } from '@/hooks/use-cities';
import { getImageUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';
import un_photo_1541746972996_4e0b0f43e02a_24bb943f from "@/assets/unsplash/photo-1541746972996-4e0b0f43e02a_24bb943f.jpg";

export default function LandmarksPage() {
  const t = useTranslations("PlacesPage");
  const { locale } = useParams<{ locale: string }>();
  const { data: landmarksData, isLoading } = usePlacesByType('landmark', locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  
  const [activeCity, setActiveCity] = useState("ALL");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const landmarks = landmarksData || [];
  const filteredLandmarks = landmarks.filter((l: any) => activeCity === "ALL" ? true : l.city === activeCity);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-transparent to-black/30" />

        <div className="absolute inset-0 z-0">
          <img
            src={un_photo_1541746972996_4e0b0f43e02a_24bb943f.src}
            alt="Landmarks"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6">
            <Castle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            {t("landmarks_title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md max-w-3xl">
            {t("landmarks_subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 relative z-30">
        <div className="flex flex-col md:flex-row items-center justify-between border-b pb-6 mb-10 gap-4 relative z-40">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Camera className="w-8 h-8 text-primary" />
            {t("reviews").includes("rəy") ? "Seçilmiş Məkanlar" : "Selected Places"}
            <span className="text-muted-foreground text-lg font-normal ml-2">({filteredLandmarks.length})</span>
          </h2>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* City Dropdown Filter */}
            <div className="relative z-20">
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
                      {landmarks.length}
                    </span>
                  </button>
                  {cities.map((city) => {
                    const isActive = activeCity === city.name;
                    const count = landmarks.filter((p: any) => p.city === city.name).length;
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

            <Link href="/mekanlar" className="text-primary font-semibold hover:underline">
              {t("reviews").includes("rəy") ? "Hamısına bax" : "See all"} &rarr;
            </Link>
          </div>
        </div>

        {(!filteredLandmarks || filteredLandmarks.length === 0) ? (
          <div className="text-center py-20 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">{t("no_items")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
            {filteredLandmarks.map((item: any, idx: number) => (
              <Link
                key={item.id || idx}
                href={`/places/landmarks/${item.id}`}
                className="group relative bg-card rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border/10 cursor-pointer flex flex-col active:scale-[0.98] transition-all"
              >
                <div className="w-full h-64 relative overflow-hidden">
                  <Image src={getImageUrl(item, 'https://images.unsplash.com/photo-1620310243292-0b29ce34f2d7?auto=format&fit=crop&q=80&w=800')} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-2xl font-black text-white drop-shadow-md">{item.title}</h3>
                    {item.city && <p className="text-white/80 text-sm font-medium flex items-center gap-1"><MapPin className="w-3 h-3" />{item.city}</p>}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-muted-foreground line-clamp-3">{item.short_description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
                    <span>{t("learn_more")}</span>
                    <Eye className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
