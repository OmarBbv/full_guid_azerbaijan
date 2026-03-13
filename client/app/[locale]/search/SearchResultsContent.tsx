"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { Search, MapPin, Star, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { useSearch } from "@/hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";

const TYPE_OPTIONS = [
  { value: "", label: "Hamısı", icon: "✨" },
  { value: "restaurant", label: "Restoranlar", icon: "🍴" },
  { value: "hotel", label: "Otellər", icon: "🏨" },
  { value: "hostel", label: "Hostellər", icon: "🛌" },
  { value: "venue", label: "Məkanlar", icon: "📍" },
  { value: "landmark", label: "Tarixi", icon: "🏛️" },
  { value: "nature", label: "Təbiət", icon: "🌿" },
];



export default function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();

  const initialQ = searchParams.get("q") ?? "";
  const initialCity = searchParams.get("city") ?? "";
  const initialType = searchParams.get("type") ?? "";

  const [q, setQ] = useState(initialQ);
  const [city, setCity] = useState(initialCity);
  const [type, setType] = useState(initialType);

  const debouncedQ = useDebounce(q, 350);
  const debouncedCity = useDebounce(city, 350);

  const { data, isLoading, isFetching } = useSearch({
    q: debouncedQ || undefined,
    city: debouncedCity || undefined,
    type: type || undefined,
    language: locale,
    limit: 50,
  });

  const results = data?.results ?? [];
  const total = data?.total ?? 0;

  // Sync URL on search change
  useEffect(() => {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (city) p.set("city", city);
    if (type) p.set("type", type);
    router.replace(`/search?${p.toString()}` as any, { scroll: false });
  }, [debouncedQ, debouncedCity, type]);

  const handleCardClick = (item: { kind: string; slug: string; type: string }) => {
    if (item.kind === "venue") {
      router.push(`/mekanlar/${item.slug}` as any);
    } else {
      const baseMap: Record<string, string> = {
        restaurant: "/places/restaurants",
        hotel: "/places/hotels",
        hostel: "/places/hostels",
        landmark: "/places/landmarks",
      };
      const base = baseMap[item.type] || "/mekanlar";
      router.push(`${base}/${item.slug}` as any);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Search Header ── */}
      <div
        className="relative py-28 px-6 flex flex-col items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #0f172a 100%)",
        }}
      >
        {/* decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-600/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-600/15 blur-[100px] pointer-events-none" />

        <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight text-center">
          Axtarış Nəticələri
        </h1>
        <p className="text-white/50 text-base mb-10 text-center">
          {isLoading || isFetching
            ? "Axtarılır..."
            : total > 0
              ? `${total} nəticə tapıldı`
              : "Heç bir nəticə tapılmadı"}
        </p>

        {/* ── Big Search Bar ── */}
        <div
          className="w-full max-w-3xl flex flex-col sm:flex-row gap-2 p-2 rounded-2xl z-10"
          style={{
            background: "rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {/* Text input */}
          <div className="flex-1 flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3">
            <Search size={18} className="text-white/50 shrink-0" />
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Restoran, otel, məkan..."
              className="w-full bg-transparent text-white placeholder-white/40 text-sm outline-none"
            />
            {q && (
              <button onClick={() => setQ("")}>
                <X size={15} className="text-white/40 hover:text-white" />
              </button>
            )}
          </div>

          {/* City input */}
          <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 sm:w-44">
            <MapPin size={16} className="text-white/50 shrink-0" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Şəhər..."
              className="w-full bg-transparent text-white placeholder-white/40 text-sm outline-none"
            />
          </div>

          {/* Search btn */}
          <button
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all active:scale-95"
            style={{ background: "linear-gradient(135deg,#3b9cf5,#1e3a8a)", boxShadow: "0 4px 20px rgba(59,156,245,0.4)" }}
          >
            <Search size={16} />
            Axtar
          </button>
        </div>

        {/* ── Type pills ── */}
        <div className="flex flex-wrap gap-2 mt-5 justify-center">
          {TYPE_OPTIONS.map((opt) => {
            const active = type === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                style={{
                  background: active ? "rgba(59,156,245,0.85)" : "rgba(255,255,255,0.08)",
                  color: active ? "#fff" : "rgba(255,255,255,0.65)",
                  border: `1px solid ${active ? "rgba(59,156,245,0.6)" : "rgba(255,255,255,0.12)"}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                <span>{opt.icon}</span>
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {isLoading || (isFetching && results.length === 0) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-muted animate-pulse aspect-[4/5]" />
            ))}
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Nəticə tapılmadı</h2>
            <p className="text-muted-foreground max-w-sm">
              {q || city || type
                ? "Bu axtarışa uyğun nəticə yoxdur. Başqa söz sınayın."
                : "DB-də hələ heç bir məlumat yoxdur."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((item) => {
              const typeMeta = TYPE_OPTIONS.find(t => t.value === item.type) || { icon: "📍", label: item.type };
              return (
                <div
                  key={`${item.kind}-${item.id}`}
                  onClick={() => handleCardClick(item)}
                  className="group relative bg-card border border-border rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 overflow-hidden bg-muted">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl bg-gradient-to-br from-muted to-muted/50">
                        {typeMeta.icon}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Type badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                      {typeMeta.icon} {typeMeta.label}
                    </div>

                    {/* Rating badge */}
                    {item.rating > 0 && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-white"
                        style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}>
                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                        {item.rating.toFixed(1)}
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3 className="font-bold text-base text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    {item.city && (
                      <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin size={11} />
                        {item.city}
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-medium">
                        {item.kind === "venue" ? "Məkan" : "Yer"}
                      </span>
                      <span className="text-primary text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Bax <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
