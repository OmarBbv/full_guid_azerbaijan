"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, Tag } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useCities } from "@/hooks/use-cities";
import { useCategoryOptions } from "@/hooks/use-category-options";

export default function HeroSearchBar() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations("HeroSearch");

  const { data: apiCities = [] } = useCities({ language: locale, active: true });

  const CITIES = [
    { value: "", label: t("all_cities") },
    ...apiCities.map((c: any) => ({
      value: c.id,
      label: c.name,
    })),
  ];

  const TYPES = useCategoryOptions(locale);

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);

  const cityRef = useRef<HTMLDivElement>(null);
  const typeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
      if (typeRef.current && !typeRef.current.contains(e.target as Node)) setTypeOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (city) params.set("city", city);
    if (type) params.set("type", type);
    router.push(`/search?${params.toString()}` as any);
  };

  const selectedCity = CITIES.find((c) => c.value === city) ?? CITIES[0];
  const selectedType = TYPES.find((tItem) => tItem.value === type) ?? TYPES[0];

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col sm:flex-row items-stretch gap-0 w-full max-w-3xl mx-auto"
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 20,
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        overflow: "visible",
      }}
    >
      {/* ── Text ── */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3.5 min-w-0">
        <Search size={17} className="text-white/50 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("what_placeholder")}
          className="w-full bg-transparent text-white placeholder-white/40 text-sm outline-none font-medium"
        />
      </div>

      {/* ── Divider ── */}
      <div className="hidden sm:block w-px self-stretch my-3" style={{ background: "rgba(255,255,255,0.15)" }} />

      {/* ── Type dropdown ── */}
      <div className="relative shrink-0" ref={typeRef}>
        <button
          type="button"
          onClick={() => { setTypeOpen((o) => !o); setCityOpen(false); }}
          className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium w-full sm:w-auto whitespace-nowrap"
          style={{ color: type ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}
        >
          <span>{selectedType.icon}</span>
          <span className="truncate max-w-[100px]">{selectedType.label}</span>
          <ChevronDown size={13} className="shrink-0 transition-transform duration-300"
            style={{ transform: typeOpen ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.5)" }} />
        </button>
        {typeOpen && (
          <div
            className="absolute bottom-full mb-2 left-0 rounded-2xl overflow-hidden z-50 min-w-[180px]"
            style={{
              background: "rgba(15,20,35,0.92)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {TYPES.map((tItem) => (
              <button
                key={tItem.value}
                type="button"
                onClick={() => { setType(tItem.value); setTypeOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors hover:bg-white/10"
                style={{ color: type === tItem.value ? "#3b9cf5" : "rgba(255,255,255,0.8)" }}
              >
                <span>{tItem.icon}</span>
                {tItem.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="hidden sm:block w-px self-stretch my-3" style={{ background: "rgba(255,255,255,0.15)" }} />

      {/* ── City dropdown ── */}
      <div className="relative shrink-0" ref={cityRef}>
        <button
          type="button"
          onClick={() => { setCityOpen((o) => !o); setTypeOpen(false); }}
          className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium w-full sm:w-auto whitespace-nowrap"
          style={{ color: city ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)" }}
        >
          <MapPin size={15} className="shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
          <span className="truncate max-w-[110px]">{selectedCity.label}</span>
          <ChevronDown size={13} className="shrink-0 transition-transform duration-300"
            style={{ transform: cityOpen ? "rotate(180deg)" : "rotate(0deg)", color: "rgba(255,255,255,0.5)" }} />
        </button>

        {cityOpen && (
          <div
            className="absolute bottom-full mb-2 left-0 rounded-2xl overflow-hidden z-50 min-w-[190px] max-h-72 overflow-y-auto"
            style={{
              background: "rgba(15,20,35,0.92)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            {CITIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => { setCity(c.value); setCityOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/10"
                style={{ color: city === c.value ? "#3b9cf5" : "rgba(255,255,255,0.8)" }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Search Button ── */}
      <div className="p-2 flex items-stretch">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] font-bold text-sm text-white transition-all duration-300 active:scale-95 hover:brightness-110 w-full sm:w-auto justify-center"
          style={{
            background: "linear-gradient(135deg, #3b9cf5 0%, #1e3a8a 100%)",
            boxShadow: "0 4px 20px rgba(59,156,245,0.4)",
          }}
        >
          <Search size={15} />
          {t("search_btn")}
        </button>
      </div>
    </form>

  );
}
