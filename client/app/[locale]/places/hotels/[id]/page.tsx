"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Bed, Star, ChevronLeft, Wifi, Waves, Globe, ShieldCheck, Loader2, Camera, ParkingCircle, CreditCard, Dumbbell, Utensils, Zap, Users, CheckCircle2, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useHotelById, useHotelBySlug } from '@/hooks/use-hotels';
import { getImageUrl } from '@/lib/utils';
import ImageLightbox from '@/components/shared/ImageLightbox';
import PlaceDetailSidebar from '@/components/shared/PlaceDetailSidebar';
import PlaceJsonLd from '@/components/shared/PlaceJsonLd';

export default function HotelDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations('VenueDetail');
  const tCommon = useTranslations('Navbar');
  const tPlaces = useTranslations('PlacesPage');
  const idValue = params.id as string;

  const isIdUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idValue);
  
  const idQuery = useHotelById(isIdUuid ? idValue : '');
  const slugQuery = useHotelBySlug(!isIdUuid ? idValue : '');
  
  const { data: hotel, isLoading } = isIdUuid ? idQuery : slugQuery;

  const [lightbox, setLightbox] = useState({ isOpen: false, index: 0 });

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, index });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">{t('not_found')}</h1>
        <Link href="/places/hotels" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> {t('back_to_hotels')}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      <PlaceJsonLd place={hotel as any} type="Hotel" />
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-12" style={{ height: "70dvh", minHeight: 500 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImageUrl(hotel)}
            alt={hotel.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/hotels" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> {tCommon('back')}
          </Link>

          <div className="flex items-center gap-2 text-yellow-500 mb-4 bg-yellow-500/10 backdrop-blur-md px-4 py-1 rounded-full border border-yellow-500/20">
            <div className="flex">
              {[...Array((hotel as any).star_rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-500" />
              ))}
            </div>
            <span className="font-bold">{(hotel as any).star_rating || 5}.0</span>
            <span className="text-white/60 text-sm">({hotel.review_count || 0} {tPlaces('reviews')})</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl uppercase italic">
            {hotel.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {hotel.subtitle || (hotel as any).hotel_type || ''}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content - Main Info */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">{t('tab_about')}</h2>
            <div className="space-y-6 italic">
              {hotel.short_description && (
                <p className="text-xl font-bold text-foreground leading-relaxed border-l-4 border-primary pl-6">
                   {hotel.short_description}
                </p>
              )}
              {hotel.detailed_description && (
                <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                  {hotel.detailed_description}
                </p>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">{t('what_we_offer')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Hotel Specific Info */}
              {(hotel as any).price_from_azn > 0 && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xs">
                    ₼
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Qiymət</span>
                    <span className="font-bold text-sm tracking-tight">{(hotel as any).price_from_azn} AZN - dan</span>
                  </div>
                </div>
              )}

              {(hotel as any).total_rooms > 0 && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold leading-none mb-1">Otaq sayı</span>
                    <span className="font-bold text-sm tracking-tight">{(hotel as any).total_rooms} otaq</span>
                  </div>
                </div>
              )}

              {/* Boolean features */}
              {(hotel as any).has_wifi && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Wifi className="w-8 h-8 rounded-lg bg-emerald-500/10 p-1.5 text-emerald-500" />
                  <span className="font-bold text-sm">{t('fast_internet')}</span>
                </div>
              )}
              {(hotel as any).has_parking && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <ParkingCircle className="w-8 h-8 rounded-lg bg-blue-500/10 p-1.5 text-blue-500" />
                  <span className="font-bold text-sm">{t('parking')}</span>
                </div>
              )}
              {(hotel as any).has_pool && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Waves className="w-8 h-8 rounded-lg bg-blue-400/10 p-1.5 text-blue-400" />
                  <span className="font-bold text-sm">Hovuz</span>
                </div>
              )}
              {(hotel as any).has_spa && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Zap className="w-8 h-8 rounded-lg bg-purple-500/10 p-1.5 text-purple-500" />
                  <span className="font-bold text-sm">SPA & Wellness</span>
                </div>
              )}
              {(hotel as any).has_gym && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Dumbbell className="w-8 h-8 rounded-lg bg-orange-500/10 p-1.5 text-orange-500" />
                  <span className="font-bold text-sm">İdman zalı</span>
                </div>
              )}
              {(hotel as any).has_restaurant && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Utensils className="w-8 h-8 rounded-lg bg-amber-500/10 p-1.5 text-amber-500" />
                  <span className="font-bold text-sm">Restoran</span>
                </div>
              )}
              {(hotel as any).accepts_cards && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <CreditCard className="w-8 h-8 rounded-lg bg-indigo-500/10 p-1.5 text-indigo-500" />
                  <span className="font-bold text-sm">{t('card_payment')}</span>
                </div>
              )}
              {(hotel as any).pets_allowed && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Users className="w-8 h-8 rounded-lg bg-rose-500/10 p-1.5 text-rose-500" />
                  <span className="font-bold text-sm">Ev heyvanları</span>
                </div>
              )}

              {/* Dynamic Features from API */}
              {((hotel as any).features || []).map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{f}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Qalereya */}
          {hotel.images && hotel.images.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Camera className="w-8 h-8 text-primary" />
                {t('tab_gallery')}
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.images.map((img: any, i: number) => (
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

          {hotel.images && (
            <ImageLightbox
              isOpen={lightbox.isOpen}
              initialIndex={lightbox.index}
              images={hotel.images.map((img: any) => img.url ? img.url.replace('localhost', '127.0.0.1') : '')}
              onClose={() => setLightbox({ ...lightbox, isOpen: false })}
            />
          )}

          <section className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 relative overflow-hidden">
            <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-primary/5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                {t('reservation_guarantee')}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {t('hotel_reservation_desc')}
              </p>
            </div>
          </section>
        </div>

        <div>
           <PlaceDetailSidebar place={hotel} />
        </div>
      </div>
    </div>
  );
}
