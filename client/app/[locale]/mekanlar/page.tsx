"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Star, Heart, ArrowRight, SlidersHorizontal, Map } from "lucide-react";

// Mock Data
const categories = [
  { id: "hamısı", label: "Bütün Məkanlar", icon: "✨" },
  { id: "dağlar", label: "Dağlar", icon: "🏔️" },
  { id: "şəhərlər", label: "Şəhərlər", icon: "🏙️" },
  { id: "tarix", label: "Tarixi Yerlər", icon: "🏛️" },
  { id: "təbiət", label: "Təbiət", icon: "🌿" },
  { id: "sahil", label: "Sahil", icon: "🏖️" },
  { id: "əyləncə", label: "Əyləncə", icon: "🎢" },
];

const places = [
  { id: 1, name: "Yanar Dağ", region: "Abşeron", category: "təbiət", rating: 4.8, reviews: "9.2k", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop", tag: "Nadir fenomen", accent: "#f5a623", badge: "Ən populyar" },
  { id: 2, name: "İçərişəhər", region: "Bakı", category: "tarix", rating: 4.9, reviews: "18.6k", img: "https://images.unsplash.com/photo-1548625361-58a9a9d27293?q=80&w=800&auto=format&fit=crop", tag: "UNESCO mirası", accent: "#3b9cf5", badge: "Tövsiyə edilir" },
  { id: 3, name: "Qax Meşəsi", region: "Şəki-Zaqatala", category: "dağlar", rating: 4.7, reviews: "4.3k", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop", tag: "Trekkinq cənnəti", accent: "#4dd9ac", badge: "Yeni" },
  { id: 4, name: "Xəzər Sahili", region: "Bakı", category: "sahil", rating: 4.6, reviews: "11.4k", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop", tag: "Gün batımı nöqtəsi", accent: "#e06cfe", badge: "" },
  { id: 5, name: "Şəki Xanları Sarayı", region: "Şəki", category: "tarix", rating: 4.9, reviews: "7.8k", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop", tag: "Arxitektura möcüzəsi", accent: "#f5a623", badge: "Tövsiyə edilir" },
  { id: 6, name: "Tufandağ", region: "Qəbələ", category: "dağlar", rating: 4.8, reviews: "5.1k", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop", tag: "Ski & Trekkinq", accent: "#3b9cf5", badge: "" },
  { id: 7, name: "Göygöl", region: "Göygöl", category: "təbiət", rating: 4.9, reviews: "12.4k", img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop", tag: "Füsunkar mənzərə", accent: "#10b981", badge: "Təbiət incisi" },
  { id: 8, name: "Heydər Əliyev Mərkəzi", region: "Bakı", category: "şəhərlər", rating: 4.8, reviews: "15.2k", img: "https://images.unsplash.com/photo-1580216262276-2e86dcda067d?q=80&w=800&auto=format&fit=crop", tag: "Modern memarlıq", accent: "#6366f1", badge: "İkonik" },
  { id: 9, name: "Qobustan", region: "Qaradağ", category: "tarix", rating: 4.7, reviews: "8.9k", img: "https://images.unsplash.com/photo-1682687219573-3fd75f982217?q=80&w=800&auto=format&fit=crop", tag: "Qaya rəsmləri", accent: "#d97706", badge: "" },
];

function PlaceCard({ place, index }: { place: typeof places[0]; index: number }) {
  const [liked, setLiked] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="place-card group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${Math.min(index, 8) * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${Math.min(index, 8) * 0.08}s`,
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ height: 260 }}>
        <img
          src={place.img}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-80"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)",
          }}
        />

        {/* Badge */}
        {place.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg"
            style={{ background: `${place.accent}dd`, backdropFilter: "blur(8px)" }}
          >
            {place.badge}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: liked ? "#ef4444" : "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            border: liked ? "none" : "1px solid rgba(255,255,255,0.25)",
            boxShadow: liked ? "0 4px 12px rgba(239, 68, 68, 0.4)" : "none"
          }}
        >
          <Heart size={18} className={liked ? "fill-white text-white" : "text-white"} />
        </button>

        {/* Tag */}
        <div
          className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full text-[12px] font-medium text-white/90"
          style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
        >
          {place.tag}
        </div>
      </div>

      {/* Card Body */}
      <div className="place-card-body p-5 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="pr-3">
            <h3 className="font-bold text-xl leading-tight mb-1.5 group-hover:text-primary transition-colors" style={{ color: "var(--foreground)" }}>
              {place.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} style={{ color: "var(--muted-foreground)" }} />
              <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                {place.region}
              </span>
            </div>
          </div>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold shrink-0 shadow-sm"
            style={{ background: `${place.accent}18`, color: place.accent }}
          >
            <Star size={14} className="fill-current" />
            {place.rating}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <span className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            {place.reviews} rəy
          </span>
          <button
            className="flex items-center gap-1.5 text-sm font-bold transition-all duration-300 group-hover:translate-x-1"
            style={{ color: place.accent }}
          >
            Ətraflı <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PlacesPage() {
  const [activeCategory, setActiveCategory] = useState("hamısı");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = places.filter(place => {
    const matchesCategory = activeCategory === "hamısı" || place.category === activeCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider shadow-sm">
                <Map size={16} /> Kəşf Et
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
                Gəzməli və <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">Görməli</span> Yerlər
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Azərbaycanın hər qarışı bir tarix, hər guşəsi bir möcüzədir. Öz növbəti səyahətini bizimlə fərqləndir.
              </p>

              {/* Search Box */}
              <div className="relative flex items-center w-full max-w-xl shadow-xl shadow-primary/5 rounded-2xl bg-card border border-border/50 group hover:border-primary/50 transition-colors">
                <div className="pl-5 pr-2 py-4 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Search size={22} />
                </div>
                <input
                  type="text"
                  placeholder="Məkan və ya region axtar..."
                  className="w-full bg-transparent border-none outline-none py-4 px-2 text-foreground placeholder:text-muted-foreground/60 text-lg font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="pr-4 hidden sm:block">
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95">
                    Axtar
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats / Visual Element */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="bg-card/80 backdrop-blur-xl p-6 rounded-3xl border border-border/50 shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300">
                <div className="text-3xl font-black text-primary mb-1">340+</div>
                <div className="text-sm font-medium text-muted-foreground">kəşf edilmiş unikal məkan</div>
              </div>
              <div className="bg-card/80 backdrop-blur-xl p-6 rounded-3xl border border-border/50 shadow-xl shadow-black/5 hover:-translate-y-2 transition-transform duration-300 translate-y-6">
                <div className="text-3xl font-black text-accent mb-1">12K+</div>
                <div className="text-sm font-medium text-muted-foreground">gündəlik aktiv istifadəçi</div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between mb-10">
            {/* Categories (Scrollable) */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-2 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap active:scale-95"
                  style={{
                    background: activeCategory === cat.id ? "var(--primary)" : "var(--card)",
                    color: activeCategory === cat.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    border: `1px solid ${activeCategory === cat.id ? "transparent" : "var(--border)"}`,
                    boxShadow: activeCategory === cat.id ? "0 8px 24px rgba(30,58,138,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <button className="hidden lg:flex items-center gap-2 px-6 py-3 bg-card border border-border rounded-2xl text-sm font-semibold text-foreground hover:bg-muted transition-colors shadow-sm">
              <SlidersHorizontal size={18} />
              Filtrlər
            </button>
          </div>

          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between text-muted-foreground">
            <p className="font-medium">
              <span className="text-foreground font-bold">{filteredPlaces.length}</span> məkan tapıldı
            </p>
            {/* Sort Dropdown Placeholder */}
            <div className="flex items-center gap-2 text-sm font-medium hover:text-foreground cursor-pointer transition-colors">
              Sırala: Populyarlığa görə <Star size={14} />
            </div>
          </div>

          {/* Grid */}
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredPlaces.map((place, i) => (
                <PlaceCard key={place.id} place={place} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border/50 border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 text-3xl">
                🔍
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Heç bir məkan tapılmadı</h3>
              <p className="text-muted-foreground max-w-md">Axtarış meyarlarınıza uyğun nəticə yoxdur. Zəhmət olmasa başqa sözlə sınayın və ya filtrləri təmizləyin.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("hamısı"); }}
                className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                Təmizlə
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredPlaces.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3.5 bg-card border border-border rounded-xl text-foreground font-bold hover:bg-muted transition-colors shadow-sm flex items-center gap-2">
                Daha çox yüklə
              </button>
            </div>
          )}

        </section>
      </div>

      <style jsx global>{`
        .place-card {
          background: var(--card);
          border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .place-card:hover {
          box-shadow: 0 24px 48px rgba(0,0,0,0.12);
          transform: translateY(-8px);
          border-color: color-mix(in srgb, var(--primary) 30%, transparent);
        }
        .place-card-body {
          background: var(--card);
        }
        .group-hover\:scale-108:hover {
          transform: scale(1.08);
        }
        /* Hide scrollbar for category list */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
