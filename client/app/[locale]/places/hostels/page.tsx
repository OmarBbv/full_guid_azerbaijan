"use client";

import { Users, Backpack, MapPin, PiggyBank, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

import { usePlacesByType } from '@/hooks/use-places';
import { getImageUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';
import un_photo_1555854877_bab0e564b8d5_1934a6f6 from "@/assets/unsplash/photo-1555854877-bab0e564b8d5_1934a6f6.jpg";

export default function HostelsPage() {
  const { locale } = useParams<{ locale: string }>();
  const { data: hostelsData, isLoading } = usePlacesByType('hostel', locale);
  const hostels = hostelsData || [];

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
            src={un_photo_1555854877_bab0e564b8d5_1934a6f6}
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
            Büdcə Yönümlü Hostellər
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Gənclər, səyyahlar və yeni dostluqlar axtaranlar üçün səmimi, təmiz və münasib qiymətli məkanlar
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!hostels || hostels.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <p className="text-muted-foreground text-xl">Hələ ki heç bir hostel əlavə edilməyib.</p>
          </div>
        ) : (
          hostels.map((t: any, i: number) => (
            <Link
              key={i}
              href={`/places/hostels/${t.id}`}
              className="bg-card group border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col"
            >
              <div className="h-48 relative overflow-hidden">
                <Image
                  unoptimized
                  src={getImageUrl(t, un_photo_1555854877_bab0e564b8d5_1934a6f6)}
                  alt={t.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                  {t.price_range || t.priceRange || 'Gündəlik'}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors">
                    <Backpack className="text-emerald-500 w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold">{t.title}</h3>
                </div>
                <p className="text-muted-foreground flex-1 mb-6 line-clamp-3">{t.short_description || t.subtitle || ''}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mt-auto">
                  Ətraflı Bax <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
