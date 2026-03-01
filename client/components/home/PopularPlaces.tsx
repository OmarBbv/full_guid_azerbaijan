"use client";

import { useState, useRef, useEffect } from "react";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";

const categories = [
  {
    id: "dağlar",
    label: "Dağlar",
    icon: "🏔️",
    count: 48,
  },
  {
    id: "şəhərlər",
    label: "Şəhərlər",
    icon: "🏙️",
    count: 32,
  },
  {
    id: "tarix",
    label: "Tarixi Yerlər",
    icon: "🏛️",
    count: 67,
  },
  {
    id: "təbiət",
    label: "Təbiət",
    icon: "🌿",
    count: 54,
  },
  {
    id: "sahil",
    label: "Sahil",
    icon: "🏖️",
    count: 23,
  },
  {
    id: "hamısı",
    label: "Hamısı",
    icon: "✨",
    count: 340,
  },
];

const places = [
  {
    id: 1,
    name: "Yanar Dağ",
    region: "Abşeron",
    category: "təbiət",
    rating: 4.8,
    reviews: "9.2k",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    tag: "Nadir fenomen",
    accent: "#f5a623",
    badge: "Ən populyar",
  },
  {
    id: 2,
    name: "İçərişəhər",
    region: "Bakı",
    category: "tarix",
    rating: 4.9,
    reviews: "18.6k",
    img: "https://images.unsplash.com/photo-1548625361-58a9a9d27293?q=80&w=800&auto=format&fit=crop",
    tag: "UNESCO mirası",
    accent: "#3b9cf5",
    badge: "Tövsiyə edilir",
  },
  {
    id: 3,
    name: "Qax Meşəsi",
    region: "Şəki-Zaqatala",
    category: "dağlar",
    rating: 4.7,
    reviews: "4.3k",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    tag: "Trekkinq cənnəti",
    accent: "#4dd9ac",
    badge: "Yeni",
  },
  {
    id: 4,
    name: "Xəzər Sahili",
    region: "Bakı",
    category: "sahil",
    rating: 4.6,
    reviews: "11.4k",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
    tag: "Gün batımı nöqtəsi",
    accent: "#e06cfe",
    badge: "",
  },
  {
    id: 5,
    name: "Şəki Xanları Sarayı",
    region: "Şəki",
    category: "tarix",
    rating: 4.9,
    reviews: "7.8k",
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop",
    tag: "Arxitektura möcüzəsi",
    accent: "#f5a623",
    badge: "Tövsiyə edilir",
  },
  {
    id: 6,
    name: "Tufandağ",
    region: "Qəbələ",
    category: "dağlar",
    rating: 4.8,
    reviews: "5.1k",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
    tag: "Ski & Trekkinq",
    accent: "#3b9cf5",
    badge: "",
  },
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
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 260 }}>
        <img
          src={place.img}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Badge */}
        {place.badge && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider"
            style={{ background: `${place.accent}dd`, backdropFilter: "blur(8px)" }}
          >
            {place.badge}
          </div>
        )}

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: liked ? "#ef4444" : "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: liked ? "none" : "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Heart
            size={15}
            className={liked ? "fill-white text-white" : "text-white"}
          />
        </button>

        {/* Tag */}
        <div
          className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium text-white/80"
          style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
        >
          {place.tag}
        </div>
      </div>

      {/* Content */}
      <div className="place-card-body p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1" style={{ color: "var(--foreground)" }}>
              {place.name}
            </h3>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} style={{ color: "var(--muted-foreground)" }} />
              <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {place.region}
              </span>
            </div>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-sm font-bold shrink-0"
            style={{ background: `${place.accent}18`, color: place.accent }}
          >
            <Star size={12} className="fill-current" />
            {place.rating}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3"
          style={{ borderTop: "1px solid var(--border)" }}>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {place.reviews} rəy
          </span>
          <button
            className="flex items-center gap-1.5 text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: place.accent }}
          >
            Kəşf Et
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PopularPlaces() {
  const [activeCategory, setActiveCategory] = useState("hamısı");

  const filtered = activeCategory === "hamısı"
    ? places
    : places.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="section-pill">🌟 Populyar</span>
            </div>
            <h2 className="section-title">
              Azərbaycanın ən gözəl<br />
              <span className="section-title-accent">məkanları</span>
            </h2>
            <p className="section-desc mt-3">
              Minlərlə səyahətçi tərəfindən sevilən, tövsiyə edilən hədəflər.
            </p>
          </div>

          <a
            href="/mekanlar"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1 shrink-0 self-start md:self-auto"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 8px 24px rgba(30,58,138,0.25)",
            }}
          >
            Hamısını gör
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat.id ? "var(--primary)" : "var(--card)",
                color: activeCategory === cat.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                border: `1px solid ${activeCategory === cat.id ? "transparent" : "var(--border)"}`,
                boxShadow: activeCategory === cat.id ? "0 4px 16px rgba(30,58,138,0.3)" : "none",
                transform: activeCategory === cat.id ? "scale(1.04)" : "scale(1)",
              }}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span
                className="text-[11px] px-1.5 py-0.5 rounded-full font-bold"
                style={{
                  background: activeCategory === cat.id ? "rgba(255,255,255,0.25)" : "var(--muted)",
                  color: activeCategory === cat.id ? "white" : "var(--muted-foreground)",
                }}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((place, i) => (
            <PlaceCard key={place.id} place={place} index={i} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .place-card {
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .place-card:hover {
          box-shadow: 0 20px 50px rgba(0,0,0,0.13);
          transform: translateY(-6px);
        }
        .place-card-body {
          background: var(--card);
        }
        .group-hover\:scale-108:hover {
          transform: scale(1.08);
        }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.06;
          pointer-events: none;
        }
        .blob-1 {
          width: 500px;
          height: 500px;
          background: #3b9cf5;
          top: -100px;
          right: -100px;
        }
        .blob-2 {
          width: 400px;
          height: 400px;
          background: #4dd9ac;
          bottom: -80px;
          left: -80px;
        }
        .section-pill {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 99px;
          background: color-mix(in srgb, var(--primary) 12%, transparent);
          color: var(--primary);
          border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
        }
        .section-title {
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: var(--foreground);
        }
        .section-title-accent {
          background: linear-gradient(135deg, var(--primary), #3b9cf5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-desc {
          font-size: 15px;
          color: var(--muted-foreground);
          max-width: 420px;
          line-height: 1.6;
        }
      `}</style>
    </section>
  );
}
