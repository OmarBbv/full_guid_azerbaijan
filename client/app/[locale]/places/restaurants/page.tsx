"use client";

import { useState } from "react";
import { UtensilsCrossed, Star, MapPin, ChefHat, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { usePlacesByType } from '@/hooks/use-places';
import { useCities } from '@/hooks/use-cities';
import { useParams } from 'next/navigation';
import un_photo_1555396273_367ea4eb4db5_3224055e from "@/assets/unsplash/photo-1555396273-367ea4eb4db5_3224055e.jpg";

export default function RestaurantsPage() {
  const t = useTranslations("PlacesPage");
  const { locale } = useParams<{ locale: string }>();
  const { data: restaurantsData, isLoading } = usePlacesByType('restaurant', locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  
  const [activeCity, setActiveCity] = useState("ALL");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const restaurants = restaurantsData || [];
  const filteredRestaurants = restaurants.filter((r: any) => activeCity === "ALL" ? true : r.city === activeCity);

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
            src={un_photo_1555396273_367ea4eb4db5_3224055e.src}
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
            {t("restaurants_title")}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            {t("restaurants_subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center relative z-30">
        <h2 className="text-2xl font-bold">{filteredRestaurants.length} {t("found_count")}</h2>
        
        {/* City Dropdown Filter */}
        <div className="relative">
          <button
            onClick={() => setCityDropdownOpen((v) => !v)}
            className="flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all min-w-[160px] justify-between"
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              {activeCity === 'ALL' ? 'Bütün Şəhərlər' : activeCity}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${cityDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {cityDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 max-h-64 overflow-y-auto bg-card border border-border rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <button
                onClick={() => { setActiveCity('ALL'); setCityDropdownOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${activeCity === 'ALL'
                    ? 'bg-primary text-primary-foreground focus:bg-primary'
                    : 'hover:bg-muted text-foreground'
                  }`}
              >
                <span>Bütün Şəhərlər</span>
                <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
                  {restaurants.length}
                </span>
              </button>
              {cities.map((city) => {
                const isActive = activeCity === city.name;
                const count = restaurants.filter((p: any) => p.city === city.name).length;
                return (
                  <button
                    key={city.id}
                    onClick={() => { setActiveCity(city.name); setCityDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors border-t border-border/50 ${isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                      }`}
                  >
                    <span className="truncate">{city.name}</span>
                    <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {!filteredRestaurants || filteredRestaurants.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl">{t("no_items")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant: any, i: number) => (
              <Link
                key={i}
                href={`/places/restaurants/${restaurant.id}`}
                className="bg-card group border border-border/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col"
              >
                <div className="h-56 relative overflow-hidden">
                  <Image
                    src={restaurant.image || restaurant.thumbnail || (restaurant.images?.[0]?.url ?? '')}
                    alt={restaurant.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                  {restaurant.subtitle && (
                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 px-3 py-1 rounded-full text-xs font-bold text-orange-600 border border-border">
                      {restaurant.subtitle}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {Number(restaurant.average_rating).toFixed(1)}
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-xl group-hover:bg-orange-100 transition-colors">
                      <ChefHat className="text-orange-500 w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-bold line-clamp-1">{restaurant.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                        <MapPin className="w-3 h-3" />
                        {restaurant.city}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground flex-1 mb-6 line-clamp-3">{restaurant.short_description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-1 text-orange-600 font-bold text-sm">
                      {t("learn_more")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <span className="text-xs text-muted-foreground">{restaurant.review_count} {t("reviews")}</span>
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
