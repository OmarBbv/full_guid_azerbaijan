"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Users, ChevronRight } from "lucide-react";

// Təbiət və Şəhər mənzərələrindən ibarət arxa plan şəkilləri (Premium keyfiyyətdə)
const backgroundImages = [
  "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2000", // Dağ / Təbiət
  "https://images.unsplash.com/photo-1582200215707-c25032d8ed27?q=80&w=2000", // Bakı (Flame Towers)
  "https://images.unsplash.com/photo-1627915352615-3751c11d3f99?q=80&w=2000", // Göygöl
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Şəkillərin hər 5 saniyədən bir avtomatik dəyişməsi
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-dvh min-h-[600px] flex items-center justify-center overflow-hidden">

      {/* Background Images Slider */}
      {backgroundImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <img
            src={src}
            alt={`Hero Background ${index + 1}`}
            className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_infinite_alternate]"
          />
        </div>
      ))}

      {/* Dark Gradient Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 bg-linear-to-b from-black/50 via-transparent to-black/60"></div>

      {/* Hero Content Area */}
      <div className="container relative z-10 mx-auto px-4 sm:px-8 mt-16 max-w-7xl flex flex-col items-center text-center">

        <div className="inline-flex items-center rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-white mb-6 uppercase tracking-widest shadow-xl">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          Azərbaycanı Bizimlə Kəşf Edin
        </div>

        <h1 className="max-w-4xl text-5xl sm:text-6xl md:text-[80px] leading-tight font-bold tracking-tight text-white mb-6 drop-shadow-md">
          Unudulmaz bir
          <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-white/70 italic font-serif opacity-90">
            səyahətə hazır olun
          </span>
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl text-white/80 mb-12 drop-shadow-sm font-light">
          Tarixi abidələrdən ləziz mətbəxə, füsunkar təbiətdən şəhər ab-havasına qədər əsl Azərbaycan ruhunu hiss edin.
        </p>

        {/* Modern Search Concept Box */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 sm:p-3 overflow-hidden">
          <div className="bg-white rounded-xl p-2 sm:p-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-2">

            {/* Input 1: Destination */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">HARA</span>
                <input
                  type="text"
                  placeholder="Şəhər və ya region..."
                  className="w-full bg-transparent border-none text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-0 p-0 h-6"
                />
              </div>
            </div>

            {/* Input 2: Date */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2 border-b sm:border-b-0 sm:border-r border-gray-200">
              <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">ZAMAN</span>
                <input
                  type="text"
                  placeholder="Tarix əlavə edin"
                  className="w-full bg-transparent border-none text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-0 p-0 h-6"
                />
              </div>
            </div>

            {/* Input 3: Guests */}
            <div className="flex-1 w-full flex items-center gap-3 px-4 py-2">
              <Users className="w-5 h-5 text-gray-400 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">KİMLƏRLƏ</span>
                <input
                  type="text"
                  placeholder="Qonaq sayı"
                  className="w-full bg-transparent border-none text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-0 p-0 h-6"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full sm:w-auto mt-2 sm:mt-0 bg-primary hover:bg-primary/90 text-white p-4 rounded-xl flex items-center justify-center gap-2 transition-all group">
              <Search className="w-5 h-5" />
              <span className="sm:hidden font-medium">Axtar</span>
            </button>

          </div>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
        <span className="text-xs font-medium tracking-widest uppercase">Aşağı Keç</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

    </section>
  );
}
