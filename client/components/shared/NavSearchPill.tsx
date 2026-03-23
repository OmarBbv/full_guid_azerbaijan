"use client";

import { useRef, useState } from "react";
import { Search, MapPin, ChevronDown, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useCities } from "@/hooks/use-cities";
import { useCategories } from "@/hooks/use-categories";
import { ChevronRight } from "lucide-react";

// Removed hardcoded localized functions as they are replaced by API hooks and dynamic builders

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (v: string) => void;
  onSubmit: (q: string) => void;
  onClose: () => void;
  locale: string;
}

export function NavSearchPill({ inputRef, query, setQuery, onSubmit, onClose, locale }: Props) {
  const t = useTranslations("HeroSearch");
  const router = useRouter();

  const { data: apiCities = [] } = useCities({ language: locale, active: true });
  const { data: categories = [] } = useCategories(locale);

  const CITIES = [
    { value: "", label: t("all_cities") },
    ...apiCities.map((c: any) => ({
      value: c.name, // Use name instead of id to match backend search expectations
      label: c.name,
    })),
  ];

  // Organize categories into hierarchy
  const buildCategoryHierarchy = () => {
    const root: any[] = [
      { value: "", label: t("type_all"), icon: "✨", id: -1, children: [] },
      { value: "landmark", label: t("type_landmark"), icon: "🏛️", id: -101, children: [] },
      { value: "restaurant", label: t("type_restaurant"), icon: "🍴", id: -102, children: [] },
      { value: "hotel", label: t("type_hotel"), icon: "🏨", id: -103, children: [] },
      { value: "hostel", label: t("type_hostel"), icon: "🛌", id: -104, children: [] },
    ];
    
    // Add default types first if they should be there
    const categoryMap = new Map<number, any>();
    
    categories.forEach((cat: any) => {
      categoryMap.set(cat.id, { 
        value: cat.slug, 
        label: cat.name, 
        icon: cat.icon || "📍", 
        id: cat.id, 
        children: [] 
      });
    });

    const hierarchy: any[] = [];
    categories.forEach((cat: any) => {
      const item = categoryMap.get(cat.id);
      if (cat.parentId && categoryMap.has(cat.parentId)) {
        categoryMap.get(cat.parentId).children.push(item);
      } else {
        hierarchy.push(item);
      }
    });

    return [...root, ...hierarchy];
  };

  const TYPES = buildCategoryHierarchy();

  const [type, setType] = useState("");
  const [expandedCats, setExpandedCats] = useState<number[]>([]);
  const [city, setCity] = useState("");
  const [typeOpen, setTypeOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const selectedType = TYPES.find(tItem => tItem.value === type) ?? TYPES[0];
  const selectedCity = CITIES.find(c => c.value === city) ?? CITIES[0];

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (type) params.set("type", type);
    if (city) params.set("city", city);
    
    // Call props callback if available
    if (onSubmit) onSubmit(query);
    
    onClose();
    
    // navigate using router instead of hard reload
    router.push(`/search?${params.toString()}` as any);
  };

  return (
    <div
      className="w-full flex flex-col md:flex-row items-stretch rounded-2xl md:rounded-full overflow-visible"
      style={{
        background: "rgba(18,20,32,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Text ── */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3.5 min-w-0 border-b border-white/10 md:border-0">
        <Search size={17} className="text-white/40 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          placeholder={t("what_placeholder")}
          className="w-full bg-transparent text-white placeholder-white/35 text-[15px] font-medium outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
            <X size={15} />
          </button>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="hidden md:block w-px self-stretch my-3" style={{ background: "rgba(255,255,255,0.12)" }} />

      {/* ── Type ── */}
      <div className="relative shrink-0 border-b border-white/10 md:border-0" ref={typeRef}>
        <button
          type="button"
          onClick={() => { setTypeOpen(o => !o); setCityOpen(false); }}
          className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 px-4 py-3.5 text-[14px] font-medium whitespace-nowrap"
          style={{ color: type ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
        >
          <span>{selectedType.label}</span>
          <ChevronDown
            size={13}
            className="shrink-0 transition-transform duration-200"
            style={{
              transform: typeOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "rgba(255,255,255,0.4)",
            }}
          />
        </button>

        {typeOpen && (
          <div
            className="absolute top-full mt-1.5 md:left-0 left-4 right-4 md:right-auto rounded-xl overflow-hidden z-50 min-w-[200px] max-h-[400px] overflow-y-auto"
            style={{
              background: "rgba(12,14,26,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              backdropFilter: "blur(24px)",
            }}
          >
            {TYPES.map(tItem => (
              <div key={tItem.value || "all"}>
                <div className="flex items-center hover:bg-white/8 group">
                  <button
                    type="button"
                    onClick={() => { setType(tItem.value); setTypeOpen(false); }}
                    className="flex-1 text-left px-4 py-2.5 text-[13px] flex items-center transition-colors"
                    style={{ color: type === tItem.value ? "#3b9cf5" : "rgba(255,255,255,0.75)" }}
                  >
                    <span className="truncate">{tItem.label}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="hidden md:block w-px self-stretch my-3" style={{ background: "rgba(255,255,255,0.12)" }} />

      {/* ── City ── */}
      <div className="relative shrink-0 border-b border-white/10 md:border-0" ref={cityRef}>
        <button
          type="button"
          onClick={() => { setCityOpen(o => !o); setTypeOpen(false); }}
          className="w-full md:w-auto flex items-center justify-between md:justify-start gap-2 px-4 py-3.5 text-[14px] font-medium whitespace-nowrap"
          style={{ color: city ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
        >
          <div className="flex items-center gap-2">
            <MapPin size={14} style={{ color: "rgba(255,255,255,0.4)" }} className="shrink-0" />
            <span>{selectedCity.label}</span>
          </div>
          <ChevronDown
            size={13}
            className="shrink-0 transition-transform duration-200"
            style={{
              transform: cityOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: "rgba(255,255,255,0.4)",
            }}
          />
        </button>

        {cityOpen && (
          <div
            className="absolute top-full mt-1.5 md:right-0 right-4 left-4 md:left-auto rounded-xl overflow-hidden z-50 min-w-[190px] max-h-64 overflow-y-auto"
            style={{
              background: "rgba(12,14,26,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              backdropFilter: "blur(24px)",
            }}
          >
            {CITIES.map(c => (
              <button
                key={c.value}
                type="button"
                onClick={() => { setCity(c.value); setCityOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-[13px] transition-colors hover:bg-white/8"
                style={{ color: city === c.value ? "#3b9cf5" : "rgba(255,255,255,0.75)" }}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Axtar ── */}
      <div className="p-2 flex items-stretch">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 md:py-2.5 rounded-[12px] md:rounded-[14px] font-bold text-[14px] text-white transition-all active:scale-95 hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #3b9cf5, #1e3a8a)",
            boxShadow: "0 4px 20px rgba(59,156,245,0.35)",
          }}
        >
          <Search size={15} />
          {t("search_btn")}
        </button>
      </div>
    </div>
  );
}
