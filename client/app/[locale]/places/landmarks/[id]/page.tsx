"use client";

import { useParams } from 'next/navigation';
import { Castle, Camera, MapPin, ChevronLeft, Map as MapIcon, Calendar, Clock, Info, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

const landmarkData: Record<string, any> = {
  "icharisheher": {
    title: "İçərişəhər",
    subtitle: "Bakının Qədim Qəlbi və UNESCO İrsi",
    description: "İçərişəhər Bakının ən qədim hissəsidir və 2000-ci ildə UNESCO-nun Ümumdünya İrsi siyahısına daxil edilmişdir. Burada məşhur Qız Qalası, Şirvanşahlar Sarayı, qədim məscidlər, hamamlar və karvansaralar yerləşir. Dar küçələr sizi orta əsrlərin abu-havasına aparacaq.",
    image: "https://images.unsplash.com/photo-1620310243292-0b29ce34f2d7?auto=format&fit=crop&q=80&w=2000",
    address: "İçərişəhər, Bakı",
    workingHours: "24/7 (Açıq səma altında muzey)",
    entryFee: "Muzeylər üçün ödənişlidir",
    tags: ["Tarix", "UNESCO", "Memarlıq", "Muzey"],
  },
  "heydar-aliyev-center": {
    title: "Heydər Əliyev Mərkəzi",
    subtitle: "Dünya Memarlığının Möhtəşəm İncisi",
    description: "Məşhur memar Zaha Hadid tərəfindən layihələndirilmiş bu mərkəz modern Bakının rəmzidir. Binanın axıcı forması, kəskin künclərin olmaması onun sonsuzluğu simvolizə etdiyini göstərir. İçərisində Azərbaycan mədəniyyətini, tarixini və müasir sənəti əks etdirən geniş sərgi salonları var.",
    image: "https://images.unsplash.com/photo-1608688404284-82ea4ba6644f?auto=format&fit=crop&q=80&w=2000",
    address: "Heydər Əliyev prospekti 1, Bakı",
    workingHours: "11:00 - 19:00 (Bazar ertəsi bağlıdır)",
    entryFee: "15 AZN - 25 AZN",
    tags: ["Modern", "Sənət", "Sərgi", "Dizayn"],
  },
  "gobustan": {
    title: "Qobustan Milli Parkı",
    subtitle: "Bəşəriyyətin Daş Yaddaşı",
    description: "Qobustan Dövlət Tarixi-Bədii Qoruğu qədim insanların yaşayış tərzini əks etdirən 6000-dən çox qayaüstü təsviri (petroqlifləri) ilə tanınır. Bu şəkillər ovçuluq, balıqçılıq və məişət səhnələrini təsvir edir. Park ərazisində həmçinin unikal palçıq vulkanları da mövcuddur.",
    image: "https://images.unsplash.com/photo-1614088037466-2616f73db915?auto=format&fit=crop&q=80&w=2000",
    address: "Qaradağ rayonu, Qobustan qəsəbəsi",
    workingHours: "10:00 - 17:00",
    entryFee: "10 AZN",
    tags: ["Arxeologiya", "Təbiət", "Qayaüstü Rəsmlər"],
  }
};

export default function LandmarkDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const landmark = landmarkData[id];

  if (!landmark) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">Məkan tapılmadı</h1>
        <Link href="/places/landmarks" className="text-primary hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Geri qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-12" style={{ height: "80dvh", minHeight: 600 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.8) 100%)" }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0 text-amber-500">
          <Image
            src={landmark.image}
            alt={landmark.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-24 text-center px-4 max-w-5xl mx-auto">
          <Link href="/places/landmarks" className="absolute top-28 left-4 text-white/80 hover:text-white flex items-center gap-2 bg-black/20 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 active:scale-95 transition-all">
            <ChevronLeft className="w-5 h-5" /> Geri
          </Link>

          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {landmark.tags.map((tag: string, i: number) => (
              <span key={i} className="px-5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-black tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl">
            {landmark.title}
          </h1>
          <p className="text-xl md:text-3xl text-white/90 font-medium drop-shadow-md italic">
            {landmark.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h2 className="text-4xl font-black mb-8 border-l-8 border-primary pl-6 leading-none">Məkan haqqında</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground text-xl leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary">
                {landmark.description}
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border/10 rounded-[2.5rem] shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Giriş Saatları</h3>
              <p className="text-muted-foreground">{landmark.workingHours}</p>
            </div>
            <div className="p-8 bg-card border border-border/10 rounded-[2.5rem] shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Giriş haqqı</h3>
              <p className="text-muted-foreground">{landmark.entryFee}</p>
            </div>
          </section>

          <section className="relative overflow-hidden group rounded-[3rem] aspect-video">
            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-16 h-16 animate-pulse" />
            </div>
            <Image
              src={landmark.image}
              alt="Gallery"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          <div className="bg-card border border-border/10 rounded-[3rem] p-10 shadow-2xl sticky top-28">
            <h3 className="text-2xl font-black mb-8">Ziyarət Et</h3>

            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary w-6 h-6 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-black mb-1">Məkan</p>
                  <p className="font-bold text-lg">{landmark.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Calendar className="text-primary w-6 h-6 mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-black mb-1">Mövsüm</p>
                  <p className="font-bold text-lg">Bütün il boyunca</p>
                </div>
              </div>
            </div>

            <button className="flex items-center justify-center gap-3 w-full py-5 bg-primary text-primary-foreground rounded-2xl font-black text-xl hover:scale-[1.03] active:scale-95 transition-all shadow-xl shadow-primary/20">
              <MapIcon className="w-6 h-6" />
              Xəritədə Tap
            </button>

            <div className="mt-10 p-6 bg-muted rounded-2xl border border-border/40">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="text-primary w-5 h-5" />
                <span className="font-bold">Rəsmi Bələdçi</span>
              </div>
              <p className="text-sm text-muted-foreground">İçərişəhər və Qobustan üçün rəsmi bələdçi sifarişi FGA üzərindən mümkündür.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
