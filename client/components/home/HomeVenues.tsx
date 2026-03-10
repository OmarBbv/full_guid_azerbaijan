"use client";

import { useLocale } from "next-intl";
import { usePlacesByType } from "@/hooks/use-places";
import { MOCK_HOTELS, MOCK_RESTAURANTS, MOCK_HOSTELS } from "@/constants/places";
import { PlaceCard } from "./PlaceCard";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

function VenueSection({ title, typeStr, loading, data, mock }: { title: string, typeStr: string, loading: boolean, data: any, mock: any }) {
  const displayPlaces = (data && data.length > 0) ? data : mock;

  return (
    <div className="mb-16 last:mb-0">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h3>
        <Link
          href={`/mekanlar?type=${typeStr}`}
          className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          Daha çox <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-card rounded-3xl h-[400px] animate-pulse border border-border shadow-sm" />
          ))
        ) : (
          displayPlaces.slice(0, 3).map((place: any, i: number) => (
            <PlaceCard key={place.id} place={place} index={i} />
          ))
        )}
      </div>
    </div>
  );
}

export default function HomeVenues() {
  const locale = useLocale();

  const { data: restaurants, isLoading: isR } = usePlacesByType("restaurant", locale);
  const { data: hotels, isLoading: isH } = usePlacesByType("hotel", locale);
  const { data: hostels, isLoading: isHo } = usePlacesByType("hostel", locale);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute rounded-full blur-[80px] opacity-[0.04] pointer-events-none w-[600px] h-[600px] bg-[#e63946] -top-[200px] -left-[200px]" />
      <div className="absolute rounded-full blur-[80px] opacity-[0.04] pointer-events-none w-[500px] h-[500px] bg-[#1d3557] -bottom-[200px] -right-[200px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="mb-16 max-w-2xl">
          <span className="section-pill">🍽️ Yemək və İstirahət</span>
          <h2 className="section-title mt-4">
            Restoran, Otel və <br />
            <span className="section-title-accent">Hostellər</span>
          </h2>
          <p className="section-desc mt-4 text-lg">
            Səyahətiniz üçün ən ləziz təamlar və ən rahat qalacaq yerləri kəşf edin.
            Gözəl xatirələr üçün doğru məkanı seçin.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <VenueSection
            title="✨ Populyar Restoranlar"
            typeStr="restaurant"
            loading={isR}
            data={restaurants}
            mock={MOCK_RESTAURANTS}
          />
          <VenueSection
            title="🏨 Ən Yaxşı Otellər"
            typeStr="hotel"
            loading={isH}
            data={hotels}
            mock={MOCK_HOTELS}
          />
          <VenueSection
            title="🛌 Büdcə Dostu Hostellər"
            typeStr="hostel"
            loading={isHo}
            data={hostels}
            mock={MOCK_HOSTELS}
          />
        </div>

        <div className="mt-16 text-center flex justify-center">
          <Link href="/mekanlar" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 active:scale-95 group">
            Bütün Rota və Məkanları Kəşf Et <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
