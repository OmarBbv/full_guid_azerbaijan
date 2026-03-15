"use client";

import { useParams } from "next/navigation";
import { Star, MapPin, Heart, ArrowLeft, Share2, Info, Camera, CheckCircle2, ChevronRight, Calendar, Loader2, MessageCircle, Phone, Globe, Instagram, Facebook, Youtube } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { usePlaceById } from "@/hooks/use-places";
import un_photo_1526779259212_939e64788e3c_8ece6282 from "@/assets/unsplash/photo-1526779259212-939e64788e3c_8ece6282.jpg";

export default function PlaceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const locale = params.locale as string;
  const t = useTranslations("VenueDetail");
  const tp = useTranslations("PlacesPage");

  const { data: place, isLoading, isError } = usePlaceById(id, locale);
  const [liked, setLiked] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("about");

  const tabs = useMemo(() => [
    { id: "about", label: t("tab_about") },
    { id: "gallery", label: t("tab_gallery") },
    { id: "reviews", label: t("tab_reviews") }
  ], [t]);

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
        <h1 className="text-3xl font-black text-foreground mb-4">{t("not_found")}</h1>
        <p className="text-muted-foreground mb-8 max-w-md">{t("not_found_desc")}</p>
        <Link href="/mekanlar" className="px-8 py-3 bg-primary text-primary-foreground rounded-2xl font-bold shadow-lg hover:bg-primary/90 transition-all active:scale-95">
          {t("back_to_venues")}
        </Link>
      </div>
    );
  }

  const mainImage = place.thumbnail || (place.images?.[0]?.url) || un_photo_1526779259212_939e64788e3c_8ece6282.src;
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
                {place.type || t("default_type")}
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
                <span className="text-white/60 text-sm font-medium">({place.review_count || 0} {tp("reviews")})</span>
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
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-xl font-bold text-sm capitalize transition-all whitespace-nowrap ${activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab: About */}
            {activeTab === "about" && (
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-card p-8 md:p-10 rounded-[40px] border border-border/50 shadow-xl shadow-black/5">
                  <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                    <Info size={24} className="text-primary" />
                    {t("about_venue")}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                    {place.short_description || t("no_description")}
                  </p>
                </section>
              </div>
            )}

            {/* Tab: Gallery */}
            {activeTab === "gallery" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <section className="bg-card p-8 md:p-10 rounded-[40px] border border-border/50 shadow-xl shadow-black/5">
                  <h2 className="text-2xl font-black text-foreground mb-8 flex items-center gap-3">
                    <Camera size={24} className="text-primary" />
                    {t("photo_gallery")}
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
              {/* Contact Box */}
              <div className="bg-card p-8 rounded-[40px] border border-border/50 shadow-2xl shadow-primary/5">
                <h3 className="text-xl font-black text-foreground mb-6">{t("contact_us")}</h3>

                <div className="space-y-3 mb-8">
                  {place.whatsapp_number && (
                    <a
                      href={`https://wa.me/${place.whatsapp_number.replace(/\+/g, '')}?text=${encodeURIComponent(place.whatsapp_message_template || 'Salam, FullGuide vasitəsilə əlaqə saxlayıram.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-4 bg-[#25D366] text-white rounded-2xl font-black text-sm shadow-xl shadow-green-500/20 hover:shadow-green-500/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={20} fill="currentColor" />
                      {t("whatsapp_action")}
                    </a>
                  )}

                  {place.phone_number && (
                    <a
                      href={`tel:${place.phone_number}`}
                      className="w-full py-4 bg-muted text-foreground rounded-2xl font-black text-sm border border-border/50 hover:bg-muted/80 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <Phone size={18} />
                      {t("call_action")}
                    </a>
                  )}

                  {!place.whatsapp_number && !place.phone_number && (
                    <div className="py-8 text-center text-muted-foreground bg-muted/30 rounded-3xl border border-dashed border-border">
                      <p className="text-sm font-medium">{t("no_contact_info")}</p>
                    </div>
                  )}
                </div>

                {/* Social Media & Website */}
                {(place.website_url || place.social_media) && (
                  <div className="space-y-6 pt-6 border-t border-border/50">
                    {place.website_url && (
                      <a
                        href={place.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                          <Globe size={16} />
                        </div>
                        {t("website")}
                      </a>
                    )}

                    {place.social_media && (
                      <div className="flex gap-3">
                        {place.social_media.instagram && (
                          <a href={place.social_media.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#E1306C] transition-all">
                            <Instagram size={20} />
                          </a>
                        )}
                        {place.social_media.facebook && (
                          <a href={place.social_media.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#1877F2] transition-all">
                            <Facebook size={20} />
                          </a>
                        )}
                        {place.social_media.youtube && (
                          <a href={place.social_media.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-white hover:bg-[#FF0000] transition-all">
                            <Youtube size={20} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-10 pt-10 border-t border-border/50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-foreground">{t("rating")}</span>
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

