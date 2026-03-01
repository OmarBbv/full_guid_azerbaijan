"use client";

import { useState } from "react";
import Azerbaijan from "@react-map/azerbaijan";

export default function InteractiveMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-pill mb-4 inline-block">🗺️ Xəritə</span>
          <h2 className="section-title">
            Azərbaycanın <span className="section-title-accent">Bölgələri</span>
          </h2>
          <p className="section-desc mx-auto mt-4 text-center">
            İnteraktiv xəritə üzərindən istədiyiniz bölgəni seçib kəşf edə bilərsiniz.
          </p>
        </div>

        <div className="relative w-full aspect-video flex items-center justify-center p-4">
          {/* Map box */}
          <div className="w-full max-w-4xl h-full flex items-center justify-center relative">
            <div
              className="w-full flex justify-center [&_.map]:drop-shadow-[0_20px_30px_rgba(0,0,0,0.1)]"
            >
              <Azerbaijan
                type="select-single"
                size={800}
                mapColor="#e2e8f0"
                strokeColor="#ffffff"
                strokeWidth={1.5}
                hoverColor="#ef4444"
                selectColor="#dc2626"
                hints={true}
                hintTextColor="#0f172a"
                hintBackgroundColor="#ffffff"
                hintPadding="10px 16px"
                hintBorderRadius={12}
                onSelect={(state) => setActiveRegion(state)}
              />
            </div>

            {/* Displaying selected region clearly at bottom if selected */}
            {activeRegion && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-border flex items-center gap-3 animate-in slide-in-from-bottom flex-wrap text-center"
              >
                <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse" />
                <span className="text-foreground font-bold text-sm tracking-wide">
                  Seçilmiş Bölgə: <span className="text-red-600">{activeRegion}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
