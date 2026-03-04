"use client";

import Image from "next/image";

import { Car, Star, Navigation2, Zap } from 'lucide-react';

export default function TaxiServicesPage() {
  return (
    <div className="bg-background pb-20">
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-yellow-500/30 to-black/60 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1549411939-994df7c024d2?q=80&w=2070&auto=format&fit=crop"
            alt="Taksi"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.2)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-yellow-400 backdrop-blur-md flex items-center justify-center mb-6 text-black shadow-lg">
            <Car className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Taksi Xidmətləri
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Bakı daxilində rahat və sürətli hərəkət üçün ən optimal seçimlər
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Uber / Bolt / YANGO",
            desc: "Mobil tətbiqlə işləyən ən populyar və ucuz xidmətlərdir. Avtomobili izləyə bilər, əvvəlcədən qiyməti görə bilərsiniz.",
            icon: <Zap className="text-yellow-500 w-8 h-8" />,
            color: "from-yellow-50/50 to-white dark:from-yellow-900/10 dark:to-background border-yellow-200 dark:border-yellow-900/30"
          },
          {
            title: "Baku Taxi (London Taksi)",
            desc: "Bənövşəyi rəngli rəsmi London tipli taksilərdir. Taksimetrlə hesablanır və klassik şəhər mənzərəsinin bir hissəsidir.",
            icon: <Star className="text-purple-500 w-8 h-8" />,
            color: "from-purple-50/50 to-white dark:from-purple-900/10 dark:to-background border-purple-200 dark:border-purple-900/30"
          },
          {
            title: "189 TAXI Xidməti",
            desc: "Ölkənin ən etibarlı dispetçer xidmətlərindən biridir. Həm zəng edərək, həm də mobil tətbiq vasitəsilə sifariş etmək mümkündür.",
            icon: <Navigation2 className="text-blue-500 w-8 h-8" />,
            color: "from-blue-50/50 to-white dark:from-blue-900/10 dark:to-background border-blue-200 dark:border-blue-900/30"
          }
        ].map((t, i) => (
          <div key={i} className={`bg-linear-to-br ${t.color} border p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300`}>
            <div className="mb-6">{t.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{t.title}</h3>
            <p className="text-muted-foreground">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
