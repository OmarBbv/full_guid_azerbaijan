"use client";

import { Castle, Camera, Eye } from 'lucide-react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function LandmarksPage() {
  const landmarks = [
    {
      id: "icharisheher",
      title: "İçərişəhər",
      desc: "12-ci əsrə aid Qız Qalası və Şirvanşahlar Sarayı kimi unikal memarlıq abidələri ilə UNESCO siyahısındadır.",
      image: "https://images.unsplash.com/photo-1620310243292-0b29ce34f2d7?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "heydar-aliyev-center",
      title: "Heydər Əliyev Mərkəzi",
      desc: "Zaha Hadid tərəfindən layihələndirilmiş dünya memarlığının möhtəşəm incisi, innovasiya və sənət kompleksi.",
      image: "https://images.unsplash.com/photo-1608688404284-82ea4ba6644f?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: "gobustan",
      title: "Qobustan Milli Parkı",
      desc: "Qədim insanların həyat tərzini, daş devrini əks etdirən minlərlə qayaüstü rəsm (petroqliflər).",
      image: "https://images.unsplash.com/photo-1614088037466-2616f73db915?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-t from-black/50 to-transparent mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1606775791264-b333a5cf05cc?q=80&w=2070&auto=format&fit=crop"
            alt="Məkanlar"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.1)" }}
            priority
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {landmarks.map((item, idx) => (
            <Link
              key={idx}
              href={`/places/landmarks/${item.id}`}
              className="group relative bg-card rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border/10 cursor-pointer flex flex-col active:scale-[0.98] transition-all"
            >
              <div className="w-full h-64 relative overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent z-10" />
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <h3 className="text-2xl font-black text-white drop-shadow-md">{item.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground line-clamp-3">{item.desc}</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-primary">
                  <span>Ətraflı oxu</span>
                  <Eye className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
