"use client";

import { Castle, Camera, Eye, MapPin, Loader2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { usePlacesByType } from '@/hooks/use-places';
import { getImageUrl } from '@/lib/utils';
import { useParams } from 'next/navigation';

export default function LandmarksPage() {
  const { locale } = useParams<{ locale: string }>();
  const { data: landmarks, isLoading } = usePlacesByType('landmark', locale);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-transparent to-black/30" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop"
            alt="Landmarks"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6">
            <Castle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Tarixi və Turistik Məkanlar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md max-w-3xl">
            Azərbaycanın qızıl keçmişini kəşf edin. Bakının qədimliyi, Mərdəkan qalaları, Qobustan petroqlifləri...
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between border-b pb-6 mb-10">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Camera className="w-8 h-8 text-primary" />
            Seçilmiş Məkanlar
          </h2>
          <Link href="/mekanlar" className="text-primary font-semibold hover:underline">Hamısına bax &rarr;</Link>
        </div>

        {(!landmarks || landmarks.length === 0) ? (
          <div className="text-center py-20 text-muted-foreground">
            <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">Hələ ki, heç bir tarixi məkan əlavə edilməyib.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landmarks.map((item, idx) => (
              <Link
                key={item.id || idx}
                href={`/places/landmarks/${item.id}`}
                className="group relative bg-card rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border/10 cursor-pointer flex flex-col active:scale-[0.98] transition-all"
              >
                <div className="w-full h-64 relative overflow-hidden">
                  <Image src={getImageUrl(item, 'https://images.unsplash.com/photo-1620310243292-0b29ce34f2d7?auto=format&fit=crop&q=80&w=800')} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h3 className="text-2xl font-black text-white drop-shadow-md">{item.title}</h3>
                    {item.city && <p className="text-white/80 text-sm font-medium flex items-center gap-1"><MapPin className="w-3 h-3" />{item.city}</p>}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-muted-foreground line-clamp-3">{item.short_description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
                    <span>Ətraflı oxu</span>
                    <Eye className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
