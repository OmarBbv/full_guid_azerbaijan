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

function StatCard({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1800, stat.decimal, active);
  const Icon = stat.icon;

  return (
    <div className="stat-card group flex flex-col items-center text-center p-8 rounded-3xl relative overflow-hidden">
      {/* BG glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${stat.color}18, transparent 70%)` }}
      />

      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${stat.color}18`, border: `1px solid ${stat.color}28` }}
      >
        <Icon size={28} style={{ color: stat.color }} />
      </div>

      <div className="text-5xl font-black mb-2 tracking-tight" style={{ color: stat.color }}>
        {stat.decimal ? count.toFixed(1) : count.toLocaleString()}
        {stat.suffix}
      </div>
      <div className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
        {stat.label}
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
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 stats-bg" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} active={active} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .stats-bg {
          background: linear-gradient(180deg, var(--background) 0%, color-mix(in srgb, var(--background) 85%, #1e293b) 100%);
        }
        .stat-card {
          background: color-mix(in srgb, var(--card) 80%, transparent);
          border: 1px solid var(--border);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
      `}</style>
    </section>
  );
}
