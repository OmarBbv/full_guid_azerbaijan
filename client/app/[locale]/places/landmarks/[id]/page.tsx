"use client";

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Castle, MapPin, Eye, ChevronLeft, Loader2, Camera, Calendar, Phone, Globe, Shield } from 'lucide-react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePlaceById } from '@/hooks/use-places';
import { getImageUrl } from '@/lib/utils';
import ImageLightbox from '@/components/shared/ImageLightbox';

export default function LandmarkDetailPage() {
  const params = useParams();
  const locale = useLocale();
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
        <h1 className="text-2xl font-bold">Məkan tapılmadı</h1>
        <Link href="/places/landmarks" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Məkanlara qayıt
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
            src={getImageUrl(landmark, 'https://images.unsplash.com/photo-1620310243292-0b29ce34f2d7?auto=format&fit=crop&q=80&w=2000')}
            alt={landmark.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/landmarks" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> Geri
          </Link>

          <div className="flex items-center gap-2 text-primary mb-4 bg-primary/20 backdrop-blur-md px-5 py-2 rounded-full border border-primary/30">
            <Castle className="w-5 h-5 text-primary-content" />
            <span className="font-bold text-white tracking-wider">TARİXİ MƏKAN</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
            {landmark.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {landmark.subtitle || ''}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">Məkan Haqqında</h2>
            <p className="text-lg leading-relaxed whitespace-pre-line text-foreground/80">
              {(landmark as any).detailed_description || landmark.short_description}
            </p>
          </section>

          {/* Qalereya */}
          {landmark.images && landmark.images.length > 0 && (
            <section>
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Camera className="w-8 h-8 text-primary" />
                Fotolar
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {landmark.images.map((img: any, i: number) => (
                  <div
                    key={img.id || i}
                    onClick={() => openLightbox(i)}
                    className="relative aspect-square rounded-3xl overflow-hidden group border border-border/10 shadow-sm cursor-pointer ring-offset-2 hover:ring-2 ring-primary transition-all"
                  >
                    <Image
                      src={img.url ? img.url.replace('localhost', '127.0.0.1') : ''}
                      alt={`Foto ${i + 1}`}
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
              images={landmark.images.map((img: any) => img.url ? img.url.replace('localhost', '127.0.0.1') : '')}
              onClose={() => setLightbox({ ...lightbox, isOpen: false })}
            />
          )}

          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="text-primary w-10 h-10" />
              <h2 className="text-2xl font-bold italic">Təhlükəsizlik və Tövsiyələr</h2>
            </div>
            <p className="text-foreground/70">
              Tarixi məkanları ziyarət edərkən abidələrə ehtiramla yanaşmağınız xahiş olunur. Turistik zonalar polis tərəfindən 24/7 mühafizə olunur. Ətraflı məlumat üçün rəsmi turizm mərkəzlərinə (TIC) yaxınlaşa bilərsiniz.
            </p>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border/10 rounded-[2rem] p-8 shadow-xl sticky top-28">
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Ünvan</p>
                  <p className="font-bold">{(landmark as any).address || landmark.city || 'Məlumat yoxdur'}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">İş Saatları</p>
                  <p className="font-bold">Hər gün, 09:00 - 18:00 (Təxmini)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Rəhbər Çəkiliş</p>
                  <p className="font-bold text-emerald-600">İcazə verilir</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-lg hover:opacity-90 transition-all shadow-lg active:scale-95">
                <MapPin className="w-6 h-6" />
                Xəritədə Yol Tap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
