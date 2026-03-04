"use client";

import { useParams } from 'next/navigation';
import { Bed, Star, MapPin, Phone, MessageCircle, ChevronLeft, Wifi, Coffee, Utensils, Waves, Globe, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const hotelData: Record<string, any> = {
  "fairmont-baku": {
    title: "Fairmont Baku, Flame Towers",
    subtitle: "Bakının Modern Simvolu",
    description: "Alov Qüllələri kompleksinin bir hissəsi olan Fairmont Baku, müasir Azərbaycanın simvolu hesab olunur. 5 ulduzlu bu otel, Xəzər dənizinə və bütün paytaxta açılan misilsiz panoramik mənzərəsi, həmçinin yüksək səviyyəli SPA xidmətləri ilə tanınır.",
    image: "https://images.unsplash.com/photo-1542314831-c6a4d404b8df?auto=format&fit=crop&q=80&w=2000",
    phone: "+994 12 565 48 48",
    whatsapp: "994125654848",
    address: "Mehdi Hüseyn küç. 1A, Alov Qüllələri, Bakı",
    rating: 4.8,
    reviews: 3450,
    priceRange: "$250 - $1200",
    features: ["Açıq/Qapalı hovuz", "Xəzər mənzərəsi", "Eleqant SPA", "Executive Lounge", "Modern Fitness Center"],
  },
  "four-seasons-baku": {
    title: "Four Seasons Hotel Baku",
    subtitle: "Xəzər Sahilində Neoklassik Dəbdəbə",
    description: "Bakı Bulvarının və İçərişəhərin kəsişməsində yerləşən Four Seasons, Fransız Beaux-Arts memarlıq üslubunda inşa edilmişdir. Otel, klassik lüksü müasir innovasiyalarla birləşdirərək dünyanın ən elit qonaqlama təcrübələrindən birini təqdim edir.",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2000",
    phone: "+994 12 404 24 24",
    whatsapp: "994124042424",
    address: "Neftçilər Prospekti 1, Bakı",
    rating: 4.9,
    reviews: 1800,
    priceRange: "$350 - $2500",
    features: ["Bentley Transfer", "Zafferano Restoranı", "Roma stilində hovuz", "Butler xidməti", "İçərişəhər mənzərəsi"],
  }
};

export default function HotelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const hotel = hotelData[id];

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Otel tapılmadı</h1>
        <Link href="/places/hotels" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Otellərə qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-12" style={{ height: "70dvh", minHeight: 500 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={hotel.image}
            alt={hotel.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/hotels" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> Geri
          </Link>

          <div className="flex items-center gap-2 text-yellow-500 mb-4 bg-yellow-500/10 backdrop-blur-md px-4 py-1 rounded-full border border-yellow-500/20">
            <Star className="w-4 h-4 fill-yellow-500" />
            <span className="font-bold">{hotel.rating}</span>
            <span className="text-white/60 text-sm">({hotel.reviews} rəy)</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl uppercase italic">
            {hotel.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {hotel.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content - Main Info */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">Haqqında</h2>
            <p className="text-muted-foreground text-lg leading-relaxed italic">
              {hotel.description}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">İmkanlar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {hotel.features.map((f: string, i: number) => (
                <div key={i} className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10 hover:border-primary/30 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <Bed className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm leading-tight">{f}</span>
                </div>
              ))}
              <div className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10">
                <Wifi className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500" />
                <span className="font-bold text-sm">High-Speed Wi-Fi</span>
              </div>
              <div className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10">
                <Waves className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500" />
                <span className="font-bold text-sm">Hovuz & SPA</span>
              </div>
            </div>
          </section>

          <section className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 relative overflow-hidden">
            <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-primary/5" />
            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-4 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-primary" />
                Rezervasiya Zəmanəti
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                FGA üzərindən etdiyiniz bütün rezervasiyalar rəsmi tərəfdaşlarımız tərəfindən doğrulanır və sizə ən aşağı qiymət zəmanəti verilir.
              </p>
            </div>
          </section>
        </div>

        {/* Right Content - Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border/10 rounded-[2.5rem] p-8 shadow-2xl sticky top-28">
            <div className="mb-8">
              <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Başlayan Qiymətlər</p>
              <p className="text-4xl font-black">{hotel.priceRange.split(' - ')[0]} <span className="text-sm text-muted-foreground font-normal">/ gecə</span></p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Ünvan</p>
                  <p className="font-bold">{hotel.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-2xl">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Əlaqə</p>
                  <p className="font-bold">{hotel.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${hotel.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-black text-white dark:bg-white dark:text-black rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                İndi Rezerv Et
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-3 w-full py-5 border border-border rounded-2xl font-bold hover:bg-secondary transition-all"
              >
                <MessageCircle className="w-5 h-5" /> Sualım Var
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
