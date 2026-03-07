"use client";

import { useParams } from 'next/navigation';
import { UtensilsCrossed, Clock, MapPin, Phone, MessageCircle, ChevronLeft, Star, Wifi, ParkingCircle, CreditCard, Music, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { usePlaceById } from '@/hooks/use-places';
import { Place } from '@/types/place';
import { getImageUrl } from '@/lib/utils';

export default function RestaurantDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: restaurant, isLoading } = usePlaceById(id);

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
        <h1 className="text-2xl font-bold">Məkan tapılmadı</h1>
        <Link href="/places/restaurants" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Restoranlara qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
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
            <ChevronLeft className="w-5 h-5" /> Geri
          </Link>

          <div className="flex items-center gap-2 text-orange-400 mb-4 bg-orange-400/10 backdrop-blur-md px-4 py-1 rounded-full border border-orange-400/20">
            <Star className="w-4 h-4 fill-orange-400" />
            <span className="font-bold">{Number(restaurant.average_rating || 0).toFixed(1)}</span>
            <span className="text-white/60 text-sm">({restaurant.review_count || 0} rəy)</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
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
            <h2 className="text-3xl font-black mb-6">Haqqında</h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {(restaurant as any).detailed_description || restaurant.short_description}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">Xüsusiyyətlər</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Dynamic Features from API */}
              {((restaurant as any).features || []).map((f: string, i: number) => (
                <div key={i} className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm tracking-tight">{f}</span>
                </div>
              ))}

              {/* Boolean features */}
              {(restaurant as any).has_wifi && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Wifi className="w-8 h-8 rounded-lg bg-emerald-500/10 p-1.5 text-emerald-500" />
                  <span className="font-bold text-sm">Pulsuz Wi-Fi</span>
                </div>
              )}
              {(restaurant as any).has_parking && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <ParkingCircle className="w-8 h-8 rounded-lg bg-blue-500/10 p-1.5 text-blue-500" />
                  <span className="font-bold text-sm">Dayanacaq</span>
                </div>
              )}
              {(restaurant as any).accepts_cards && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <CreditCard className="w-8 h-8 rounded-lg bg-purple-500/10 p-1.5 text-purple-500" />
                  <span className="font-bold text-sm">Kartla ödəniş</span>
                </div>
              )}
              {(restaurant as any).has_live_music && (
                <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/10">
                  <Music className="w-8 h-8 rounded-lg bg-amber-500/10 p-1.5 text-amber-500" />
                  <span className="font-bold text-sm">Canlı musiqi</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Content - Sidebar / Actions */}
        <div className="space-y-8">
          <div className="bg-card border border-border/10 rounded-3xl p-8 shadow-xl sticky top-28">
            <h3 className="text-2xl font-bold mb-6">Məkan Məlumatı</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 dark:bg-orange-950/30 p-3 rounded-xl text-orange-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Ünvan</p>
                  <p className="font-bold leading-tight">{(restaurant as any).address || restaurant.city || 'Məlumat yoxdur'}</p>
                </div>
              </div>

              {/* Working Hours (optional, backend dependent) */}
              {((restaurant as any).working_hours || (restaurant as any).workingHours) && (
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-xl text-blue-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">İş Saatları</p>
                    <p className="font-bold">{(restaurant as any).working_hours || (restaurant as any).workingHours}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-xl text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-1">Telefon</p>
                  <p className="font-bold">{(restaurant as any).phone_number || (restaurant as any).whatsapp_number || 'Məlumat yoxdur'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${((restaurant as any).whatsapp_number || (restaurant as any).phone_number || '').replace(/\D/g, '')}?text=Salam, ${restaurant.title} üçün rezervasiya etmək istəyirəm.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-[#25D366]/20 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                WhatsApp ilə Sifariş
              </a>
              <button className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                Zəng Et
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
