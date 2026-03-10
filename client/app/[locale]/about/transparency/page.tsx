"use client";

import Image from "next/image";

import { Eye, ShieldCheck, Flag } from 'lucide-react';
import un_photo_1451187580459_43490279c0fa_4b267726 from "@/assets/unsplash/photo-1451187580459-43490279c0fa_4b267726.jpg";

export default function TransparencyPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/60 via-transparent to-black/20" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={un_photo_1451187580459_43490279c0fa_4b267726.src}
            alt="Transparency Background"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl border border-white/20">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Şəffaflıq & Çərçivə
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Heç bir gizli manipulyasiyaya yer yoxdur
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-card p-10 rounded-3xl border border-border/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />

          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-primary" />
            Açıq Məlumat Siyasəti
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Bizim üçün hər zaman istifadəçi etibarı 1-ci yerdə gəlir. Reklam əsaslı yerləşdirilən vizuallar, məqalələr və pullu iş birliyi nəticəsində əlavə edilən "Sponsorlu" və ya "Önə Çıxarılan" (Featured) məkanlar istifadəçilərə xüsusi bir nişanla göstərilir ki, heç bir çaşqınlıq yaranmasın.
          </p>

          <h2 className="text-2xl font-bold mb-6 mt-12 flex items-center gap-3">
            <Flag className="w-8 h-8 text-rose-500" />
            Fəaliyyət Çərçivəsi
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Full Guide Azerbaijan komandası olaraq qanunsuz obyektlərin, etik çərçivələrdən və qanunvericilikdən kənar fəaliyyət göstərən məkanların reklamına və qeydiyyatına qəti icazə verilmir. İcazəsiz toplanan istifadəçi datası satılmır və yüksək təhlükəsizlik alqoritmləri ilə şifrələnərək saxlanılır.
          </p>
        </div>
      </div>
    </div>
  );
}
