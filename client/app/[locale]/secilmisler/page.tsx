"use client";

import { useState, useEffect } from "react";
import { Heart, MapPin, Star, ArrowRight, Search, Info } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PLACES } from "@/constants/places";
import { PlaceCard } from "@/components/home/PlaceCard";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      const saved = localStorage.getItem("favorites");
      if (saved) {
        setFavorites(JSON.parse(saved));
      } else {
        setFavorites([]);
      }
    };

    loadFavorites();
    setIsLoading(false);

    window.addEventListener("storage_favorites_updated", loadFavorites);
    return () => window.removeEventListener("storage_favorites_updated", loadFavorites);
  }, []);

  const favoritePlaces = PLACES.filter((place) => favorites.includes(place.id));

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative border-b border-border/40" style={{ background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)" }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="w-full md:max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold uppercase tracking-wider shadow-sm">
                <Heart size={16} className="fill-current" /> Sənin Kolleksiyan
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
                Seçilmiş <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-500">Məkanlar</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Bəyəndiyin və gələcəkdə ziyarət etmək istədiyin bütün möcüzəvi yerlər burada bir araya gəlib.
              </p>

              <div className="flex gap-4">
                <Link href="/mekanlar" className="px-6 py-3 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2">
                  <Search size={18} /> Yeni yerlər kəşf et
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-card/80 backdrop-blur-xl p-8 rounded-[40px] border border-border shadow-2xl shadow-black/5 text-center px-12">
                <div className="text-5xl font-black text-red-500 mb-2">{favoritePlaces.length}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-loose">Saxlanılmış<br />məkan</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
          {!isLoading && favoritePlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {favoritePlaces.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-card/50 backdrop-blur-sm rounded-[40px] border border-border/50 border-dashed">
              <div className="w-24 h-24 bg-muted rounded-3xl flex items-center justify-center mb-8 text-5xl rotate-6 animate-pulse">
                💝
              </div>
              <h3 className="text-3xl font-black text-foreground mb-4">Hələ ki, heç nə yoxdur</h3>
              <p className="text-muted-foreground max-w-md text-lg leading-relaxed mb-10">
                Görünür, hələ ki heç bir məkanı seçilmişlərə əlavə etməmisən. Azərbaycanın gözəlliklərini kəşf etməyə indi başla!
              </p>
              <Link
                href="/mekanlar"
                className="px-10 py-4 bg-primary text-primary-foreground rounded-2xl font-black tracking-wide hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                Məkanlara Get <ArrowRight size={20} />
              </Link>
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Yüklənir...</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer Peek for Layout */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="bg-linear-to-r from-primary/10 to-accent/10 rounded-[40px] p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-lg text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-black text-foreground mb-4 flex items-center justify-center md:justify-start gap-3">
              <Info className="text-primary" /> Məsləhət lazımdır?
            </h4>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Haraya gedəcəyinə qərar verə bilmirsən? Təcrübəli bələdçilərimiz sənə ən uyğun marşrutu seçməkdə kömək edə bilər.
            </p>
          </div>
          <Link href="/contact" className="px-10 py-5 bg-card border border-border rounded-2xl font-black text-foreground hover:bg-muted transition-all shadow-xl shadow-black/5 active:scale-95">
            Bizimlə Əlaqə
          </Link>
        </div>
      </div>
    </div>
  );
}
