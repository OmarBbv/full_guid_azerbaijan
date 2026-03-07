"use client";

import { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonials = [
  {
    id: 1,
    name: "Elena Sorokina",
    country: "Rusiya",
    flag: "🇷🇺",
    avatar: "https://i.pravatar.cc/80?img=47",
    text: "Bakı məni tamamilə heyrətlə qarşıladı. FullGuide sayəsində gizli məkanları, yerli restoranları tapdım. Növbəti il mütləq Qəbələyə getmək istəyirəm!",
    rating: 5,
    place: "Bakı, Abşeron",
    accent: "#3b9cf5",
  },
  {
    id: 2,
    name: "Marco Bianchi",
    country: "İtaliya",
    flag: "🇮🇹",
    avatar: "https://i.pravatar.cc/80?img=33",
    text: "Şuşa turu həyatımın ən yaxşı səyahəti oldu. Yerli musiqi, tarixi qala, möhtəşəm təbiət — hamısı bir yerdə idi. FullGuide-ın bələdçisi əvəzolunmazdı.",
    rating: 5,
    place: "Şuşa, Qarabağ",
    accent: "#f5a623",
  },
  {
    id: 3,
    name: "Yuna Tanaka",
    country: "Yaponiya",
    flag: "🇯🇵",
    avatar: "https://i.pravatar.cc/80?img=44",
    text: "Qəbələdə 5 gün keçirdim — dağlar, göllər, saf hava. Platforma ingiliscədir, amma məlumatlar çox detallı. Azərbaycan gözləntilərimden çox daha gözəldi!",
    rating: 5,
    place: "Qəbələ, Şimal",
    accent: "#4dd9ac",
  },
  {
    id: 4,
    name: "Farida Al-Rashid",
    country: "BƏƏ",
    flag: "🇦🇪",
    avatar: "https://i.pravatar.cc/80?img=21",
    text: "Lənkəran — Azərbaycanın gizli cənnəti. Çay bağçaları, fərqli mətbəx, mehribanlıq. FullGuide bu unudulmaz səyahəti planlaşdırmağı çox asanlaşdırdı.",
    rating: 5,
    place: "Lənkəran",
    accent: "#8bc34a",
  },
];

export default function TestimonialsSection() {
  const t = useTranslations('Home');
  const [active, setActive] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Auto rotate
  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const current = testimonials[active];

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--primary) 5%, var(--background)) 0%, var(--background) 100%)",
      }}
    >
      {/* decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)",
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-pill">💬 {t('reviews', { fallback: 'Rəylər' })}</span>
          <h2 className="section-title mt-4">
            {t('what_travelers_say')}
          </h2>
          <p className="section-desc mx-auto mt-3 text-center">
            {t('travelers_experience_desc')}
          </p>
        </div>

        {/* Main testimonial */}
        <div
          className="testimonial-card relative rounded-3xl p-10 mb-8 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Quote icon */}
          <Quote
            size={40}
            className="mx-auto mb-6 opacity-15"
            style={{ color: current.accent }}
          />

          {/* Text */}
          <p
            className="text-xl leading-relaxed font-medium mb-8 max-w-2xl mx-auto"
            style={{ color: "var(--foreground)" }}
            key={active}
          >
            "{current.text}"
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: current.accent }} className="text-xl">
                ★
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="flex flex-col items-center gap-3">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-14 h-14 rounded-full object-cover ring-4 ring-white/20"
            />
            <div>
              <div className="font-bold text-base" style={{ color: "var(--foreground)" }}>
                {current.name} {current.flag}
              </div>
              <div className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                {current.country} · {current.place}
              </div>
            </div>
          </div>

          {/* Accent border bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 rounded-b-3xl"
            style={{
              background: `linear-gradient(90deg, transparent, ${current.accent}, transparent)`,
              transition: "background 0.8s ease",
            }}
          />
        </div>

        {/* Thumbnails */}
        <div className="flex items-center justify-center gap-4">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className="relative transition-all duration-400"
              style={{
                transform: i === active ? "scale(1.15)" : "scale(1)",
                opacity: i === active ? 1 : 0.5,
              }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
                style={{
                  border: i === active ? `3px solid ${t.accent}` : "3px solid transparent",
                  transition: "border-color 0.3s ease",
                }}
              />
              {i === active && (
                <div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{ background: t.accent }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .testimonial-card {
          background: var(--card);
          border: 1px solid var(--border);
          box-shadow: 0 8px 40px rgba(0,0,0,0.08);
        }
      `}</style>
    </section>
  );
}
