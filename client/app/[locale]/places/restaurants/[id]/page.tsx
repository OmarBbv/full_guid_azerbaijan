"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { UtensilsCrossed, ChevronLeft, Star, Wifi, ParkingCircle, CreditCard, Music, Loader2, Waves, Bed, Camera, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useRestaurantById, useRestaurantBySlug } from '@/hooks/use-restaurants';
import { getImageUrl } from '@/lib/utils';
import ImageLightbox from '@/components/shared/ImageLightbox';
import PlaceDetailSidebar from '@/components/shared/PlaceDetailSidebar';
import PlaceJsonLd from '@/components/shared/PlaceJsonLd';

export default function RestaurantDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('VenueDetail');
  const tCommon = useTranslations('Navbar');
  const tPlaces = useTranslations('PlacesPage');
  const idValue = params.id as string;

  const isIdUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idValue);
  
  const idQuery = useRestaurantById(isIdUuid ? idValue : '');
  const slugQuery = useRestaurantBySlug(!isIdUuid ? idValue : '');
  
  const { data: restaurant, isLoading } = isIdUuid ? idQuery : slugQuery;

  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, index });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{t('not_found')}</h1>
        <Link href="/places/restaurants" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> {t('back_to_restaurants')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      <PlaceJsonLd place={restaurant as any} type="Restaurant" />
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-12" style={{ height: "70dvh", minHeight: 500 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(restaurant)}
            alt={restaurant.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/restaurants" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> {tCommon('back')}
          </Link>

          <div className="flex items-center gap-2 text-orange-400 mb-4 bg-orange-400/10 backdrop-blur-md px-4 py-1 rounded-full border border-orange-400/20">
            <Star className="w-4 h-4 fill-orange-400" />
            <span className="font-bold">{Number(restaurant.average_rating || 0).toFixed(1)}</span>
            <span className="text-white/60 text-sm">({restaurant.review_count || 0} {tPlaces('reviews')})</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl italic">
            {restaurant.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {restaurant.subtitle || ''}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content - Main Info */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">{t('tab_about')}</h2>
            <div className="space-y-6">
              {restaurant.short_description && (
                <p className="text-xl font-bold text-foreground leading-relaxed italic border-l-4 border-primary pl-6">
                  {restaurant.short_description}
                </p>
              )}
              {restaurant.detailed_description && (
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                  {restaurant.detailed_description}
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">{t('features')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Dynamic Features from API */}
              {((restaurant as any).features || []).map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{f}</span>
                </div>
              ))}

              {/* Restaurant Specific Info */}
              {(restaurant as any).cuisine_type && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Mətbəx</span>
                    <span className="font-bold text-sm tracking-tight">{(restaurant as any).cuisine_type}</span>
                  </div>
                </div>
              )}

              {(restaurant as any).dining_style && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Stil</span>
                    <span className="font-bold text-sm tracking-tight">{(restaurant as any).dining_style}</span>
                  </div>
                </div>
              )}

              {(restaurant as any).avg_bill_per_person_azn > 0 && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                    ₼
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Ortalama Hesab</span>
                    <span className="font-bold text-sm tracking-tight">{(restaurant as any).avg_bill_per_person_azn} AZN</span>
                  </div>
                </div>
              )}

              {/* Boolean features */}
              {(restaurant as any).has_wifi && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Wifi className="w-8 h-8 rounded-lg bg-emerald-500/10 p-1.5 text-emerald-500" />
                  <span className="font-bold text-sm">{t('free_wifi')}</span>
                </div>
              )}
              {(restaurant as any).has_parking && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <ParkingCircle className="w-8 h-8 rounded-lg bg-blue-500/10 p-1.5 text-blue-500" />
                  <span className="font-bold text-sm">{t('parking')}</span>
                </div>
              )}
              {(restaurant as any).accepts_cards && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <CreditCard className="w-8 h-8 rounded-lg bg-purple-500/10 p-1.5 text-purple-500" />
                  <span className="font-bold text-sm">{t('card_payment')}</span>
                </div>
              )}
              {(restaurant as any).has_live_music && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Music className="w-8 h-8 rounded-lg bg-amber-500/10 p-1.5 text-amber-500" />
                  <span className="font-bold text-sm">{t('live_music')}</span>
                </div>
              )}
              {(restaurant as any).has_outdoor_seating && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500">
                    <Waves className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Açıq oturma yeri</span>
                </div>
              )}
              {(restaurant as any).has_private_rooms && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                    <Bed className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm">Xüsusi otaqlar</span>
                </div>
              )}
            </div>
          </section>

          {/* Qalereya */}
          {restaurant.images && restaurant.images.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Camera className="w-8 h-8 text-primary" />
                {t('tab_gallery')}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurant.images.map((img: any, i: number) => (
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

          {restaurant.images && (
            <ImageLightbox
              isOpen={lightbox.isOpen}
              initialIndex={lightbox.index}
              images={restaurant.images.map((img: any) => img.url ? img.url.replace('localhost', '127.0.0.1') : '')}
              onClose={() => setLightbox({ ...lightbox, isOpen: false })}
            />
          )}
        </div>

        <div>
          <PlaceDetailSidebar place={restaurant} />
        </div>
      </div>
    </div>
  );
}
