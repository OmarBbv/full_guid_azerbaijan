"use client";

import { useEffect, useRef, useState } from "react";
import { Users, MapPin, Star, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: 120000, suffix: "+", label: "Aktiv Ziyarətçi", color: "#3b9cf5" },
  { icon: MapPin, value: 340, suffix: "+", label: "Unikal Məkan", color: "#4dd9ac" },
  { icon: Star, value: 4.9, suffix: "", label: "Ortalama Reytinq", color: "#f5a623", decimal: true },
  { icon: Globe, value: 60, suffix: "+", label: "Ölkədən Turist", color: "#e06cfe" },
];

function useCountUp(target: number, duration = 2000, decimal = false, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(decimal ? Math.round(start * 10) / 10 : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, decimal, active]);
  return count;
}

function StatCard({ stat, active, index }: { stat: typeof stats[0]; active: boolean; index: number }) {
  const count = useCountUp(stat.value, 2000, stat.decimal, active);
  const Icon = stat.icon;

  return (
    <div
      className="relative flex flex-col items-center p-8 transition-all duration-500 group"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${index * 100}ms`
      }}
    >
      {/* Decorative center line */}
      {index < stats.length - 1 && (
        <div className="hidden lg:block absolute right-0 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-border to-transparent" />
      )}

      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg shadow-black/5"
        style={{
          background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
          border: `1px solid ${stat.color}20`
        }}
      >
        <Icon size={24} style={{ color: stat.color }} />
      </div>

      <div className="flex flex-col items-center">
        <div className="text-4xl lg:text-5xl font-black mb-2 tracking-tighter text-foreground tabular-nums">
          {stat.decimal ? count.toFixed(1) : count.toLocaleString()}
          <span className="text-primary ml-0.5">{stat.suffix}</span>
        </div>
        <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground/60">
          {stat.label}
        </div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-background">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="bg-card/50 backdrop-blur-xl rounded-[3rem] border border-border shadow-2xl shadow-black/5 overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-border/50">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} active={active} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
