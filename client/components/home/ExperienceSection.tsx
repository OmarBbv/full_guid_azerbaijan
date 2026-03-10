"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

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
    </>
  );
}
