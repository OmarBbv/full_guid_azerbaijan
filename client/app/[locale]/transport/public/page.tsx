"use client";

import Image from "next/image";

import { Bus, Train, Route } from 'lucide-react';
import un_photo_1544620347_c4fd4a3d5957_7459f728 from "@/assets/unsplash/photo-1544620347-c4fd4a3d5957_7459f728.jpg";

export default function PublicTransportPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-teal-900/40 to-emerald-900/40 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={un_photo_1544620347_c4fd4a3d5957_7459f728}
            alt="İctimai Nəqliyyat"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.1)" }}
            priority
            unoptimized
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl border border-white/10">
            <Train className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            İctimai Nəqliyyat
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl drop-shadow-md">
            Sərfəli, ekoloji və rahat hərəkət vasitəsi kimi Bakının güclü inkişaf etmiş ictimai nəqliyyat şəbəkəsini kəşf edin.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/10 flex flex-col items-start hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
            <Train className="w-7 h-7 text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Bakı Metropoliteni</h2>
          <p className="text-muted-foreground leading-relaxed">
            Şərqin ən qədim və böyük metro sistemlərindən biridir. Həm memarlığı ilə (xüsusən Nizami, Gənclik stansiyaları), həm də şəhərin yükünü daşıması ilə məşhurdur. Gediş haqqını BakıKart vasitəsilə ödəmək mümkündür.
          </p>
        </div>

        <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/10 flex flex-col items-start hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
            <Bus className="w-7 h-7 text-blue-500" />
          </div>
          <h2 className="text-3xl font-bold mb-4">BakuBus & Marşrutlar</h2>
          <p className="text-muted-foreground leading-relaxed">
            Müasir avtobus parkı ilə xidmət edən BakuBus, kondisionerli və rahat nəqliyyat təklif edir. Bütün avtobuslarda ödəniş sadəcə BakıKart (və ya QR kod) vasitəsilə elektron aparılır, nəğd qəbul edilmir.
          </p>
        </div>

        <div className="md:col-span-2 bg-linear-to-r from-card to-secondary/50 p-8 rounded-3xl shadow-xl shadow-black/5 border border-border/10 flex flex-row items-center gap-8 mt-4 hover:shadow-2xl transition-all">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
            <Route className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">BakıKart Nədir?</h2>
            <p className="text-muted-foreground">
              BakıKart - bütün ictimai nəqliyyat vasitələrindən (metro və avtobuslar) vahid tariflə istifadə etməyə imkan verən universal ödəniş kartıdır. Metropoliten stansiyalarından və dayanacaqlardakı terminallardan asanlıqla əldə edə bilərsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
