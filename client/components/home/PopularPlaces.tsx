"use client";

import { ArrowRight } from "lucide-react";
import { PlaceCard } from "./PlaceCard";
import { useLocale, useTranslations } from "next-intl";
import { usePlaces } from "@/hooks/use-places";
import { PLACES } from "@/constants/places";

export default function PopularPlaces() {
  const t = useTranslations('Home');
  const locale = useLocale();
  const { data: places, isLoading } = usePlaces({
    language: locale,
    is_featured: true
  });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute rounded-full blur-[80px] opacity-[0.06] pointer-events-none w-[500px] h-[500px] bg-[#3b9cf5] -top-[100px] -right-[100px]" />
      <div className="absolute rounded-full blur-[80px] opacity-[0.06] pointer-events-none w-[400px] h-[400px] bg-[#4dd9ac] -bottom-[80px] -left-[80px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">🌟 {t('popular')}</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black leading-[1.1] tracking-[-0.03em] text-foreground">
              {t('azerbaijan_most_beautiful')} <br />
              <span className="bg-linear-to-br from-primary to-[#3b9cf5] bg-clip-text text-transparent">{t('places')}</span>
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-[420px] leading-relaxed mt-3">
              {t('popular_description')}
            </p>
          </div>

          <a
            href="/mekanlar"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1 shrink-0 self-start md:self-auto"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 8px 24px rgba(30,58,138,0.25)",
            }}
          >
            {t('see_all')}
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-muted/50 rounded-3xl h-[450px] animate-pulse" />
            ))
          ) : (
            (places && places.length > 0 ? places.slice(0, 6) : PLACES.slice(0, 6)).map((place, i) => (
              <PlaceCard key={place.id} place={place} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
