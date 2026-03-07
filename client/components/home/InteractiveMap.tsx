"use client";

import { useState } from "react";
import { MapPin, Navigation, ArrowRight, Camera } from "lucide-react";
import Azerbaijan from "@react-map/azerbaijan";
import { useTranslations } from "next-intl";



export default function InteractiveMap() {
  const t = useTranslations('Home');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const regionDetails: Record<string, { desc: string, img: string, famous: string }> = {
    "Bakı": {
      desc: t('baku_desc'),
      img: "https://images.unsplash.com/photo-1548625361-58a9a9d27293?q=80&w=800",
      famous: t('baku_famous')
    },
    "Şəki": {
      desc: t('sheki_desc'),
      img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800",
      famous: t('sheki_famous')
    },
    "Qəbələ": {
      desc: t('qabala_desc'),
      img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800",
      famous: t('qabala_famous')
    },
    "Lənkəran": {
      desc: t('lankaran_desc'),
      img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800",
      famous: t('lankaran_famous')
    },
    "Şuşa": {
      desc: t('shusha_desc'),
      img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800",
      famous: t('shusha_famous')
    }
  };

  const defaultData = {
    desc: t('default_map_desc'),
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800",
    famous: t('default_famous')
  };

  const currentData = activeRegion ? (regionDetails[activeRegion] || defaultData) : defaultData;

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Decorative BG */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-pill mb-4 inline-block">🗺️ {t('map_title')}</span>
          <h2 className="section-title">
            {t('azerbaijan_regions')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Side: Info Panel */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative h-full min-h-[450px] flex flex-col justify-center py-6">

              <div key={activeRegion || "default"} className="animate-in fade-in slide-in-from-left duration-700">
                <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                  <MapPin size={14} /> {activeRegion || t('select_region')}
                </div>

                <div className="relative w-full h-64 rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl shadow-black/10">
                  <img src={currentData.img} alt={activeRegion || "Azerbaijan"} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                    <p className="text-white text-xs font-medium flex items-center gap-2 opacity-90">
                      <Camera size={16} /> {t('famous')}: {currentData.famous}
                    </p>
                  </div>
                </div>

                <h3 className="text-3xl font-black text-foreground mb-4">
                  {activeRegion ? `${activeRegion} ${t('region', { fallback: 'Bölgəsi' })}` : t('ready_to_discover', { fallback: 'Kəşfə Hazırsınız?' })}
                </h3>

                <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                  {currentData.desc}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all">
                    {t('explore')} <ArrowRight size={18} />
                  </button>
                  <button className="px-8 py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary/80 transition-all border border-border/50">
                    <Navigation size={18} /> {t('get_directions')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Map */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full flex items-center justify-center p-4 lg:h-[600px]">
              <div className="w-full h-full flex items-center justify-center">
                <div className="[&_.map]:drop-shadow-[0_20px_60px_rgba(0,0,0,0.08)] [&_.map]:transition-transform [&_.map]:duration-700 [&_.map]:scale-90 md:[&_.map]:scale-100 lg:[&_.map]:scale-110 cursor-pointer">
                  <Azerbaijan
                    type="select-single"
                    size={700}
                    mapColor="#f8fafc"
                    strokeColor="#cbd5e1"
                    strokeWidth={1}
                    hoverColor="#3b9cf5"
                    selectColor="#1e3a8a"
                    hints={true}
                    hintTextColor="#ffffff"
                    hintBackgroundColor="#1e3a8a"
                    hintPadding="10px 20px"
                    hintBorderRadius={14}
                    onSelect={(state) => setActiveRegion(state)}
                  />
                </div>
              </div>

              {!activeRegion && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-border animate-bounce pointer-events-none">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground text-xs font-bold uppercase tracking-wider">{t('select_region')}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
