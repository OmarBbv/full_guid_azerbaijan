"use client";

import { UtensilsCrossed, Star, MapPin, ChefHat, ArrowRight, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { usePlacesByType } from '@/hooks/use-places';
import { useParams } from 'next/navigation';

export default function RestaurantsPage() {
  const { locale } = useParams<{ locale: string }>();
  const { data: restaurantsData, isLoading } = usePlacesByType('restaurant', locale);
  const restaurants = restaurantsData || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "60dvh", minHeight: 400 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-transparent to-black/30" />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop"
            alt="Restaurants"
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
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

      <div className="max-w-7xl mx-auto px-6">
        {!restaurants || restaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">Hələ ki heç bir restoran əlavə edilməyib.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {restaurants.map((t: any, i: number) => (
              <Link
                key={i}
                href={`/places/restaurants/${t.id}`}
                className="bg-card group border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
              >
                <div className="h-56 relative overflow-hidden">
                  <Image
                    src={t.image || t.thumbnail || (t.images?.[0]?.url ?? '')}
                    alt={t.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  {t.subtitle && (
                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-bold text-orange-600 border border-border">
                      {t.subtitle}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {Number(t.average_rating).toFixed(1)}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-xl group-hover:bg-orange-100 transition-colors">
                      <ChefHat className="text-orange-500 w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-bold line-clamp-1">{t.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <MapPin className="w-3 h-3" />
                        {t.city}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-1 mb-6 line-clamp-3">{t.short_description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">
                      Ətraflı Bax <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <span className="text-xs text-muted-foreground">{t.review_count} rəy</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
