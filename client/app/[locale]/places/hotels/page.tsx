"use client";

import { Bed, Star, MapPin, Wifi, Coffee, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function HotelsPage() {
  const hotels = [
    {
      id: "fairmont-baku",
      title: "Fairmont Baku, Flame Towers",
      desc: "Bakının simvolu olan Alov Qüllələrində yerləşən 5 ulduzlu otel. Bütün şəhərə və Xəzər dənizinə panoramik mənzərə təklif edir.",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d404b8df?auto=format&fit=crop&q=80&w=1000",
      stars: 5,
      price: "$$$$"
    },
    {
      id: "four-seasons-baku",
      title: "Four Seasons Hotel Baku",
      desc: "İçərişəhərin kənarında, Bulvarın düz qarşısında yerləşən klassik və Avropa memarlığına malik olan dünyanın ən elit otel şəbəkələrindən biri.",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1000",
      stars: 5,
      price: "$$$$"
    }
  ];

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-blue-900/40 to-slate-900/50 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
            alt="Otellər"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.2)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-white shadow-xl border border-white/20">
            <Bed className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Lüks Otellər & Rezortlar
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Xəzərin sahilində, şəhərin qəlbində və əsrarəngiz dağların ətəyində yerləşən ən premium qonaqlama imkanları
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {hotels.map((t, i) => (
          <Link
            key={i}
            href={`/places/hotels/${t.id}`}
            className="flex flex-col lg:flex-row bg-card border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
              <Image src={t.image} alt={t.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-8 lg:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-3">{t.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">{t.desc}</p>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4" />
                  <Coffee className="w-4 h-4" />
                </div>
                <div className="ml-auto font-black text-foreground flex items-center gap-2">
                  {t.price} <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
