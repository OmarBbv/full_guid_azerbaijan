"use client";

import { UtensilsCrossed, Star, MapPin, ChefHat, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function RestaurantsPage() {
  const restaurants = [
    {
      id: "shirvanshah",
      title: "Şirvanşah Muzey-Restoranı",
      desc: "İçərişəhərdə yerləşən bu məkan qədim Azərbaycan memarlığını özündə yaşadan 19-cu əsrə aid unikal karvansara konseptli restorandır.",
      icon: <ChefHat className="text-orange-500 w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
      specialty: "Milli Mətbəx, Kabablar"
    },
    {
      id: "nergiz",
      title: "Nergiz Restoranı",
      desc: "Fəvvarələr meydanında yerləşən klassik, gözəl musiqi və ailəvi abu-havası olan ən məşhur obyektlərdən biridir.",
      icon: <Star className="text-orange-500 w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
      specialty: "Karabakh Mətbəxi, Piti"
    },
    {
      id: "derya-fish",
      title: "Dərya Fish House",
      desc: "Xəzərin sahilində, dəniz mənzərəsi qarşısında ən təzə balıq və dəniz məhsullarını dada biləcəyiniz restoran.",
      icon: <MapPin className="text-orange-500 w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&q=80&w=800",
      specialty: "Dəniz Məhsulları, Kütüm"
    }
  ];

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />
        <div className="absolute inset-0 z-10 bg-linear-to-r from-orange-600/30 to-red-900/50 mix-blend-multiply" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
            alt="Restoranlar"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.65) saturate(1.2)" }}
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-full bg-white backdrop-blur-md flex items-center justify-center mb-6 text-orange-600 shadow-xl border-4 border-white/20">
            <UtensilsCrossed className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            Əsl Azərbaycan Ləzzətləri
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Milli mətbəximizin şah əsərlərini təqdim edən ən populyar və keyfiyyətli restoranlar
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((t, i) => (
          <Link
            key={i}
            href={`/places/restaurants/${t.id}`}
            className="bg-card group border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
          >
            <div className="h-48 relative overflow-hidden">
              <Image src={t.image} alt={t.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-bold text-orange-600 border border-border">
                {t.specialty}
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-xl group-hover:bg-orange-100 transition-colors">{t.icon}</div>
                <h3 className="text-2xl font-bold">{t.title}</h3>
              </div>
              <p className="text-muted-foreground flex-1 mb-6">{t.desc}</p>
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm">
                Ətraflı Bax <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
