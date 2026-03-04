"use client";

import Image from "next/image";

import { Plane, Compass, AlertCircle, Calendar } from 'lucide-react';

export default function AirportInfoPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-br from-indigo-900/40 to-blue-900/40 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?q=80&w=2070&auto=format&fit=crop"
            alt="Hava Limanı"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.1)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6 shadow-2xl">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Hava Limanı <span className="text-blue-300">Bələdçisi</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-md">
            Heydər Əliyev Beynəlxalq Aeroportu (GYD) - MDB məkanının və Şərqin ən qabaqcıl, müasir hava limanlarından biridir.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: <Compass className="w-6 h-6 text-indigo-500" />,
            title: "Təyinat & İstiqamətləndirmə",
            description: "Aeroport şəhərin mərkəzindən təxminən 20 km şərqdə yerləşir. İstər taksi, istərsə də ekspress avtobuslarla mərkəzə 25-30 dəqiqə ərzində rahat çata bilərsiniz.",
            bg: "bg-indigo-500/10"
          },
          {
            icon: <Calendar className="w-6 h-6 text-sky-500" />,
            title: "Aeroport Ekspress (H1)",
            description: "Hər 30 dəqiqədən bir uçuşların qrafikinə uyğun hərəkət edir. Birbaşa Koroğlu Metrosuna və 28 May mərkəzi stansiyasına sərnişin daşıyır.",
            bg: "bg-sky-500/10"
          },
          {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            title: "Əhəmiyyətli məlumatlar",
            description: "Duty Free mağazaları, VİP zallar, pulsuz Wi-Fi xidməti (Baku Airport Free Wi-Fi) bütün sərnişinlərə təqdim olunur. Rəsmi taksilərdən (Baku Taxi) istifadə etmək daha güvənlidir.",
            bg: "bg-red-500/10"
          },
        ].map((item, index) => (
          <div key={index} className="bg-card text-card-foreground p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/10 hover:-translate-y-1 transition-transform">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
