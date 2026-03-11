"use client";

import { MapPin, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";

const REGIONS = [
  { slug: "baku", name: "Bakı", description: "Paytaxt şəhəri, qədim -müasır kontrast" },
  { slug: "sheki", name: "Şəki", description: "Ipək yolunun əsas mərkəzı" },
  { slug: "qabala", name: "Qəbələ", description: "Azərbaycandır coğrafi mərkəzi" },
  { slug: "quba", name: "Quba", description: "Dağların əqətində yaşıl bölgə" },
  { slug: "terter", name: "Tərtər", description: "Dördiyas meydanı, tarixi şəhər" },
  { slug: "shamakhi", name: "Şamaxı", description: "Qədim ticarət yolu" },
  { slug: "lankaran", name: "Lənkəran", description: "Tropikal dəniz sahili" },
  { slug: "ganja", name: "Gəncə", description: "İkinci böyük şəhər, mədəniyyət məركizi" },
  { slug: "nakhchivan", name: "Naxçıvan", description: "Qədim vilayət, Türkiyə sərhədi" },
];

export default function RegionsPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16 py-32 px-6" style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <MapPin className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
            Azərbaycandır Bölgələri
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Qafqaz dağlarından tutmuş Xəzər dənizinin sahilində, Azərbaycandır hər bir bölgəsini kəşf edin
          </p>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REGIONS.map((region) => (
            <Link
              key={region.slug}
              href={`/regions/${region.slug}`}
              className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="aspect-video bg-muted overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/40 group-hover:to-accent/40 transition-colors" />
                <MapPin className="absolute inset-0 m-auto w-12 h-12 text-primary/50" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                  {region.name}
                  <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground mt-2">{region.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
