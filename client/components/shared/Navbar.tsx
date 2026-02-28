"use client";

import { Link } from '@/i18n/routing';
import { Map, User, Menu, MapPin, Search, Globe, ChevronRight, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

// Navigasiya linkləri (Azərbaycan versiyasına uyğun)
const navLinks = [
  { id: 'why', label: 'Niyə Azərbaycan', href: '/about' },
  { id: 'destinations', label: 'Məkanlar', href: '/destinations' },
  { id: 'things', label: 'Fəaliyyətlər', href: '/services' },
  { id: 'nature', label: 'Təbiət və Macəra', href: '/nature' },
  { id: 'info', label: 'Faydalı Məlumat', href: '/info' }
];

// Mega Menyudakı məzmunlar
const megaMenuData: Record<string, any> = {
  'why': {
    columns: [
      {
        links: ["Unikal Azərbaycan Folkloru", "UNESCO İrsi Təqdimatı", "Coğrafiya və İqlim", "Odlar Yurdu", "Milli Əlifba və Dil", "Azərbaycan Ədəbiyyatı"]
      },
      {
        links: ["Bənzərsiz Xalq Mədəniyyəti", "Ləziz Azərbaycan Mətbəxi", "Əsas Şəhər və Kəndlər", "Təbiət və Biyoçeşidlilik", "Xəzər Dənizi Sahilləri", "Avropanın ən yüksək kəndi - Xınalıq"]
      },
      {
        links: ["Minillik Şərabçılıq Ənənəsi", "Azərbaycanda 4 Fəsil", "Zəngin Tarixi Keçmiş", "Milli Rəqslərimiz", "Qədim Sivilizasiya İzləri", "Turizm Statistikası"]
      }
    ],
    featured: {
      title: "AZƏRBAYCANI KƏŞF ET",
      image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&q=80",
      linkText: "Səyahətini Planla"
    }
  },
  'destinations': {
    columns: [
      {
        title: "TOP REGİONLAR",
        links: ["Abşeron Yarımadası", "Qarabağ və Şərqi Zəngəzur", "Quba-Xaçmaz", "Lənkəran-Astara", "Şəki-Zaqatala", "İsmayıllı və Qəbələ", "Gəncə-Daşkəsən"]
      },
      {
        title: "TOP ŞƏHƏRLƏR",
        links: ["Bakı", "Şuşa", "Qəbələ", "Şəki", "Gəncə", "Quba", "Lənkəran", "Göygöl"]
      }
    ],
    map: true // Xəritə illüstrasiyası
  },
  'things': {
    columns: [
      {
        title: "KATEQORİYALAR",
        links: ["Mədəniyyət və İncəsənət", "Tarixi Abidələr", "Qida və Şərab", "Sağlamlıq və Spa", "Ailəvi İstirahət", "Şəhər Fəaliyyətləri"]
      },
      {
        title: "TOP MƏKANLAR",
        links: ["İçərişəhər", "Qobustan Qoruğu", "Alov Qüllələri", "Göygöl Milli Parkı", "Şəki Xan Sarayı", "Yanardağ"]
      }
    ],
    featuredImages: [
      {
        title: "Göygöl",
        image: "https://images.unsplash.com/photo-1627915352615-3751c11d3f99?w=500&q=80"
      },
      {
        title: "İçərişəhər",
        image: "https://images.unsplash.com/photo-1582200215707-c25032d8ed27?w=500&q=80"
      }
    ]
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Taymerlər (Hover kəsiləndə animasiyanı idarə etmək üçün)
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (id: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (megaMenuData[id]) {
      setActiveMenu(id);
    } else {
      setActiveMenu(null); // Menusu yoxdursa bağla
    }
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveMenu(null);
    }, 250);
    setHoverTimeout(timeout);
  };

  const handleMenuEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout); // Aşağıdakı menunun içinə girəndə taymeri ləğv et
  };

  return (
    // Bütün Navbarı örtən qrup, bu hissədən çıxanda menu bağlanır
    <div className="group/nav relative" onMouseLeave={handleMouseLeave}>

      {/* Əsas Navbar */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isScrolled || activeMenu ? "bg-background border-b border-border shadow-sm text-foreground" : "bg-transparent border-b border-transparent text-foreground"}`}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between h-14 transition-all duration-300">

            {/* Logo */}
            <div className="shrink-0 flex items-center pr-8">
              <Link href="/" className="flex items-center gap-2 group">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-bold text-xl tracking-tight">
                  FullGuide
                </span>
              </Link>
            </div>

            {/* Orta Linklər */}
            <div className="hidden lg:flex items-center justify-center h-full flex-1 space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="h-full flex items-center relative group/link cursor-pointer"
                  onMouseEnter={() => handleMouseEnter(link.id)}
                >
                  <Link
                    href={link.href}
                    className={`text-[15px] font-semibold transition-colors
                      ${activeMenu === link.id ? 'text-primary' : (isScrolled ? 'text-foreground/80 hover:text-foreground' : 'text-foreground/90 hover:text-foreground')}`}
                    onClick={(e) => {
                      if (megaMenuData[link.id]) { e.preventDefault(); }
                    }}
                  >
                    {link.label}
                  </Link>
                  {/* Qırmızı alt xətt animasiyası */}
                  <span className={`absolute left-0 bottom-0 h-[2px] bg-primary transition-all duration-300 
                    ${activeMenu === link.id ? 'w-full' : 'w-0 group-hover/link:w-full'}`}
                  />
                </div>
              ))}
            </div>

            {/* Sağ Aksiyalar */}
            <div className="hidden lg:flex items-center space-x-6 pl-8">
              <button className="text-foreground/80 hover:text-primary transition-colors">
                <Search className="w-[18px] h-[18px]" />
              </button>
              <button className="text-foreground/80 hover:text-primary transition-colors">
                <Map className="w-[18px] h-[18px]" />
              </button>
              <button className="text-foreground/80 hover:text-primary transition-colors">
                <Heart className="w-[18px] h-[18px]" />
              </button>

              <div className="flex items-center gap-1 font-semibold text-[13px] text-foreground/80 hover:text-primary transition-colors cursor-pointer">
                EN <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Mobil Menu Düyməsi */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-foreground hover:text-primary transition-colors">
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mega Menu Dropdown */}
      <div
        className={`fixed top-14 left-0 w-full bg-background border-b border-border shadow-lg overflow-hidden transition-all duration-300 ease-in-out z-40 origin-top
        ${activeMenu
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-4 invisible'}`}
        onMouseEnter={handleMenuEnter}
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-10 max-h-[calc(100vh-56px)] overflow-y-auto">
          {activeMenu && megaMenuData[activeMenu] && (
            <div className="flex flex-col gap-10">

              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
                {/* Sol Hissə (Sütunlar) */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 flex-1">
                  {megaMenuData[activeMenu].columns.map((col: any, colIdx: number) => (
                    <div key={colIdx} className="flex flex-col gap-4 flex-1">
                      {col.title && (
                        <h4 className="flex items-center gap-2 text-[12px] font-bold text-foreground/50 tracking-widest uppercase mb-1">
                          <MapPin className="w-[14px] h-[14px] text-foreground/30" />
                          {col.title}
                        </h4>
                      )}
                      <div className="flex flex-col gap-3">
                        {col.links.map((link: string, linkIdx: number) => (
                          <Link key={linkIdx} href="#" className="text-[14.5px] font-medium text-foreground/70 hover:text-primary transition-colors">
                            {link}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sağ Hissə (Xüsusi Seçilmiş) */}
                {megaMenuData[activeMenu].featured && (
                  <div className="w-full lg:w-[320px] shrink-0 border-l border-border/40 pl-0 lg:pl-10">
                    <h4 className="flex items-center gap-2 text-[12px] font-bold text-foreground/50 tracking-widest uppercase mb-4">
                      <Globe className="w-[14px] h-[14px] text-foreground/30" />
                      {megaMenuData[activeMenu].featured.title}
                    </h4>
                    <Link href="#" className="group block relative rounded-2xl overflow-hidden aspect-4/3 shadow-md">
                      <img
                        src={megaMenuData[activeMenu].featured.image}
                        alt={megaMenuData[activeMenu].featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                        <span className="font-semibold text-sm">{megaMenuData[activeMenu].featured.linkText}</span>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Regionlar Xəritəsi (Destinations üçün SVG mock) */}
                {megaMenuData[activeMenu].map && (
                  <div className="w-full lg:w-[400px] shrink-0 border-l border-border/40 pl-0 lg:pl-10 flex flex-col justify-center">
                    <h4 className="flex items-center gap-2 text-[12px] font-bold text-foreground/50 tracking-widest uppercase mb-4">
                      <MapPin className="w-[14px] h-[14px] text-foreground/30" />
                      XƏRİTƏ
                    </h4>
                    <div className="opacity-40 hover:opacity-100 transition-opacity p-4 cursor-pointer">
                      {/* Azərbaycan xəritəsi SVG konturu */}
                      <svg viewBox="0 0 200 100" className="w-full h-auto stroke-foreground fill-transparent stroke-1">
                        <path d="M40,30 Q60,10 90,20 T140,25 Q160,35 150,55 T100,75 Q60,80 40,60 Z" />
                        <circle cx="140" cy="40" r="3" className="fill-primary stroke-none animate-pulse" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Top Features (Things to do üçün iki kiçik kart) */}
                {megaMenuData[activeMenu].featuredImages && (
                  <div className="w-full lg:w-[450px] shrink-0 border-l border-border/40 pl-0 lg:pl-10">
                    <h4 className="flex items-center gap-2 text-[12px] font-bold text-foreground/50 tracking-widest uppercase mb-4">
                      <Globe className="w-[14px] h-[14px] text-foreground/30" />
                      AYIN MƏKANLARI
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {megaMenuData[activeMenu].featuredImages.map((item: any, idx: number) => (
                        <Link key={idx} href="#" className="group block relative rounded-2xl overflow-hidden aspect-4/5 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"></div>
                          <div className="absolute top-3 right-3 text-white">
                            <Heart className="w-4 h-4 opacity-70 group-hover:opacity-100" />
                          </div>
                          <div className="absolute bottom-3 left-3 text-white">
                            <span className="font-semibold text-sm">{item.title}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Mega Menu Footer Sub-links */}
              <div className="pt-6 mt-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between text-[13px] font-medium text-foreground/50">
                <div className="flex gap-6 mb-4 sm:mb-0">
                  <a href="#" className="hover:text-primary transition-colors">Facebook</a>
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors">Youtube</a>
                </div>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-primary transition-colors">Tədbirlər</a>
                  <a href="#" className="hover:text-primary transition-colors">Blog</a>
                  <a href="#" className="hover:text-primary transition-colors">Xəbərlər & Media</a>
                  <a href="#" className="hover:text-primary transition-colors">Əlçatanlıq</a>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

    </div>
  );
}
