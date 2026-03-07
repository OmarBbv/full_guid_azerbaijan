"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, Clock, Users } from "lucide-react";
import { useTranslations } from "next-intl";



const featuredTours = [
  {
    id: 1,
    title: "Bakı & Abşeron Turu",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=700&auto=format&fit=crop",
    duration: "3 gün",
    groupSize: "2–12 nəfər",
    location: "Bakı, Abşeron",
    price: "180",
    rating: 4.9,
    reviews: 420,
    accent: "#3b9cf5",
    highlights: ["İçərişəhər", "Yanar Dağ", "Abşeron Yarımadası"],
  },
  {
    id: 2,
    title: "Qəbələ Dağ Macərası",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=700&auto=format&fit=crop",
    duration: "4 gün",
    groupSize: "4–16 nəfər",
    location: "Qəbələ, Şimal",
    price: "240",
    rating: 4.8,
    reviews: 318,
    accent: "#4dd9ac",
    highlights: ["Tufandağ", "Nohur Gölü", "Vəndam"],
  },
  {
    id: 3,
    title: "Qarabağ Tarixi Turu",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=700&auto=format&fit=crop",
    duration: "5 gün",
    groupSize: "2–10 nəfər",
    location: "Şuşa, Qarabağ",
    price: "320",
    rating: 5.0,
    reviews: 195,
    accent: "#f5a623",
    highlights: ["Şuşa şəhəri", "Cıdır Düzü", "Ağdam"],
  },
];

function TourCard({ tour, index }: { tour: typeof featuredTours[0]; index: number }) {
  const t = useTranslations('Home');
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="tour-card group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${index * 0.1}s`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        <img
          src={tour.img}
          alt={tour.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.75) 100%)" }}
        />

        {/* Price */}
        <div className="absolute top-4 right-4">
          <div
            className="px-3 py-1.5 rounded-2xl text-sm font-black text-white"
            style={{ background: `${tour.accent}ee`, backdropFilter: "blur(8px)" }}
          >
            ${tour.price}
            <span className="text-[11px] font-medium opacity-80">/ {t('person', { fallback: 'nəfər' })}</span>
          </div>
        </div>

        {/* Highlights */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
          {tour.highlights.map((h, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-full text-[11px] font-medium text-white/90"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="tour-card-body p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-bold text-lg leading-tight" style={{ color: "var(--foreground)" }}>
            {tour.title}
          </h3>
          <div
            className="shrink-0 flex items-center gap-1 text-sm font-bold px-2 py-1 rounded-xl"
            style={{ background: `${tour.accent}18`, color: tour.accent }}
          >
            ⭐ {tour.rating}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={12} style={{ color: "var(--muted-foreground)" }} />
          <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            {tour.location}
          </span>
        </div>

        <div
          className="flex items-center gap-4 pt-3 mb-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-1.5">
            <Clock size={13} style={{ color: "var(--muted-foreground)" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {tour.duration}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={13} style={{ color: "var(--muted-foreground)" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              {tour.groupSize}
            </span>
          </div>
          <span className="text-xs ml-auto" style={{ color: "var(--muted-foreground)" }}>
            {tour.reviews} {t('reviews', { fallback: 'rəy' })}
          </span>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: `${tour.accent}18`,
            color: tour.accent,
            border: `1.5px solid ${tour.accent}30`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = tour.accent;
            (e.currentTarget as HTMLButtonElement).style.color = "white";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${tour.accent}18`;
            (e.currentTarget as HTMLButtonElement).style.color = tour.accent;
          }}
        >
          {t('explore_tour', { fallback: 'Turu Kəşf Et' })}
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const t = useTranslations('Home');
  const stepsRef = useRef<HTMLDivElement>(null);
  const [stepsVisible, setStepsVisible] = useState(false);

  const experiences = [
    {
      id: 1,
      step: "01",
      icon: "🗺️",
      title: t('choose_place_title'),
      description: t('choose_place_desc'),
      color: "#3b9cf5",
    },
    {
      id: 2,
      step: "02",
      icon: "📅",
      title: t('plan_title'),
      description: t('plan_desc'),
      color: "#4dd9ac",
    },
    {
      id: 3,
      step: "03",
      icon: "✈️",
      title: t('travel_title'),
      description: t('travel_desc'),
      color: "#f5a623",
    },
    {
      id: 4,
      step: "04",
      icon: "⭐",
      title: t('share_experience_title'),
      description: t('share_experience_desc'),
      color: "#e06cfe",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStepsVisible(true); },
      { threshold: 0.2 }
    );
    if (stepsRef.current) observer.observe(stepsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── How It Works ── */}
      <section
        className="py-24 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 6%, var(--background)) 0%, var(--background) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="section-pill">🚀 {t('how_it_works')}</span>
            <h2 className="section-title mt-4">
              {t('perfect_in_4_steps')}<br />
              <span className="section-title-accent">{t('travel')}</span>
            </h2>
            <p className="section-desc mx-auto mt-3 text-center">
              {t('easy_discover')}
            </p>
          </div>

          <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((step, i) => (
              <div
                key={step.id}
                className="how-card group relative p-6 rounded-3xl"
                style={{
                  opacity: stepsVisible ? 1 : 0,
                  transform: stepsVisible ? "translateY(0)" : "translateY(28px)",
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s`,
                }}
              >
                {/* Step number */}
                <div
                  className="absolute top-5 right-5 text-4xl font-black opacity-10 leading-none"
                  style={{ color: step.color }}
                >
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${step.color}18`, border: `1px solid ${step.color}28` }}
                >
                  {step.icon}
                </div>

                {/* Connector line (not on last) */}
                {i < 3 && (
                  <div
                    className="hidden lg:block absolute top-12 right-[-20px] w-10 h-[2px] z-10"
                    style={{ background: `linear-gradient(90deg, ${step.color}60, ${experiences[i + 1].color}60)` }}
                  />
                )}

                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--foreground)" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          .how-card {
            background: var(--card);
            border: 1px solid var(--border);
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .how-card:hover {
            box-shadow: 0 16px 40px rgba(0,0,0,0.1);
            transform: translateY(-4px);
          }
        `}</style>
      </section>

      {/* ── Featured Tours ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="blob blob-3" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-pill">🎯 {t('featured_tours')}</span>
              <h2 className="section-title mt-4">
                {t('ready_package')}<br />
                <span className="section-title-accent">{t('our_tours')}</span>
              </h2>
              <p className="section-desc mt-3">
                {t('expert_guide_desc')}
              </p>
            </div>
            <a
              href="/turlar"
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1 shrink-0 self-start md:self-auto"
              style={{
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 8px 24px rgba(30,58,138,0.25)",
              }}
            >
              {t('all_tours')}
              <ArrowRight size={15} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} index={i} />
            ))}
          </div>
        </div>

        <style jsx global>{`
          .tour-card {
            background: var(--card);
            border: 1px solid var(--border);
            box-shadow: 0 4px 20px rgba(0,0,0,0.06);
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }
          .tour-card:hover {
            box-shadow: 0 20px 50px rgba(0,0,0,0.13);
            transform: translateY(-6px);
          }
          .tour-card-body {
            background: var(--card);
          }
          .blob-3 {
            position: absolute;
            width: 600px;
            height: 600px;
            border-radius: 50%;
            filter: blur(100px);
            opacity: 0.05;
            background: #e06cfe;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }
        `}</style>
      </section>
    </>
  );
}
