"use client";

import { Link, usePathname, useRouter } from "@/i18n/routing";
import Azerbaijan from "@react-map/azerbaijan";
import {
  ChevronDown,
  ChevronRight,
  Globe,
  Heart,
  Map,
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

const CITY_MARKERS = [
  { name: "Bakı", pctX: 90.5, pctY: 42.6 },
  { name: "Şəki", pctX: 42.3, pctY: 20.2 },
  { name: "Qəbələ", pctX: 54.4, pctY: 26.3 },
  { name: "Quba", pctX: 66.3, pctY: 15.4 },
  { name: "Şamaxı", pctX: 66.7, pctY: 36.3 },
  { name: "Lənkəran", pctX: 70.3, pctY: 89.9 },
  { name: "Gəncə", pctX: 27.9, pctY: 34.8 },
  { name: "Naxçıvan", pctX: 10.9, pctY: 76.9 },
] as const;

const CITY_ROUTES: { from: string; to: string }[] = [
  // Bakıdan şimal-qərb turu
  { from: "Bakı", to: "Şamaxı" },
  { from: "Şamaxı", to: "Qəbələ" },
  { from: "Qəbələ", to: "Şəki" },
  { from: "Şəki", to: "Quba" },
  // Bakıdan cənub və qərb xətləri
  { from: "Bakı", to: "Lənkəran" },
  { from: "Bakı", to: "Gəncə" },
  { from: "Gəncə", to: "Naxçıvan" },
];

type NavLink = {
  id: string;
  label: string;
  href?: string;
  subLinks?: { label: string; href: string; mapKey?: string }[];
  isMega?: boolean;
};

export default function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const { data: dynamicCategories = [] } = useCategories(locale);
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

  const navLinks: NavLink[] = [
    { id: "home", label: t("home"), href: "/" },
    {
      id: "getting-started",
      label: t("getting_started"),
      subLinks: [
        { label: t("about_baku"), href: "/info/baku" },
        { label: t("airport_info"), href: "/info/airport" },
      ],
    },
    {
      id: "where-to-go",
      label: t("where_to_go"),
      isMega: true,
      subLinks: [
        { label: t("baku"), href: "/regions/baku", mapKey: "Bakı" },
        { label: t("sheki"), href: "/regions/sheki", mapKey: "Şəki" },
        { label: t("qabala"), href: "/regions/qabala", mapKey: "Qəbələ" },
        { label: t("quba"), href: "/regions/quba", mapKey: "Quba" },
        { label: t("shamakhi"), href: "/regions/shamakhi", mapKey: "Şamaxı" },
        { label: t("lankaran"), href: "/regions/lankaran", mapKey: "Lənkəran" },
        { label: t("ganja"), href: "/regions/ganja", mapKey: "Gəncə" },
        {
          label: t("nakhchivan"),
          href: "/regions/nakhchivan",
          mapKey: "Naxçıvan",
        },
      ],
    },
    {
      id: "destinations",
      label: t("destinations"),
      subLinks: [
        { label: t("landmarks"), href: "/places/landmarks" },
        { label: t("restaurants"), href: "/places/restaurants" },
        { label: t("hotels"), href: "/places/hotels" },
        { label: t("hostels"), href: "/places/hostels" },
        ...dynamicCategories.map((cat) => ({
          label: cat.name,
          href: `/mekanlar?category=${cat.slug}`,
        })),
      ],
    },
    {
      id: "about",
      label: t("about"),
      subLinks: [
        { label: t("about_fga"), href: "/about/fga" },
        { label: t("platform_principles"), href: "/about/principles" },
        { label: t("transparency"), href: "/about/transparency" },
      ],
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

  // Search popup keyboard handling
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

  // Focus input when popup opens
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

  const routeMap: Record<string, string> = {
    Bakı: "/regions/baku",
    Şəki: "/regions/sheki",
    Qəbələ: "/regions/qabala",
    Quba: "/regions/quba",
    Şamaxı: "/regions/shamakhi",
    Lənkəran: "/regions/lankaran",
    Gəncə: "/regions/ganja",
    Naxçıvan: "/regions/nakhchivan",
  };

  const markerLookup = CITY_MARKERS.reduce<
    Record<string, { pctX: number; pctY: number }>
  >((acc, m) => {
    acc[m.name] = { pctX: m.pctX, pctY: m.pctY };
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
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
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

                return link.subLinks ? (
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
                        className={`rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] overflow-hidden ${link.isMega ? "p-12" : "py-2"
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
                                  <svg
                                    className="w-full h-full"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                  >
                                    <defs>
                                      <marker
                                        id="city-arrow"
                                        markerWidth="4"
                                        markerHeight="4"
                                        refX="3.5"
                                        refY="2"
                                        orient="auto"
                                        markerUnits="strokeWidth"
                                      >
                                        <path
                                          d="M0,0 L0,4 L4,2 z"
                                          fill="#7dd3fc"
                                        />
                                      </marker>
                                    </defs>
                                    {CITY_ROUTES.map((route) => {
                                      const from = markerLookup[route.from];
                                      const to = markerLookup[route.to];
                                      if (!from || !to) return null;
                                      const isActive =
                                        hoveredMapCity === route.from ||
                                        hoveredMapCity === route.to;

                                      return (
                                        <line
                                          key={`${route.from}-${route.to}`}
                                          x1={from.pctX}
                                          y1={from.pctY}
                                          x2={to.pctX}
                                          y2={to.pctY}
                                          stroke={
                                            isActive
                                              ? "rgba(125,211,252,0.9)"
                                              : "rgba(125,211,252,0.45)"
                                          }
                                          strokeWidth={isActive ? 1.2 : 0.85}
                                          strokeDasharray="3 3"
                                          markerEnd="url(#city-arrow)"
                                        />
                                      );
                                    })}
                                  </svg>

                                  {CITY_MARKERS.map((marker) => (
                                    <div
                                      key={marker.name}
                                      className="absolute"
                                      style={{
                                        left: `${marker.pctX}%`,
                                        top: `${marker.pctY}%`,
                                        transform: "translate(-50%, -50%)",
                                      }}
                                    >
                                      <div
                                        className={`relative flex items-center justify-center transition-all duration-300 ${hoveredMapCity === marker.name
                                          ? "scale-[1.6]"
                                          : "scale-100"
                                          }`}
                                      >
                                        <div
                                          className={`absolute w-3 h-3 rounded-full bg-red-500 animate-ping transition-opacity ${hoveredMapCity === marker.name
                                            ? "opacity-50"
                                            : "opacity-20"
                                            }`}
                                        />
                                        <div
                                          className={`rounded-full bg-red-500 border border-white shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all ${hoveredMapCity === marker.name
                                            ? "w-2.5 h-2.5 bg-red-500 shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                                            : "w-2 h-2"
                                            }`}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* ── Sadə dropdown ── */
                          link.subLinks?.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-5 py-3 text-[13.5px] font-medium transition-colors text-white/80 hover:text-white hover:bg-white/5 ${pathname === sub.href
                                ? "text-white bg-white/10"
                                : ""
                                }`}
                            >
                              {sub.label}
                            </Link>
                          ))
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
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[80px] px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <div
            ref={searchRef}
            className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(10,12,22,0.98)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(30px)",
              animation: "searchPopIn 0.18s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
              <Search size={18} className="text-white/40 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearchSubmit(searchQuery);
                }}
                placeholder="Restoran, otel, məkan, şəhər..."
                className="flex-1 bg-transparent text-white placeholder-white/35 text-base outline-none font-medium"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-white/30 hover:text-white/70 transition-colors">
                  <X size={16} />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="ml-1 text-[11px] font-bold text-white/30 border border-white/15 rounded-md px-2 py-1 hover:text-white/60 hover:border-white/30 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[420px] overflow-y-auto">
              {searchQuery.length === 0 ? (
                <div className="px-4 py-8 text-center text-white/30 text-sm">
                  Axtar düyməsini basın və ya nəyisə yazın…
                </div>
              ) : searchLoading ? (
                <div className="px-4 py-6 flex items-center justify-center gap-2 text-white/40 text-sm">
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                  Axtarılır...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="px-4 py-8 text-center text-white/30 text-sm">
                  Heç bir nəticə tapılmadı
                </div>
              ) : (
                <div>
                  {searchResults.map((item, i) => {
                    const typeIcon: Record<string, string> = {
                      restaurant: "🍴", hotel: "🏨", hostel: "🛌",
                      landmark: "🏛️", nature: "🌿", museum: "🏛️",
                      entertainment: "🎭", venue: "📍", other: "📍",
                    };
                    const icon = typeIcon[item.type] || typeIcon[item.kind] || "📍";
                    return (
                      <button
                        key={`${item.kind}-${item.id}`}
                        onClick={() => handleResultClick(item)}
                        className="w-full flex items-center gap-4 px-4 py-3.5 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 group"
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

                  {/* Full search link */}
                  <button
                    onClick={() => handleSearchSubmit(searchQuery)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 text-[13px] font-semibold text-blue-400 hover:text-blue-300 hover:bg-white/5 transition-colors"
                  >
                    <Search size={13} />
                    &ldquo;{searchQuery}&rdquo; üçün bütün nəticələrə bax
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes searchPopIn {
          from { opacity: 0; transform: scale(0.97) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
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
                {link.subLinks ? (
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
              <Map
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
