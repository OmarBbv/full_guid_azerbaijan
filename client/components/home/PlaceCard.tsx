"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Heart, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Place } from "@/types/place";
import { useTranslations } from "next-intl";
import { getImageUrl } from "@/lib/utils";

import fallbackImage from "@/assets/unsplash/photo-1514933651103-005eec06c04b_3224055e.jpg";

interface PlaceCardProps {
  place: Place;
  index: number;
}

export function PlaceCard({ place, index }: PlaceCardProps) {
  const t = useTranslations('Home');
  const [liked, setLiked] = useState<boolean>(false);
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgSrc, setImgSrc] = useState<any>(getImageUrl(place));

  // Reset img src if place changes
  useEffect(() => {
    setImgSrc(getImageUrl(place));
  }, [place]);

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
      href={`/mekanlar/${(place as any).slug || place.id}`}
      ref={ref}
      className="group block relative rounded-3xl overflow-hidden cursor-pointer bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.13)] h-full"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden h-[220px] rounded-t-3xl border-b border-border/50">
        <Image
          src={imgSrc || fallbackImage}
          alt={place.title || ""}
          fill
          unoptimized
          onError={() => setImgSrc(fallbackImage)}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.08]"
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
      <div className="p-5 bg-card flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-3">
            <h3 className="font-bold text-lg leading-tight mb-1.5 text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {place.title}
            </h3>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-primary/70" />
              <span className="text-sm font-medium text-muted-foreground line-clamp-1">
                {place.city || (place as any).location || "Bakı"}
              </span>
            </div>
          </div>
          <div
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl text-sm font-bold shrink-0 shadow-sm"
            style={{ background: `${accentColor}18`, color: accentColor }}
          >
            <Star size={14} className="fill-current" />
            {Number(place.average_rating) || 0}
          </div>
        </div>

        {/* Added Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-5 leading-relaxed">
          {place.short_description || (place as any).description || place.subtitle || "Ətraflı məlumat üçün klikləyin və bu məkanın imkanları ilə tanış olun."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
          <span className="text-xs font-medium bg-muted/60 px-2.5 py-1 rounded-md text-muted-foreground border border-border/50">
            {place.review_count || 0} {t('reviews')}
          </span>
          <div
            className="flex items-center gap-1.5 text-sm font-bold transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: accentColor }}
          >
            {t('explore')}
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
