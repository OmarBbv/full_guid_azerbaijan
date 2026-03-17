"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Castle, MapPin, ChevronLeft, Loader2, Camera, Shield } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePlaceById } from '@/hooks/use-places';
import { getImageUrl } from '@/lib/utils';
import ImageLightbox from '@/components/shared/ImageLightbox';
import PlaceDetailSidebar from '@/components/shared/PlaceDetailSidebar';
import PlaceJsonLd from '@/components/shared/PlaceJsonLd';

export default function LandmarkDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('VenueDetail');
  const tCommon = useTranslations('Navbar');
  const id = params.id as string;
  const { data: landmark, isLoading } = usePlaceById(id, locale);

  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, index });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!landmark) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{t('not_found')}</h1>
        <Link href="/places/landmarks" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> {t('back_to_landmarks')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      <PlaceJsonLd place={landmark} type="TouristAttraction" />
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-12" style={{ height: "70dvh", minHeight: 500 }}>
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(landmark, 'https://images.unsplash.com/photo-1620310243292-0b29ce34f2d7?auto=format&fit=crop&q=80&w=2000')}
            alt={landmark.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/landmarks" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> {tCommon('back')}
          </Link>
          <div className="flex items-center gap-2 text-primary mb-4 bg-primary/20 backdrop-blur-md px-5 py-2 rounded-full border border-primary/30">
            <Castle className="w-5 h-5 text-primary-content" />
            <span className="font-bold text-white tracking-wider">{t('historical_landmark')}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
            {landmark.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {landmark.subtitle || ''}
          </p>
          {landmark.city && (
            <p className="text-white/60 flex items-center gap-1 mt-2 text-sm">
              <MapPin className="w-4 h-4" /> {landmark.city}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">{t('about_venue')}</h2>
            <p className="text-lg leading-relaxed whitespace-pre-line text-foreground/80">
              {landmark.detailed_description || landmark.short_description}
            </p>
          </section>

          {/* Gallery */}
          {landmark.images && landmark.images.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Camera className="w-8 h-8 text-primary" />
                {t('tab_gallery')}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {landmark.images.map((img, i) => (
                  <div
                    key={img.id || i}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-square rounded-3xl overflow-hidden group border border-border/10 shadow-sm cursor-pointer ring-offset-2 hover:ring-2 ring-primary transition-all"
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

          {landmark.images && (
            <ImageLightbox
              isOpen={lightbox.isOpen}
              initialIndex={lightbox.index}
              images={landmark.images.map((img) => img.url ? img.url.replace('localhost', '127.0.0.1') : '')}
              onClose={() => setLightbox({ ...lightbox, isOpen: false })}
            />
          )}

          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="text-primary w-10 h-10" />
              <h2 className="text-2xl font-bold italic">{t('safety_recommendations')}</h2>
            </div>
            <p className="text-foreground/70">
              {t('landmark_safety_desc')}
            </p>
          </section>
        </div>

        {/* Right Sidebar — WhatsApp, Social Media, Map */}
        <div>
          <PlaceDetailSidebar place={landmark} />
        </div>
      </div>
    </div>
  );
}
