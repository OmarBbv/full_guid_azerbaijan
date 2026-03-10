"use client";

import { useParams } from "next/navigation";
import { Star, MapPin, Heart, ArrowLeft, Share2, Info, Camera, CheckCircle2, ChevronRight, Calendar, Loader2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState, useEffect } from "react";
import { usePlaceById } from "@/hooks/use-places";
import un_photo_1526779259212_939e64788e3c_8ece6282 from "@/assets/unsplash/photo-1526779259212-939e64788e3c_8ece6282.jpg";

export default function PlaceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const locale = params.locale as string;

  const { data: place, isLoading, isError } = usePlaceById(id, locale);
  const [liked, setLiked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("haqqında");

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved && place) {
      const favorites = JSON.parse(saved) as (number | string)[];
      setLiked(favorites.includes(place.id));
    }
  }, [place?.id]);

  const toggleLike = () => {
    if (!place) return;

    const saved = localStorage.getItem("favorites");
    let favorites = saved ? (JSON.parse(saved) as (number | string)[]) : [];

    if (favorites.includes(place.id)) {
      favorites = favorites.filter(fid => fid !== place.id);
      setLiked(false);
    } else {
      favorites.push(place.id);
      setLiked(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    window.dispatchEvent(new Event("storage_favorites_updated"));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !place) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 text-4xl">
          🔍
        </div>
        <h1 className="text-3xl font-black text-foreground mb-4">Məkan tapılmadı</h1>
        <p className="text-muted-foreground mb-8 max-w-md">Axtardığınız məkan bazamızda mövcud deyil və ya silinmiş ola bilər.</p>
        <Link href="/mekanlar" className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95">
          Məkanlara qayıt
        </Link>
      </div>
    );
  }

  const mainImage = place.thumbnail || (place.images?.[0]?.url) || un_photo_1526779259212_939e64788e3c_8ece6282;
  const accentColor = place.accent_color || "#3b9cf5";

  return (
    <div className="min-h-screen bg-background pb-20 selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[75vh] w-full overflow-hidden">
        <img
          src={mainImage}
          alt={place.title}
          className="w-full h-full object-cover transition-transform duration-1000 scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />

        {/* Floating Header Actions */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link
              href="/mekanlar"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90"
            >
              <ArrowLeft size={22} />
            </Link>
            <div className="flex gap-3">
              <button
                onClick={toggleLike}
                className={`w-12 h-12 rounded-full backdrop-blur-xl border border-white/20 flex items-center justify-center transition-all active:scale-90 ${liked ? 'bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/40' : 'bg-white/10 text-white hover:bg-white/20'}`}
              >
                <Heart size={22} className={liked ? "fill-current" : ""} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-90">
                <Share2 size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 pb-24 md:pb-40 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest shadow-lg">
                {place.type || 'Məkan'}
              </span>
              {place.subtitle && (
                <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                  {place.subtitle}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
              {place.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <MapPin size={18} className="text-primary" />
                <span className="font-semibold">{place.city}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                <Star size={18} className="text-yellow-400 fill-yellow-400" />
                <span className="font-bold">{place.average_rating || 0}</span>
                <span className="text-white/60 text-sm font-medium">({place.review_count || 0} rəy)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 -mt-14 md:-mt-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tabs Navigation */}
            <div className="bg-card p-2 md:p-2.5 rounded-3xl border border-border/50 flex gap-2 shadow-2xl shadow-black/10 overflow-x-auto scrollbar-hide">
              {["haqqında", "qalereya", "rəylər"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-bold text-sm capitalize transition-all whitespace-nowrap ${activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab: Haqqında */}
            {activeTab === "haqqında" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-card p-8 md:p-10 rounded-[40px] border border-border/50 shadow-xl shadow-black/5">
                  <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                    <Info size={24} className="text-primary" />
                    Məkan Haqqında
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {place.short_description || "Bu məkan haqqında geniş məlumat hazırlanır."}
                  </p>
                </section>
              </div>
            )}

            {/* Tab: Qalereya */}
            {activeTab === "qalereya" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-card p-8 md:p-10 rounded-[40px] border border-border/50 shadow-xl shadow-black/5">
                  <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
                    <Camera size={24} className="text-primary" />
                    Foto Qalereya
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(place.images && place.images.length > 0 ? place.images.map(img => img.url) : [mainImage]).map((img: string, i: number) => (
                      <div key={i} className="group relative aspect-square rounded-3xl overflow-hidden cursor-zoom-in bg-muted">
                        <img
                          src={img}
                          alt={`${place.title} - ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:block">
            <div className="sticky top-32 space-y-6">
              {/* Plan Box */}
              <div className="bg-card p-8 rounded-[40px] border border-border/50 shadow-2xl shadow-primary/5">
                <h3 className="text-xl font-black text-foreground mb-6">Ziyarəti Planla</h3>

                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-muted/40 rounded-2xl border border-border/50 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">İş Vaxtı</span>
                    <span className="font-bold text-foreground">09:00 - 18:00 (Hər gün)</span>
                  </div>
                  <div className="p-4 bg-muted/40 rounded-2xl border border-border/50 flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Giriş Qiyməti</span>
                    <span className="font-bold text-foreground">5 AZN - 15 AZN</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2">
                    <Calendar size={18} />
                    İndi Rezerv Et
                  </button>
                  <button className="w-full py-4 bg-card border border-border hover:bg-muted rounded-2xl font-black text-sm transition-all active:scale-95 flex items-center justify-center gap-2">
                    <MapPin size={18} className="text-primary" />
                    Xəritədə Bax
                  </button>
                </div>

                <div className="mt-10 pt-10 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-foreground">Qiymətləndirmə</span>
                    <div className="flex items-center gap-1 text-primary">
                      <Star size={14} className="fill-current" />
                      <span className="text-sm font-black">{place.average_rating || 0} / 5</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${(Number(place.average_rating || 0) / 5) * 100}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

