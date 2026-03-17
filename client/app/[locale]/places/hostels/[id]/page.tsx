"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Backpack, MapPin, ChevronLeft, Wifi, Zap, Shield, Loader2, Camera, Star } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePlaceById } from '@/hooks/use-places';
import { getImageUrl } from '@/lib/utils';
import ImageLightbox from '@/components/shared/ImageLightbox';
import PlaceDetailSidebar from '@/components/shared/PlaceDetailSidebar';
import PlaceJsonLd from '@/components/shared/PlaceJsonLd';
import un_photo_1596394516093_501ba68a0ba6_629067c0 from "@/assets/unsplash/photo-1596394516093-501ba68a0ba6_629067c0.jpg";

export default function HostelDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('VenueDetail');
  const tCommon = useTranslations('Navbar');
  const tPlaces = useTranslations('PlacesPage');
  const id = params.id as string;
  const { data: hostel, isLoading } = usePlaceById(id, locale);

  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, index });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{t('not_found')}</h1>
        <Link href="/places/hostels" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> {t('back_to_hostels')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      <PlaceJsonLd place={hostel as any} type="Hostel" />
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-12" style={{ height: "70dvh", minHeight: 500 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(hostel, un_photo_1596394516093_501ba68a0ba6_629067c0)}
            alt={hostel.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/hostels" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> {tCommon('back')}
          </Link>

          <div className="flex items-center gap-2 text-emerald-400 mb-4 bg-emerald-400/10 backdrop-blur-md px-4 py-1 rounded-full border border-emerald-400/20">
            <Star className="w-4 h-4 fill-emerald-400" />
            <span className="font-bold">{Number(hostel.average_rating || 5).toFixed(1)}</span>
            <span className="text-white/60 text-sm">({hostel.review_count || 0} {tPlaces('reviews')})</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
            {hostel.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {hostel.subtitle || ''}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">{t('tab_about')}</h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {hostel.detailed_description || hostel.short_description}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">{t('what_we_offer')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {((hostel as any).features || []).map((f: string, i: number) => (
                <div key={i} className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10 hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm leading-tight">{f}</span>
                </div>
              ))}

              {(hostel as any).has_wifi && (
                <div className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Wifi className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm">{t('fast_internet')}</span>
                </div>
              )}
            </div>
          </section>

          {/* Qalereya */}
          {hostel.images && hostel.images.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Camera className="w-8 h-8 text-emerald-600" />
                {t('tab_gallery')}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {hostel.images.map((img: any, i: number) => (
                  <div
                    key={img.id || i}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-square rounded-3xl overflow-hidden group border border-border/10 shadow-sm cursor-pointer ring-offset-2 hover:ring-2 ring-emerald-500 transition-all"
                  >
                    <Image
                      src={img.url ? img.url.replace('localhost', '127.0.0.1') : ''}
                      alt={`${t('gallery_photo')} ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {hostel.images && (
            <ImageLightbox
              isOpen={lightbox.isOpen}
              initialIndex={lightbox.index}
              images={hostel.images.map((img: any) => img.url ? img.url.replace('localhost', '127.0.0.1') : '')}
              onClose={() => setLightbox({ ...lightbox, isOpen: false })}
            />
          )}

          <section className="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/10">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="text-emerald-500 w-10 h-10" />
              <h2 className="text-2xl font-bold italic">{t('safety_guarantee')}</h2>
            </div>
            <p className="text-muted-foreground">
              {t('hostel_safety_desc')}
            </p>
          </section>
        </div>

        {/* Right Sidebar */}
        <div>
          <PlaceDetailSidebar place={hostel} />
        </div>
      </div>
    </div>
  );
}
