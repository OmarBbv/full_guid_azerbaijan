"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Heart, ArrowRight, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Place } from "@/types/place";
import { useTranslations } from "next-intl";

interface PlaceCardProps {
  place: Place;
  index: number;
}

export function PlaceCard({ place, index }: PlaceCardProps) {
  const t = useTranslations('Home');
  const [liked, setLiked] = useState<boolean>(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      const favorites = JSON.parse(saved) as (number | string)[];
      setLiked(favorites.includes(place.id));
    }

    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [place.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const saved = localStorage.getItem("favorites");
    let favorites = saved ? (JSON.parse(saved) as (number | string)[]) : [];

    if (favorites.includes(place.id)) {
      favorites = favorites.filter(id => id !== place.id);
      setLiked(false);
    } else {
      favorites.push(place.id);
      setLiked(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("storage_favorites_updated"));
  };

  const accentColor = place.accent_color || "#3b9cf5";

  return (
    <Link
      href={`/mekanlar/${place.id}`}
      ref={ref}
      className="group block relative rounded-3xl overflow-hidden cursor-pointer bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.13)] h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden h-[260px]">
        <img
          src={place.thumbnail || (place.images?.[0]?.url) || "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=700&auto=format&fit=crop"}
          alt={place.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Badge */}
        {place.is_featured && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider"
            style={{ background: `${accentColor}dd`, backdropFilter: "blur(8px)" }}
          >
            TOP
          </div>
        )}

        {/* Like button */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          style={{
            background: liked ? "#ef4444" : "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            border: liked ? "none" : "1px solid rgba(255,255,255,0.2)",
            boxShadow: liked ? "0 4px 12px rgba(239, 68, 68, 0.4)" : "none"
          }}
        >
          <Heart
            size={15}
            className={liked ? "fill-white text-white" : "text-white"}
          />
        </button>

        {/* Tag (Type) */}
        {place.type && (
          <div
            className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-[11px] font-medium text-white/80"
            style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)" }}
          >
            {place.type}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 bg-card h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-bold text-lg leading-tight mb-1 text-foreground line-clamp-1">
              {place.title}
            </h3>
            <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground line-clamp-1">
                {place.city}
              </span>
            </div>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-sm font-bold shrink-0 ml-2"
            style={{ background: `${accentColor}18`, color: accentColor }}
          >
            <Star size={12} className="fill-current" />
            {Number(place.average_rating) || 0}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {place.review_count || 0} {t('reviews')}
          </span>
          <div
            className="flex items-center gap-1.5 text-xs font-bold transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: accentColor }}
          >
            {t('explore')}
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </Link>
  );
}
