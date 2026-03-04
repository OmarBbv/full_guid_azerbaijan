"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PlaceCard } from "./PlaceCard";
import { Place } from "@/types/place";

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

import { PLACES } from "@/constants/places";

export default function PopularPlaces() {
  const [activeCategory, setActiveCategory] = useState("hamısı");

  const filtered = activeCategory === "hamısı"
    ? PLACES
    : PLACES.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute rounded-full blur-[80px] opacity-[0.06] pointer-events-none w-[500px] h-[500px] bg-[#3b9cf5] -top-[100px] -right-[100px]" />
      <div className="absolute rounded-full blur-[80px] opacity-[0.06] pointer-events-none w-[400px] h-[400px] bg-[#4dd9ac] -bottom-[80px] -left-[80px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[12px] font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">🌟 Populyar</span>
            </div>
            <h2 className="text-[clamp(28px,4vw,48px)] font-black leading-[1.1] tracking-[-0.03em] text-foreground">
              Azərbaycanın ən gözəl<br />
              <span className="bg-linear-to-br from-primary to-[#3b9cf5] bg-clip-text text-transparent">məkanları</span>
            </h2>
            <p className="text-[15px] text-muted-foreground max-w-[420px] leading-relaxed mt-3">
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
    </section>
  );
}
