"use client";

import { useParams } from 'next/navigation';
import { Bed, Star, MapPin, Phone, MessageCircle, ChevronLeft, Wifi, Coffee, Utensils, Waves, Globe, ShieldCheck, Loader2, Camera } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { usePlaceById } from '@/hooks/use-places';
import { Place } from '@/types/place';
import { getImageUrl } from '@/lib/utils';

export default function HotelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: hotel, isLoading } = usePlaceById(id);

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
        <h1 className="text-2xl font-bold">Otel tapılmadı</h1>
        <Link href="/places/hotels" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Otellərə qayıt
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
            <ChevronLeft className="w-5 h-5" /> Geri
          </Link>

          <div className="flex items-center gap-2 text-yellow-500 mb-4 bg-yellow-500/10 backdrop-blur-md px-4 py-1 rounded-full border border-yellow-500/20">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="font-bold">{Number(hotel.average_rating || 5).toFixed(1)}</span>
            <span className="text-white/60 text-sm">({hotel.review_count || 0} rəy)</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl uppercase italic">
            {hotel.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {hotel.subtitle || ''}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content - Main Info */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">Haqqında</h2>
            <p className="text-muted-foreground text-lg leading-relaxed italic whitespace-pre-line">
              {(hotel as any).detailed_description || hotel.short_description}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">İmkanlar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {((hotel as any).features || []).map((f: string, i: number) => (
                <div key={i} className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Bed className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm leading-tight">{f}</span>
                </div>
              ))}

              {(hotel as any).has_wifi && (
                <div className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10">
                  <Wifi className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500" />
                  <span className="font-bold text-sm">High-Speed Wi-Fi</span>
                </div>
              )}
              {((hotel as any).has_pool || (hotel as any).has_outdoor_seating) && (
                <div className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10">
                  <Waves className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500" />
                  <span className="font-bold text-sm">Hovuz & SPA</span>
                </div>
              )}
            </div>
          </section>

          {/* Qalereya */}
          {hotel.images && hotel.images.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Camera className="w-8 h-8 text-primary" />
                Qalereya
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {hotel.images.map((img: any, i: number) => (
                  <div key={img.id || i} className="relative aspect-square rounded-3xl overflow-hidden group border border-border/10 shadow-sm cursor-pointer ring-offset-2 hover:ring-2 ring-primary transition-all">
                    <Image
                      src={img.url ? img.url.replace('localhost', '127.0.0.1') : ''}
                      alt={`Qalereya şəkli ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 relative overflow-hidden">
            <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-primary/5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                Rezervasiya Zəmanəti
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                FGA üzərindən etdiyiniz bütün rezervasiyalar rəsmi tərəfdaşlarımız tərəfindən doğrulanır və sizə ən aşağı qiymət zəmanəti verilir.
              </p>
            </div>
          </section>
        </div>

        {/* Right Content - Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border/10 rounded-[2.5rem] p-8 shadow-2xl sticky top-28">
            <div className="mb-8">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Başlayan Qiymətlər</p>
              <p className="text-4xl font-black">{((hotel as any).price_range || (hotel as any).priceRange || 'Razılaşma yolu ilə').split(' - ')[0]} <span className="text-sm text-muted-foreground font-normal">{((hotel as any).price_range || (hotel as any).priceRange) ? '/ gecə' : ''}</span></p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Ünvan</p>
                  <p className="font-bold">{(hotel as any).address || hotel.city || 'Məlumat yoxdur'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Əlaqə</p>
                  <p className="font-bold">{(hotel as any).phone_number || (hotel as any).whatsapp_number || 'Məlumat yoxdur'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${((hotel as any).whatsapp_number || (hotel as any).phone_number || '').replace(/\D/g, '')}?text=Salam, ${hotel.title} otelində rezervasiya etmək istəyirəm.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                İndi Rezerv Et
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 w-full py-5 border border-border rounded-2xl font-bold hover:bg-secondary transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Sualım Var
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
