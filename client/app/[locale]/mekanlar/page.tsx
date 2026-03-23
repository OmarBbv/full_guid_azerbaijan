"use client";

import { useState, useEffect } from "react";
import { Search, Star, Map, SlidersHorizontal, Loader2, ChevronDown, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { PlaceCard } from "@/components/home/PlaceCard";
import { usePlaces } from "@/hooks/use-places";
import { useCategories } from "@/hooks/use-categories";
import { useCities } from "@/hooks/use-cities";
import { useVenues } from "@/hooks/use-venues";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import AdBannerComponent from "@/components/shared/AdBanner";

const STATIC_CATEGORIES = (t: any) => [
  { id: "hamısı", label: t("all"), icon: "✨" },
  { id: "landmark", label: t("landmark"), icon: "🏛️" },
  { id: "hotel", label: t("hotel"), icon: "🏨" },
  { id: "hostel", label: t("hostel"), icon: "🛌" },
  { id: "restaurant", label: t("restaurant"), icon: "🍴" },
  { id: "nature", label: t("nature"), icon: "🌿" },
];

export default function PlacesPage() {
  const t = useTranslations("PlacesPage");
  const tc = useTranslations("Categories");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const cityParam = searchParams.get("city");
  const queryParam = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState(categoryParam || "hamısı");
  const [activeCity, setActiveCity] = useState(cityParam || "ALL");
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(queryParam || "");

  // URL dəyişəndə state-i yenilə
  useEffect(() => {
    if (categoryParam) setActiveCategory(categoryParam);
    if (cityParam) setActiveCity(cityParam);
    if (queryParam) setSearchQuery(queryParam);
  }, [categoryParam, cityParam, queryParam]);

  const { data: dynamicCategories = [] } = useCategories(locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  const { data: allPlaces, isLoading: isLoadingPlaces } = usePlaces({
    language: locale
  });

  const { data: venuesData, isLoading: isLoadingVenues } = useVenues();
  const allVenues = venuesData?.data || [];

  const isLoading = isLoadingPlaces || isLoadingVenues;

  const categories = [
    ...STATIC_CATEGORIES(tc),
    ...dynamicCategories.map(cat => ({
      id: cat.slug,
      label: cat.name,
      icon: "📍"
    }))
  ];

  const normalizedPlaces = [
    ...(allPlaces || []).map(p => ({
      ...p,
      displayTitle: p.title,
      displayDescription: p.short_description,
      isPlaceEntity: true
    })),
    ...allVenues.map(v => ({
      ...v,
      id: v.id ? v.id.toString() : 'new',
      title: v.name,
      short_description: v.description || '',
      displayTitle: v.name,
      displayDescription: v.description || '',
      type: v.category?.slug || 'other',
      isPlaceEntity: false
    }))
  ];

  const filteredItems = normalizedPlaces.filter(item => {
    const isStaticCategory = STATIC_CATEGORIES(tc).some(c => c.id === activeCategory);

    let matchesCategory = false;
    if (activeCategory === "hamısı") {
      matchesCategory = true;
    } else if (isStaticCategory) {
      matchesCategory = item.type?.toLowerCase() === activeCategory.toLowerCase();
    } else {
      matchesCategory =
        (item as any).category?.slug === activeCategory ||
        (item as any).subCategory?.slug === activeCategory;
    }

    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.short_description?.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesCity = true;
    if (activeCity !== "ALL") {
      matchesCity = item.city === activeCity;
    }

    return matchesCategory && matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        <section className="pt-32 pb-8 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center w-full max-w-2xl mx-auto shadow-xl shadow-primary/5 rounded-2xl bg-card border border-border/50 group hover:border-primary/50 transition-colors">
              <div className="pl-5 pr-2 py-4 text-muted-foreground group-focus-within:text-primary transition-colors">
                <Search size={22} />
              </div>
              <input
                type="text"
                placeholder={t("search_placeholder")}
                className="w-full bg-transparent border-none outline-none py-4 px-2 text-foreground placeholder:text-muted-foreground/60 text-lg font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="pr-4 hidden sm:block">
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg active:scale-95">
                  {t("search_btn")}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between mb-10">
            {/* Categories (Scrollable) */}
            <div
              onMouseDown={(e) => {
                const el = e.currentTarget;
                let isDown = true;
                let startX = e.pageX - el.offsetLeft;
                let scrollLeft = el.scrollLeft;

                const onMouseMove = (e: MouseEvent) => {
                  if (!isDown) return;
                  e.preventDefault();
                  const x = e.pageX - el.offsetLeft;
                  const walk = (x - startX) * 2;
                  el.scrollLeft = scrollLeft - walk;
                };

                const onMouseUp = () => {
                  isDown = false;
                  window.removeEventListener('mousemove', onMouseMove);
                  window.removeEventListener('mouseup', onMouseUp);
                };

                window.addEventListener('mousemove', onMouseMove);
                window.addEventListener('mouseup', onMouseUp);
              }}
              className="flex gap-3 overflow-x-auto pb-4 pt-2 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide w-full cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap shrink-0 active:scale-95"
                  style={{
                    background: activeCategory === cat.id ? "var(--primary)" : "var(--card)",
                    color: activeCategory === cat.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                    border: `1px solid ${activeCategory === cat.id ? "transparent" : "var(--border)"}`,
                    boxShadow: activeCategory === cat.id ? "0 8px 24px rgba(30,58,138,0.25)" : "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="text-base">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <AdBannerComponent position="kateqoriya_ust" className="mb-8" />

          {/* Results Info */}
          <div className="mb-8 flex items-center justify-between text-muted-foreground">
            <p className="font-medium">
              {isLoading ? (
                <span className="flex items-center gap-2"><Loader2 size={16} className="animate-spin" /> ...</span>
              ) : (
                <><span className="text-foreground font-bold">{filteredItems.length}</span> {t("found_count")}</>
              )}
            </p>
            {/* City Dropdown Filter */}
            <div className="relative z-20">
              <button
                onClick={() => setCityDropdownOpen((v) => !v)}
                className="flex items-center gap-3 px-5 py-2.5 bg-card border border-border rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all min-w-[160px] justify-between"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {activeCity === 'ALL' ? 'Bütün Şəhərlər' : activeCity}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${cityDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown Menu */}
              {cityDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 max-h-64 overflow-y-auto bg-card border border-border rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => { setActiveCity('ALL'); setCityDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${activeCity === 'ALL'
                      ? 'bg-primary text-primary-foreground focus:bg-primary'
                      : 'hover:bg-muted text-foreground'
                      }`}
                  >
                    <span>Bütün Şəhərlər</span>
                    <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
                      {normalizedPlaces.length}
                    </span>
                  </button>
                  {cities.map((city) => {
                    const isActive = activeCity === city.name;
                    // Count items in this city
                    const count = normalizedPlaces.filter(p => p.city === city.name).length;
                    return (
                      <button
                        key={city.id}
                        onClick={() => { setActiveCity(city.name); setCityDropdownOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors border-t border-border/50 ${isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                          }`}
                      >
                        <span className="truncate">{city.name}</span>
                        <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-4/5 bg-muted animate-pulse rounded-[40px]" />
              ))}
            </div>
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item, i) => (
                <PlaceCard key={item.id} place={item as any} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border/50 border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 text-3xl">
                🔍
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{t('no_results_title')}</h3>
              <p className="text-muted-foreground max-w-md">{t('no_results_desc')}</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("hamısı"); }}
                className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                {t('clear_btn')}
              </button>
            </div>
          )}

          {!isLoading && filteredItems.length > 10 && (
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3.5 bg-card border border-border rounded-xl text-foreground font-bold hover:bg-muted transition-colors shadow-sm flex items-center gap-2">
                {t('load_more')}
              </button>
            </div>
          )}

        </section>
      </div>

      <style jsx global>{`
        .place-card {
          background: var(--card);
          border: 1px solid color-mix(in srgb, var(--border) 50%, transparent);
          box-shadow: 0 4px 24px rgba(0,0,0,0.04);
          transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .place-card:hover {
          box-shadow: 0 24px 48px rgba(0,0,0,0.12);
          transform: translateY(-8px);
          border-color: color-mix(in srgb, var(--primary) 30%, transparent);
        }
        .place-card-body {
          background: var(--card);
        }
        .group-hover\:scale-108:hover {
          transform: scale(1.08);
        }
        /* Hide scrollbar for category list */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
