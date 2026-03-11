"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";

export default function HeroSearchBar() {
  const t = useTranslations("HeroSearch");
  const locale = useLocale();
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [cityOpen, setCityOpen] = useState(false);

  const cities = [
    { key: "city_baku", value: "Baku" },
    { key: "city_ganja", value: "Ganja" },
    { key: "city_sumgayit", value: "Sumgayit" },
    { key: "city_qabala", value: "Qabala" },
    { key: "city_sheki", value: "Sheki" },
    { key: "city_quba", value: "Quba" },
    { key: "city_lankaran", value: "Lankaran" },
    { key: "city_shusha", value: "Shusha" },
    { key: "city_nakhchivan", value: "Nakhchivan" },
    { key: "city_shamakhi", value: "Shamakhi" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (city) params.set("city", city);
    router.push(`/places/search?${params.toString()}` as any);
  };

  const selectedCityLabel = city
    ? cities.find((c) => c.value === city)
        ? t(cities.find((c) => c.value === city)!.key as any)
        : city
    : null;

  return (
    <form
      onSubmit={handleSearch}
      className="hero-search-bar flex flex-col sm:flex-row items-stretch gap-0 w-full max-w-2xl mx-auto"
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
      {/* Field 1: What */}
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

      {/* Divider */}
      <div
        className="hidden sm:block w-px self-stretch my-3"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />

      {/* Field 2: Where city dropdown */}
      <div className="relative flex-shrink-0">
        <button
          type="button"
          onClick={() => setCityOpen((o) => !o)}
          className="flex items-center gap-2 px-4 py-3.5 text-sm font-medium w-full sm:w-auto whitespace-nowrap"
          style={{
            color: selectedCityLabel ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
          }}
        >
          <MapPin size={15} className="shrink-0" style={{ color: "rgba(255,255,255,0.5)" }} />
          <span className="truncate max-w-[120px]">
            {selectedCityLabel || t("where_placeholder")}
          </span>
          <ChevronDown
            size={14}
            className="shrink-0 transition-transform duration-300"
            style={{
              transform: cityOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "rgba(255,255,255,0.5)",
            }}
          />
        </button>

        {cityOpen && (
          <div
            className="absolute bottom-full mb-2 left-0 right-0 rounded-2xl overflow-hidden z-50 min-w-[190px]"
            style={{
              background: "rgba(15,20,35,0.92)",
              backdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            }}
          >
            <button
              type="button"
              onClick={() => { setCity(""); setCityOpen(false); }}
              className="w-full text-left px-4 py-3 text-sm font-medium transition-colors hover:bg-white/10"
              style={{ color: city === "" ? "#3b9cf5" : "rgba(255,255,255,0.6)" }}
            >
              {t("all_cities")}
            </button>
            {cities.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => { setCity(c.value); setCityOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-white/10"
                style={{ color: city === c.value ? "#3b9cf5" : "rgba(255,255,255,0.8)" }}
              >
                {t(c.key as any)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search button */}
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
