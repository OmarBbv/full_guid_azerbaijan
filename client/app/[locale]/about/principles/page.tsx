"use client";

import Image from "next/image";

import { CheckCircle2, HeartHandshake, Scale, Target } from 'lucide-react';

export default function PrinciplesPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-zinc-900/80 to-slate-900/80 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=2070&auto=format&fit=crop"
            alt="Prinsiplər"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.1)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl border border-white/20">
            <Scale className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Platformanın Prinsipləri
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Fəaliyyətimizin əsasını təşkil edən qırılmaz dəyərlər.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-blue-500" />,
              title: "Obyektivlik",
              desc: "Bizimlə əməkdaşlıq edib-etməməsindən asılı olmayaraq, hər bir tarixi və turistik məkan platformada obyektiv şəkildə əksini tapır."
            },
            {
              icon: <HeartHandshake className="w-8 h-8 text-rose-500" />,
              title: "İstifadəçi Yönümlülük",
              desc: "Hər şeydən öncə ziyarətçilərin ehtiyac və arzularını nəzərə alır, ən rahat istifadəçi təcrübəsini (UX) təmin edirik."
            },
            {
              icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
              title: "Dəqiqlik",
              desc: "Məkanların, xidmətlərin mövcudluğu və qiymət spektrləri barədə dövri olaraq məlumat yeniləməsi həyata keçirilir."
            }
          ].map((p, i) => (
            <div key={i} className="bg-card p-10 rounded-3xl border border-border/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-all">
              <div className="bg-secondary p-4 rounded-2xl inline-block mb-6">
                {p.icon}
              </div>
              <h2 className="text-2xl font-bold mb-4">{p.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
