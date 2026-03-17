"use client";

import { useTranslations } from 'next-intl';
import { Plane, Compass, AlertCircle, Calendar } from 'lucide-react';
import Image from "next/image";
import un_photo_1570710891163_6d3b5c47248b_24bb943f from "@/assets/unsplash/photo-1570710891163-6d3b5c47248b_24bb943f.jpg";

export default function AirportInfoPage() {
  const t = useTranslations('AirportInfo');

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
            src={un_photo_1570710891163_6d3b5c47248b_24bb943f.src}
            alt={t('title')}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.1)" }}
            priority
            unoptimized
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6 shadow-2xl">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            {t('title')} <span className="text-blue-300">{t('title_accent')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-2xl drop-shadow-md">
            {t('hero_desc')}
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            icon: <Compass className="w-6 h-6 text-indigo-500" />,
            title: t('cards.arrival_title'),
            description: t('cards.arrival_desc'),
            bg: "bg-indigo-500/10"
          },
          {
            icon: <Calendar className="w-6 h-6 text-sky-500" />,
            title: t('cards.express_title'),
            description: t('cards.express_desc'),
            bg: "bg-sky-500/10"
          },
          {
            icon: <AlertCircle className="w-6 h-6 text-red-500" />,
            title: t('cards.important_title'),
            description: t('cards.important_desc'),
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
