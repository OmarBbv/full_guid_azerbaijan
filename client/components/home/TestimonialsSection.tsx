"use client";

import { useRef, useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";

function TestimonialCard({ item }: { item: any }) {
  return (
    <div className="shrink-0 w-[400px] mx-4 p-8 rounded-3xl bg-card border border-border shadow-md hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20 shrink-0">
          <img
            src={`https://ui-avatars.com/api/?name=A&background=random&color=fff&bold=true`}
            alt="Anonymous"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-foreground text-sm uppercase tracking-tight">{item.name}</h4>
          <p className="text-xs text-muted-foreground">{item.country}</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-[#f5a623] text-xs">★</span>
          ))}
        </div>
      </div>
      <p className="text-muted-foreground text-[14px] leading-relaxed italic">
        "{item.text}"
      </p>
    </div>
  );
}

export default function TestimonialsSection() {
  const t = useTranslations('Testimonials');
  const t_home = useTranslations('Home');
  const items = t.raw('list') || [];

  const mid = Math.ceil(items.length / 2);
  const row1 = [...items.slice(0, mid), ...items.slice(0, mid)];
  const row2 = [...items.slice(mid), ...items.slice(mid)];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 mb-16 text-center">
        <span className="section-pill">💬 {t_home('reviews', { fallback: 'Rəylər' })}</span>
        <h2 className="section-title mt-4">
          {t_home('what_travelers_say')}
        </h2>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Row 1: To Right */}
        <div className="marquee-wrapper overflow-hidden">
          <div className="marquee-track marquee-to-right">
            {row1.map((item: any, i: number) => (
              <TestimonialCard key={`row1-${i}`} item={item} />
            ))}
          </div>
        </div>

        {/* Row 2: To Left */}
        <div className="marquee-wrapper overflow-hidden">
          <div className="marquee-track marquee-to-left">
            {row2.map((item: any, i: number) => (
              <TestimonialCard key={`row2-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-wrapper {
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .marquee-track {
          display: flex;
          width: max-content;
        }

        .marquee-to-right {
          animation: marquee-right 40s linear infinite;
        }

        .marquee-to-left {
          animation: marquee-left 40s linear infinite;
        }

        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

