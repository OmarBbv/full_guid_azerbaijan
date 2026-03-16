"use client";

import { useState } from "react";
import { Search, Star, Map, SlidersHorizontal, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { PlaceCard } from "@/components/home/PlaceCard";
import { usePlaces } from "@/hooks/use-places";
import { useCategories } from "@/hooks/use-categories";
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
  const queryParam = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState(categoryParam || "hamısı");
  const [searchQuery, setSearchQuery] = useState(queryParam || "");

  const { data: dynamicCategories = [] } = useCategories(locale);
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
      matchesCategory = (item as any).category?.slug === activeCategory;
    }

    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.short_description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-0 right-[10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        {/* Simplified Header / Search Section */}
        <section className="pt-32 pb-8 px-6 relative">
          <div className="max-w-7xl mx-auto">
            {/* Search Box - Moved and simplified */}
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

        {/* Content Section */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-6 lg:items-center justify-between mb-10">
            {/* Categories (Scrollable) */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-2 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 whitespace-nowrap active:scale-95"
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
            {/* Sort Dropdown Placeholder */}
            <div className="flex items-center gap-2 text-sm font-medium hover:text-foreground cursor-pointer transition-colors">
              Sırala: Populyarlığa görə <Star size={14} />
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
              <h3 className="text-2xl font-bold text-foreground mb-2">Heç bir məkan tapılmadı</h3>
              <p className="text-muted-foreground max-w-md">Axtarış meyarlarınıza uyğun nəticə yoxdur. Zəhmət olmasa başqa sözlə sınayın və ya filtrləri təmizləyin.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("hamısı"); }}
                className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md"
              >
                Təmizlə
              </button>
            </div>
          )}

          {/* Load More Button */}
          {!isLoading && filteredItems.length > 10 && (
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3.5 bg-card border border-border rounded-xl text-foreground font-bold hover:bg-muted transition-colors shadow-sm flex items-center gap-2">
                Daha çox yüklə
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
