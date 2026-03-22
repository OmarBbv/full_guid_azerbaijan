"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import Azerbaijan from "@react-map/azerbaijan";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  Map as LucideMap,
  MapPin,
  Menu,
  Search,
  User,
  X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, useCallback } from "react";
import { useSearch } from "@/hooks/use-search";
import { useDebounce } from "@/hooks/use-debounce";
import { useCategories } from "@/hooks/use-categories";
import { useCities } from "@/hooks/use-cities";
import { useAboutPages } from "@/hooks/use-about-pages";
import { useGuidePages } from "@/hooks/use-guide-pages";
import { NavSearchPill } from "./NavSearchPill";

const SLUG_TO_MAP_KEY: Record<string, string> = {
  baku: "Bakı",
  "баку": "Bakı",
  sheki: "Şəki",
  "шеки": "Şəki",
  qabala: "Qəbələ",
  "габала": "Qəbələ",
  quba: "Quba",
  "губа": "Quba",
  shamakhi: "Şamaxı",
  "шамахи": "Şamaxı",
  lankaran: "Lənkəran",
  "ленкорань": "Lənkəran",
  ganja: "Gəncə",
  "гянджа": "Gəncə",
  nakhchivan: "Naxçıvan",
  "нахчыван": "Naxçıvan",
  "нахичевань": "Naxçıvan",
  shusha: "Şuşa",
  "шуша": "Şuşa",
  ismayilli: "İsmayıllı",
  "исмаиллы": "İsmayıllı",
};

type NavLink = {
  id: string;
  label: string;
  href?: string;
  subLinks?: NavSubLink[];
  isMega?: boolean;
};

type NavSubLink = {
  label: string;
  href: string;
  mapKey?: string;
  id?: number;
  children?: NavSubLink[];
  icon?: string;
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const { data: dynamicCategories = [] } = useCategories(locale);
  const { data: cities = [] } = useCities({ language: locale, active: true });
  const { data: aboutPages = [] } = useAboutPages({ language: locale, active: true });
  const { data: guidePages = [] } = useGuidePages({ language: locale, active: true });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredMapCity, setHoveredMapCity] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCats, setExpandedCats] = useState<number[]>([]);
  const langRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const debouncedQuery = useDebounce(searchQuery, 300);
  const { data: searchData, isLoading: searchLoading } = useSearch({
    q: debouncedQuery || undefined,
    language: locale,
    limit: 6,
    enabled: searchOpen && debouncedQuery.length > 0,
  });
  const searchResults = searchData?.results ?? [];

  const LANGUAGES = [
    { code: "az", label: "Azərbaycan", flag: "🇦🇿" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "tr", label: "Türkçe", flag: "🇹🇷" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
    { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  ];
  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const buildCategoryHierarchy = () => {
    const categoryMap = new Map<number, NavSubLink>();

    dynamicCategories.forEach((cat: any) => {
      categoryMap.set(cat.id, {
        label: cat.name,
        href: `/mekanlar?category=${cat.slug}`,
        id: cat.id,
        icon: cat.icon || "📍",
        children: []
      });
    });

    const hierarchy: NavSubLink[] = [];
    dynamicCategories.forEach((cat: any) => {
      const item = categoryMap.get(cat.id)!;
      if (cat.parentId && categoryMap.has(cat.parentId)) {
        categoryMap.get(cat.parentId)!.children?.push(item);
      } else {
        hierarchy.push(item);
      }
    });

    return hierarchy;
  };

  const navLinks: NavLink[] = [
    { id: "home", label: t("home"), href: "/" },
    {
      id: "getting-started",
      label: t("getting_started"),
      subLinks: guidePages.map((page) => ({
        label: page.title,
        href: `/guide/${page.slug}`,
      })),
    },
    {
      id: "where-to-go",
      label: t("where_to_go"),
      isMega: true,
      subLinks: cities.map((city) => ({
        label: city.name,
        href: `/regions/${city.id}`,
        mapKey: SLUG_TO_MAP_KEY[city.slug] || city.name,
      })),
    },
    {
      id: "destinations",
      label: t("destinations"),
      subLinks: [
        { label: t("landmarks"), href: "/places/landmarks", icon: "🏛️" },
        { label: t("restaurants"), href: "/places/restaurants", icon: "🍴" },
        { label: t("hotels"), href: "/places/hotels", icon: "🏨" },
        { label: t("hostels"), href: "/places/hostels", icon: "🛌" },
        ...buildCategoryHierarchy(),
      ],
    },
    {
      id: "about",
      label: t("about"),
      subLinks: aboutPages.map((page) => ({
        label: page.title,
        href: `/about/${page.slug}`,
      })),
    },
    { id: "contact", label: t("contact"), href: "/contact" },
  ];

  const authRoutes = ["/login", "/register"];
  const isAuthPage = authRoutes.some((r) => pathname?.includes(r));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [searchOpen]);

  const openSearch = useCallback(() => {
    setSearchQuery("");
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchQuery("");
  }, []);

  const handleSearchSubmit = (q: string) => {
    if (!q.trim()) return;
    closeSearch();
    router.push(`/search?q=${encodeURIComponent(q.trim())}` as any);
  };

  const handleResultClick = (item: { kind: string; slug: string; type: string }) => {
    closeSearch();
    if (item.kind === "venue") {
      router.push(`/mekanlar/${item.slug}` as any);
    } else {
      const baseMap: Record<string, string> = {
        restaurant: "/places/restaurants",
        hotel: "/places/hotels",
        hostel: "/places/hostels",
        landmark: "/places/landmarks",
      };
      const base = baseMap[item.type] || "/mekanlar";
      router.push(`${base}/${item.slug}` as any);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("access_token"));
    const handleAuthChange = () => setIsLoggedIn(!!localStorage.getItem("access_token"));
    window.addEventListener("auth_status_changed", handleAuthChange);
    return () => window.removeEventListener("auth_status_changed", handleAuthChange);
  }, []);

  if (isAuthPage) return null;

  const navColor = "text-white";
  const navColorMuted = "text-white/70";
  const activeLinkColor = "#3b9cf5";

  const routeMap = cities.reduce<Record<string, string>>((acc, city) => {
    const mapKey = SLUG_TO_MAP_KEY[city.slug] || city.name;
    acc[mapKey] = `/regions/${city.id}`;
    return acc;
  }, {});

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-50 w-full transition-all duration-500"
        style={{
          background: "rgba(10, 12, 20, 0.75)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-14">
          <div
            className="flex items-center justify-between transition-all duration-300"
            style={{ height: scrolled ? 60 : 72 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3b9cf5, #6f5cf6)",
                }}
              >
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white">
                Full<span style={{ color: "#3b9cf5" }}>Guide</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-7 h-full">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.subLinks?.some((sub) => pathname === sub.href) ??
                    false);

                const hasSubLinks = link.subLinks && link.subLinks.length > 0;

                return hasSubLinks ? (
                  <div
                    key={link.id}
                    className="relative group/nav-item h-full flex items-center cursor-pointer"
                  >
                    <span
                      className={`flex items-center gap-1 text-[14px] font-semibold transition-colors duration-200 ${isActive ? navColor : navColorMuted
                        } group-hover/nav-item:text-white`}
                    >
                      {link.label}
                      <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover/nav-item:rotate-180 transition-transform duration-300" />
                    </span>
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 group-hover/nav-item:w-full ${isActive ? "w-full" : "w-0"
                        }`}
                      style={{
                        background: activeLinkColor,
                        borderRadius: "4px 4px 0 0",
                      }}
                    />

                    <div
                      className={`absolute top-full ${link.isMega
                        ? "left-1/2 -translate-x-[45%] w-[980px]"
                        : "left-0 w-[280px]"
                        } pt-2 opacity-0 translate-y-2 pointer-events-none
                        group-hover/nav-item:opacity-100 group-hover/nav-item:translate-y-0
                        group-hover/nav-item:pointer-events-auto transition-all duration-300`}
                    >
                      <div
                        className={`rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] ${link.isMega ? "overflow-hidden p-12" : "py-2"
                          }`}
                        style={{
                          background: "rgba(15, 18, 25, 0.98)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          backdropFilter: "blur(20px)",
                        }}
                      >
                        {link.isMega ? (
                          <div className="flex gap-12">
                            {/* City list */}
                            <div className="w-[32%] flex flex-col">
                              <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-white">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                {t("discover_destinations")}
                              </h3>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {link.subLinks?.map((sub) => (
                                  <Link
                                    key={sub.href}
                                    href={sub.href}
                                    onMouseEnter={() =>
                                      sub.mapKey &&
                                      setHoveredMapCity(sub.mapKey)
                                    }
                                    onMouseLeave={() => setHoveredMapCity(null)}
                                    className={`text-[15px] font-medium transition-colors ${hoveredMapCity === sub.mapKey
                                      ? "text-blue-400"
                                      : "text-white/70 hover:text-blue-400"
                                      }`}
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                              </div>
                            </div>

                            <div className="w-[68%] flex justify-center items-center p-4">
                              <div className="relative inline-block">
                                <Azerbaijan
                                  type="select-single"
                                  size={580}
                                  mapColor="rgba(255,255,255,0.03)"
                                  strokeColor="rgba(255,255,255,0.08)"
                                  strokeWidth={1}
                                  hoverColor="#3b9cf5"
                                  selectColor="#3b9cf5"
                                  cityColors={
                                    hoveredMapCity
                                      ? { [hoveredMapCity]: "#3b9cf5" }
                                      : {}
                                  }
                                  hints={false}
                                  hintTextColor="#ffffff"
                                  hintBackgroundColor="#3b9cf5"
                                  hintPadding="6px 12px"
                                  hintBorderRadius={8}
                                  onSelect={(state) => {
                                    if (state && routeMap[state]) {
                                      router.push(routeMap[state]);
                                    }
                                  }}
                                />

                                <div className="absolute inset-0 pointer-events-none">
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* ── Sadə dropdown ── */
                          <div className="max-h-[350px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {link.subLinks?.map((sub) => (
                              <div key={sub.href} className="group/nav-sub-item">
                                <div className="flex items-center hover:bg-white/5 transition-colors relative z-10">
                                  <Link
                                    href={sub.href}
                                    className={`flex-1 px-5 py-3 text-[13.5px] font-medium transition-colors text-white/80 group-hover/nav-sub-item:text-white ${pathname === sub.href
                                      ? "text-white bg-white/10"
                                      : ""
                                      }`}
                                  >
                                    <span className="flex items-center">
                                      {sub.label}
                                    </span>
                                  </Link>
                                  {sub.children && sub.children.length > 0 && (
                                    <div className="p-3 text-white/30 group-hover/nav-sub-item:text-white transition-colors cursor-pointer">
                                      <ChevronRight size={14} className="transition-transform duration-200 group-hover/nav-sub-item:rotate-90" />
                                    </div>
                                  )}
                                </div>
                                {sub.children && sub.children.length > 0 && (
                                  <div className="grid grid-rows-[0fr] group-hover/nav-sub-item:grid-rows-[1fr] transition-[grid-template-rows] duration-300 relative z-0">
                                    <div className="overflow-hidden">
                                      <div className="bg-white/5 border-l-2 border-blue-500/30 ml-4 py-1 mb-1 shadow-inner">
                                        {sub.children.map((child) => (
                                          <Link
                                            key={child.href}
                                            href={child.href}
                                            className={`block px-5 py-2.5 text-[12.5px] transition-colors text-white/60 hover:text-white hover:bg-white/5 ${pathname === child.href ? "text-white bg-white/10" : ""}`}
                                          >
                                            <span className="flex items-center">
                                              {child.label}
                                            </span>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.id}
                    href={link.href as any}
                    className={`relative h-full flex items-center text-[14px] font-semibold transition-colors duration-200 group ${pathname === link.href ? navColor : navColorMuted
                      } hover:text-white`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 h-[3px] transition-all duration-300 group-hover:w-full ${pathname === link.href ? "w-full" : "w-0"
                        }`}
                      style={{
                        background: activeLinkColor,
                        borderRadius: "4px 4px 0 0",
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={openSearch}
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200 group"
                aria-label={t("search")}
              >
                <Search className="w-[18px] h-[18px]" />
                <span className="hidden xl:flex items-center gap-1 text-[11px] font-semibold border border-white/15 rounded-md px-1.5 py-0.5 text-white/40 group-hover:text-white/60 transition-colors">
                  ⌘K
                </span>
              </button>

              <Link
                href="/secilmisler"
                className="text-white/60 hover:text-white transition-colors duration-200"
                aria-label={t("favorites")}
              >
                <Heart className="w-[18px] h-[18px]" />
              </Link>

              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200 text-[13px] font-semibold cursor-pointer"
                  aria-label={t("select_language")}
                >
                  <Globe className="w-4 h-4" />
                  <span>
                    {currentLang.flag} {currentLang.code.toUpperCase()}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${langOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {langOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-44 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] overflow-hidden py-1.5 z-50"
                    style={{
                      background: "rgba(10, 12, 22, 0.98)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      backdropFilter: "blur(20px)",
                    }}
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          router.replace(pathname, {
                            locale: lang.code as "az" | "en" | "ru" | "tr" | "ar" | "hi",
                          });
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium transition-colors ${locale === lang.code
                          ? "text-white bg-white/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.label}</span>
                        {locale === lang.code && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isLoggedIn ? (
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      boxShadow: "0 0 0 2px rgba(16,185,129,0.35)",
                    }}
                    title="Profile"
                  >
                    <User className="w-4 h-4 text-white" />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute top-[calc(100%+12px)] right-0 w-48 rounded-2xl overflow-hidden shadow-2xl py-2 flex flex-col z-50 animate-in fade-in slide-in-from-top-4 duration-300"
                      style={{
                        background: "rgba(10, 12, 22, 0.95)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium transition-colors text-white/70 hover:text-white hover:bg-white/5"
                      >
                        <User className="w-4 h-4" />
                        <span>{t("my_profile") || "Profilim"}</span>
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem('access_token');
                          window.dispatchEvent(new Event("auth_status_changed"));
                          router.push("/login");
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[13.5px] font-medium transition-colors text-red-400 hover:text-red-300 hover:bg-white/5"
                      >
                        <X className="w-4 h-4" />
                        <span>{t("logout") || "Çıxış"}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, #3b9cf5, #6f5cf6)",
                    boxShadow: "0 0 0 2px rgba(59,156,245,0.35)",
                  }}
                  title={t("login")}
                >
                  <User className="w-4 h-4 text-white" />
                </Link>
              )}
            </div>

            <button
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t("menu")}
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Search Popup Overlay ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-200 flex items-start justify-center pt-[68px] px-4"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <div
            ref={searchRef}
            className="w-full max-w-3xl flex flex-col gap-2"
            style={{ animation: "searchPopIn 0.18s cubic-bezier(0.16,1,0.3,1)" }}
          >
            {/* ── Pill bar (exactly like hero) ── */}
            <NavSearchPill
              inputRef={searchInputRef}
              query={searchQuery}
              setQuery={setSearchQuery}
              onSubmit={handleSearchSubmit}
              onClose={closeSearch}
              locale={locale}
            />

            {/* ── Live results ── */}
            {searchQuery.length > 0 && (
              <div
                className="w-full rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(10,12,22,0.97)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  backdropFilter: "blur(30px)",
                }}
              >
                <div className="max-h-[380px] overflow-y-auto">
                  {searchLoading ? (
                    <div className="px-4 py-6 flex items-center justify-center gap-2 text-white/40 text-sm">
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                      {t('searching') || "Axtarılır..."}
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="px-4 py-8 text-center text-white/30 text-sm">
                      {t('no_results') || "Heç bir nəticə tapılmadı"}
                    </div>
                  ) : (
                    <div>
                      {searchResults.map((item) => {
                        const typeIcon: Record<string, string> = {
                          restaurant: "🍴", hotel: "🏨", hostel: "🛌",
                          landmark: "🏛️", nature: "🌿", museum: "🏛️",
                          entertainment: "🎭", venue: "📍", other: "📍",
                        };
                        const icon = typeIcon[item.type] ?? "📍";
                        return (
                          <button
                            key={`${item.kind}-${item.id}`}
                            onClick={() => handleResultClick(item)}
                            className="w-full flex items-center gap-4 px-5 py-3.5 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
                          >
                            <span className="text-xl w-8 text-center shrink-0">{icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] font-semibold text-white/90 group-hover:text-white truncate">
                                {item.title}
                              </div>
                              {item.city && (
                                <div className="text-[12px] text-white/40 flex items-center gap-1 mt-0.5">
                                  <MapPin size={10} />{item.city}
                                </div>
                              )}
                            </div>
                            <ChevronRight size={14} className="text-white/20 group-hover:text-white/50 shrink-0 transition-colors" />
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handleSearchSubmit(searchQuery)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-[13px] font-semibold text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors"
                      >
                        <Search size={13} />
                        {t('view_all_results', { query: searchQuery }) || `"${searchQuery}" üçün bütün nəticələrə bax`}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes searchPopIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div
        className="fixed inset-0 z-40 lg:hidden transition-all duration-400"
        style={{
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className="absolute top-0 right-0 h-full w-full max-w-md flex flex-col overflow-y-auto transition-transform duration-400"
          style={{
            background: "rgba(10, 12, 22, 1)",
            borderLeft: "1px solid rgba(255,255,255,0.07)",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          {/* Spacer for navbar height */}
          <div className="shrink-0 h-20" />
          <div className="flex flex-col px-6 pb-8">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex flex-col border-b border-white/10 last:border-0"
                >
                  {link.subLinks && link.subLinks.length > 0 ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full text-left text-white/90 hover:text-white text-[14px] tracking-wider uppercase font-bold py-4 transition-colors"
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown === link.id ? null : link.id,
                          )
                        }
                      >
                        {link.label}
                        <ChevronRight
                          className={`w-4 h-4 text-blue-500 transition-transform duration-300 ${openMobileDropdown === link.id ? "rotate-90" : ""
                            }`}
                        />
                      </button>
                      {openMobileDropdown === link.id && (
                        <div className="flex flex-col gap-0 bg-black/20 rounded-xl mb-4 overflow-hidden border border-white/5">
                          {link.subLinks.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-[13px] py-3 px-5 transition-colors border-b border-white/5 last:border-0 text-white/70 hover:text-white bg-white/5 hover:bg-white/10"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href as any}
                      className="flex items-center justify-between w-full text-left text-white/90 hover:text-white text-[14px] tracking-wider uppercase font-bold py-4 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 text-blue-500" />
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Quick actions grid */}
            <div className="mt-8 grid grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-xl overflow-hidden shadow-sm">
              <button className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group">
                <LucideMap
                  className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform"
                  strokeWidth={1.5}
                />
                <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">
                  {t("map")}
                </span>
              </button>
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    localStorage.removeItem('access_token');
                    window.dispatchEvent(new Event("auth_status_changed"));
                    setMobileOpen(false);
                    router.push("/login");
                  }}
                  className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group"
                >
                  <X
                    className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">
                    {t("logout") || "Çıxış"}
                  </span>
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group"
                >
                  <User
                    className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">
                    {t("login")}
                  </span>
                </Link>
              )}
              <Link
                href="/secilmisler"
                onClick={() => setMobileOpen(false)}
                className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group"
              >
                <Heart
                  className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform"
                  strokeWidth={1.5}
                />
                <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">
                  {t("favorites")}
                </span>
              </Link>
              <button
                onClick={() => { setMobileOpen(false); openSearch(); }}
                className="bg-[#0A0C16] flex flex-col items-center justify-center py-8 px-4 gap-3 hover:bg-white/5 transition-colors group"
              >
                <Search
                  className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform"
                  strokeWidth={1.5}
                />
                <span className="text-[11px] font-bold tracking-wider text-white/80 uppercase text-center">
                  {t("search")}
                </span>
              </button>
            </div>

            {/* Language selector */}
            <div className="mt-6 flex flex-col border border-white/10 rounded-xl overflow-hidden">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    router.replace(pathname, {
                      locale: lang.code as "az" | "en" | "ru" | "tr" | "ar" | "hi",
                    });
                    setMobileOpen(false);
                  }}
                  className={`flex items-center justify-between px-5 py-3 text-[13px] font-bold transition-all border-b border-white/5 last:border-0 ${locale === lang.code
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-white/70 hover:text-white bg-[#0A0C16] hover:bg-white/5"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="uppercase tracking-wider">{lang.label}</span>
                  </div>
                  {locale === lang.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
