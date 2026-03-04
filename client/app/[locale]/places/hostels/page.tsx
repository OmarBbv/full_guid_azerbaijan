"use client";

import { Users, Backpack, MapPin, PiggyBank, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function HostelsPage() {
  const hostels = [
    {
      id: "sahil-hostel",
      title: "Sahil Hostel & Hotel",
      desc: "Dəniz kənarına və Tarqovıy küçəsinə çox yaxın məsafədə, çox təmiz və dostcanlı mühit tapan bir hosterldir.",
      icon: <PiggyBank className="text-emerald-500 w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=800",
      specialty: "Mərkəzi mövqe, €15-dan başlayır"
    },
    {
      id: "kichik-qala",
      title: "Kichik Qala 98",
      desc: "İçərişəhərin tarixi dar küçələrində yerləşir. Qonaqlara qədim arxitekturası olan otaqlarda unikal təcrübə vəd edir.",
      icon: <MapPin className="text-emerald-500 w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1510323334692-284fb835db5f?auto=format&fit=crop&q=80&w=800",
      specialty: "Tarixi Bina, €20-dan başlayır"
    },
    {
      id: "cheeky-carabao",
      title: "Cheeky Carabao Backpackers",
      desc: "Solo səyyahlar üçün ideal, çox əyləncəli ortaq istirahət zonası və barı olan fərqli konseptdəki məkan.",
      icon: <Users className="text-emerald-500 w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80&w=800",
      specialty: "Sosial Atmosfer, €12-dan başlayır"
    }
  ];

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-emerald-600/30 to-teal-900/50 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop"
            alt="Hostellər"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.2)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white backdrop-blur-md flex items-center justify-center mb-6 text-emerald-600 shadow-xl border-4 border-white/20">
            <Backpack className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Büdcə Yönümlü Hostellər
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Gənclər, səyyahlar və yeni dostluqlar axtaranlar üçün səmimi, təmiz və münasib qiymətli məkanlar
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hostels.map((t, i) => (
          <Link
            key={i}
            href={`/places/hostels/${t.id}`}
            className="bg-card group border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <Image src={t.image} alt={t.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-4 left-4 bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                {t.specialty}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-2 rounded-xl group-hover:bg-emerald-100 transition-colors">{t.icon}</div>
                <h3 className="text-2xl font-bold">{t.title}</h3>
              </div>
              <p className="text-muted-foreground flex-1 mb-6">{t.desc}</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                Ətraflı Bax <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
