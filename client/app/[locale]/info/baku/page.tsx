"use client";

import { useTranslations } from 'next-intl';
import { Info, Map as MapIcon, Compass, Star } from 'lucide-react';
import Image from 'next/image';

export default function BakuInfoPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-blue-900/40 to-purple-900/40 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1606775791264-b333a5cf05cc?q=80&w=2070&auto=format&fit=crop"
            alt="Bakı"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.1)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6">
            <Compass className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Azərbaycan & Bakı
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Odlar Yurdunun qəlbi olan Bakı və Azərbaycanın zəngin mədəniyyəti, tarixi və modern həyatı haqqında hər şey.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/10 hover:shadow-2xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
            <Star className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Tarixi Mədəniyyət</h2>
          <p className="text-muted-foreground leading-relaxed">
            Azərbaycan qədim mənbələrə və zəngin tarixi köklərə sahibdir. İpək Yolunun önəmli dayanacaqlarından biri kimi uzun əsrlər boyu Şərqlə Qərbi birləşdirmişdir. Qədim Qobustan qayaları və Möminə Xatun türbəsi bu zənginliyin sadəcə başlanğıcıdır.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/10 hover:shadow-2xl transition-all">
          <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
            <MapIcon className="w-6 h-6 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Müasir Bakı</h2>
          <p className="text-muted-foreground leading-relaxed">
            Bakı özündə Qədim İçərişəhərin qala divarları ilə ultramodern Alov Qüllələrini mükəmməl uyğunlaşdıran nadir şəhərlərdəndir. Şüşə və poladdan hörülən göydələnlərlə, tarixi sarayların vəhdəti buranı əvəzolunmaz edir.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-10">
        <div className="bg-linear-to-br from-primary to-[#6f5cf6] p-10 rounded-3xl text-white shadow-2xl relative overflow-hidden">
          <Info className="w-64 h-64 absolute -right-10 -bottom-10 opacity-10" />
          <h2 className="text-3xl font-bold mb-4 relative z-10">Ziyarətçilər üçün vacib faktlar</h2>
          <ul className="text-white/90 space-y-3 relative z-10 text-lg">
            <li>• <strong>Dil:</strong> Azərbaycan dili (Rus və İngilis dilləri geniş yayılıb)</li>
            <li>• <strong>Valyuta:</strong> Azərbaycan Manatı (AZN)</li>
            <li>• <strong>Saat Qurşağı:</strong> GMT+4</li>
            <li>• <strong>İqlim:</strong> Ölkədə mövcud 11 iqlim tipindən 9-una rast gəlinir.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
