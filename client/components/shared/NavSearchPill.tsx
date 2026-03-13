"use client";

import { useRef, useState } from "react";
import { Search, MapPin, ChevronDown, X } from "lucide-react";

const TYPES = [
  { value: "",            label: "Hər şey",   icon: "✨" },
  { value: "restaurant",  label: "Restoran",  icon: "🍴" },
  { value: "hotel",       label: "Otel",      icon: "🏨" },
  { value: "hostel",      label: "Hostel",    icon: "🛌" },
  { value: "venue",       label: "Məkan",     icon: "📍" },
  { value: "landmark",    label: "Tarixi",    icon: "🏛️" },
  { value: "nature",      label: "Təbiət",    icon: "🌿" },
];

const CITIES = [
  { value: "",             label: "Bütün şəhərlər" },
  { value: "Baku",         label: "Bakı" },
  { value: "Ganja",        label: "Gəncə" },
  { value: "Sumgayit",     label: "Sumqayıt" },
  { value: "Qabala",       label: "Qəbələ" },
  { value: "Sheki",        label: "Şəki" },
  { value: "Quba",         label: "Quba" },
  { value: "Lankaran",     label: "Lənkəran" },
  { value: "Shusha",       label: "Şuşa" },
  { value: "Nakhchivan",   label: "Naxçıvan" },
  { value: "Shamakhi",     label: "Şamaxı" },
];

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  setQuery: (v: string) => void;
  onSubmit: (q: string) => void;
  onClose: () => void;
  locale: string;
}

export function NavSearchPill({ inputRef, query, setQuery, onSubmit, onClose, locale }: Props) {
  const [type, setType]     = useState("");
  const [city, setCity]     = useState("");
  const [typeOpen, setTypeOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const typeRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  const selectedType = TYPES.find(t => t.value === type) ?? TYPES[0];
  const selectedCity = CITIES.find(c => c.value === city) ?? CITIES[0];

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (type)         params.set("type", type);
    if (city)         params.set("city", city);
    onClose();
    // navigate to /search
    window.location.href = `/${locale}/search?${params.toString()}`;
  };

  return (
    <div
      className="w-full flex items-stretch rounded-2xl overflow-visible"
      style={{
        background: "rgba(18,20,32,0.92)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
      }}
    >
      {/* ── Text ── */}
      <div className="flex-1 flex items-center gap-3 px-4 py-3.5 min-w-0">
        <Search size={17} className="text-white/40 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") handleSubmit(); }}
          placeholder="Nə axtarırsınız?"
          className="w-full bg-transparent text-white placeholder-white/35 text-[15px] font-medium outline-none"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-white/30 hover:text-white/60 transition-colors shrink-0">
            <X size={15} />
          </button>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="w-px self-stretch my-3" style={{ background: "rgba(255,255,255,0.12)" }} />

      {/* ── Type ── */}
      <div className="relative shrink-0" ref={typeRef}>
        <button
          type="button"
          onClick={() => { setTypeOpen(o => !o); setCityOpen(false); }}
          className="flex items-center gap-2 px-4 py-3.5 text-[14px] font-medium whitespace-nowrap"
          style={{ color: type ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
        >
          <span>{selectedType.icon}</span>
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
            className="absolute top-full mt-1.5 left-0 rounded-xl overflow-hidden z-50 min-w-[170px]"
            style={{
              background: "rgba(12,14,26,0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              backdropFilter: "blur(24px)",
            }}
          >
            {TYPES.map(t => (
              <button
                key={t.value}
                type="button"
                onClick={() => { setType(t.value); setTypeOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-[13px] flex items-center gap-2.5 transition-colors hover:bg-white/8"
                style={{ color: type === t.value ? "#3b9cf5" : "rgba(255,255,255,0.75)" }}
              >
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div className="w-px self-stretch my-3" style={{ background: "rgba(255,255,255,0.12)" }} />

      {/* ── City ── */}
      <div className="relative shrink-0" ref={cityRef}>
        <button
          type="button"
          onClick={() => { setCityOpen(o => !o); setTypeOpen(false); }}
          className="flex items-center gap-2 px-4 py-3.5 text-[14px] font-medium whitespace-nowrap"
          style={{ color: city ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)" }}
        >
          <MapPin size={14} style={{ color: "rgba(255,255,255,0.4)" }} className="shrink-0" />
          <span>{selectedCity.label}</span>
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
            className="absolute top-full mt-1.5 right-0 rounded-xl overflow-hidden z-50 min-w-[190px] max-h-64 overflow-y-auto"
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
          className="flex items-center gap-2 px-6 py-2.5 rounded-[14px] font-bold text-[14px] text-white transition-all active:scale-95 hover:brightness-110"
          style={{
            background: "linear-gradient(135deg, #3b9cf5, #1e3a8a)",
            boxShadow: "0 4px 20px rgba(59,156,245,0.35)",
          }}
        >
          <Search size={15} />
          Axtar
        </button>
      </div>
    </div>
  );
}
