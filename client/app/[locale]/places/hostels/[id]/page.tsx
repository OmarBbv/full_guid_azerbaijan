"use client";

import { useParams } from 'next/navigation';
import { Backpack, MapPin, Phone, MessageCircle, ChevronLeft, Wifi, Users, Shield, Coffee, Zap, Info, Star } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const hostelData: Record<string, any> = {
  "sahil-hostel": {
    title: "Sahil Hostel & Hotel",
    subtitle: "Bakının Qəlbində Müasir və Səmimi",
    description: "Sahil Hostel Bakının ən populyar və müasir hostellərindən biridir. Tarqovıy küçəsinə və Bulvara cəmi 2 dəqiqəlik piyada məsafədə yerləşir. Həm ortaq yatılı otaqlar, həm də fərdi otel otaqları təklif edən bu məkan səyyahlar üçün əsl tapıntıdır.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80&w=2000",
    phone: "+994 12 598 00 00",
    whatsapp: "994125980000",
    address: "Zərifə Əliyeva küç. 27, Bakı",
    rating: 4.9,
    reviews: 1560,
    priceRange: "€15 - €45",
    features: ["Böyük Sosial Zona", "Yüksək Sürətli Wi-Fi", "Mətbəx", "Şəxsi Kilidli Şkaflar", "24/7 Resepşn"],
  },
  "kichik-qala": {
    title: "Kichik Qala 98",
    subtitle: "Tarixin İçində Qonaqlama",
    description: "İçərişəhərin qədim divarları arasında, UNESCO-nun qoruduğu ərazidə yerləşən bu hostel sizə əsl Bakı ab-havasını yaşadacaq. Tarixi binada yerləşən otaqlar həm keçmişin ruhunu qoruyur, həm də müasir komfort təqdim edir.",
    image: "https://images.unsplash.com/photo-1510323334692-284fb835db5f?auto=format&fit=crop&q=80&w=2000",
    phone: "+994 55 200 10 10",
    whatsapp: "994552001010",
    address: "Kiçik Qala küç. 98, İçərişəhər, Bakı",
    rating: 4.7,
    reviews: 420,
    priceRange: "€20 - €60",
    features: ["Tarixi Məkan", "Teras Kafe", "Hava Limanı Transferi", "İntensiv Təmizlik", "Tur Təşkili"],
  },
  "cheeky-carabao": {
    title: "Cheeky Carabao Backpackers",
    subtitle: "Ən Əyləncəli Hostelin Ünvanı",
    description: "Bakının ən rəngli və sosial hosteli! Solo səyyahlar üçün ideal olan bu məkanda hər axşam fərqli aktivitələr, film gecələri və oyunlar təşkil olunur. Əgər yeni insanlarla tanış olmaq istəyirsinizsə, bura sizin üçün ən düzgün yerdir.",
    image: "https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&q=80&w=2000",
    phone: "+994 70 888 88 88",
    whatsapp: "994708888888",
    address: "Rüstəm Rüstəmov küç. 12, Bakı",
    rating: 4.8,
    reviews: 980,
    priceRange: "€12 - €30",
    features: ["Bar & Oyun Zonası", "Netflix & PS5", "Həftəlik Partilər", "Dostcanlı Heyət", "Ucuz Qiymət"],
  }
};

export default function HostelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const hostel = hostelData[id];

  if (!hostel) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Hostel tapılmadı</h1>
        <Link href="/places/hostels" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Hostellərə qayıt
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
            src={hostel.image}
            alt={hostel.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/hostels" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> Geri
          </Link>

          <div className="flex items-center gap-2 text-emerald-400 mb-4 bg-emerald-400/10 backdrop-blur-md px-4 py-1 rounded-full border border-emerald-400/20">
            <Star className="w-4 h-4 fill-emerald-400" />
            <span className="font-bold">{hostel.rating}</span>
            <span className="text-white/60 text-sm">({hostel.reviews} rəy)</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tight text-white mb-4 drop-shadow-2xl">
            {hostel.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow-md">
            {hostel.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-3xl font-black mb-6">Məlumat</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {hostel.description}
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-black mb-8">Nə Təklif Edirik?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {hostel.features.map((f: string, i: number) => (
                <div key={i} className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10 hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="font-bold text-sm leading-tight">{f}</span>
                </div>
              ))}
              <div className="flex flex-col gap-3 bg-card p-6 rounded-3xl border border-border/10">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Wifi className="w-5 h-5" />
                </div>
                <span className="font-bold text-sm">Sürətli İnternet</span>
              </div>
            </div>
          </section>

          <section className="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/10">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="text-emerald-500 w-10 h-10" />
              <h2 className="text-2xl font-bold italic">Təhlükəsizlik Zəmanəti</h2>
            </div>
            <p className="text-muted-foreground">
              Bütün hostellərimiz FGA komandası tərəfindən şəxsən yoxlanılmışdır. Təmizlik, təhlükəsizlik və səmimiyyət bizim üçün ən vacib prinsipdir. Hər bir hosteldə şəxsi əşyalarınız üçün kilidli şkaflar (lockers) mövcuddur.
            </p>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border/10 rounded-[2rem] p-8 shadow-xl sticky top-28">
            <div className="mb-8">
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">Bir Gecəlik</p>
              <p className="text-4xl font-black">{hostel.priceRange.split(' - ')[0]}<span className="text-lg text-muted-foreground font-normal">/dan başlayaraq</span></p>
            </div>

            <div className="space-y-5 mb-8">
              <div className="flex items-center gap-4">
                <MapPin className="text-muted-foreground w-5 h-5" />
                <p className="font-bold text-sm">{hostel.address}</p>
              </div>
              <div className="flex items-center gap-4">
                <Users className="text-muted-foreground w-5 h-5" />
                <p className="font-bold text-sm">Gənclər və Solo Səyyahlar</p>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={`https://wa.me/${hostel.whatsapp}?text=Salam, ${hostel.title} hosteli üçün qiymət və boş yerlərlə maraqlanıram.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 transition-all shadow-lg active:scale-95"
              >
                <MessageCircle className="w-6 h-6 fill-white" />
                WhatsApp ilə Yaz
              </a>
              <button className="flex items-center justify-center gap-3 w-full py-4 border border-border rounded-2xl font-bold hover:bg-secondary transition-all">
                Xəritədə Bax
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
