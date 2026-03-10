"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { Star, Bookmark, ArrowRight, ChevronLeft, ChevronRight, MapPin } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { useHeroPlaces } from "@/hooks/use-places";
import { Place } from "@/types/place";
import { getImageUrl } from "@/lib/utils";
import un_photo_1448375240586_882707db888b_1e93d564 from "@/assets/unsplash/photo-1448375240586-882707db888b_1e93d564.jpg";
import un_photo_1448375240586_882707db888b_629753b7 from "@/assets/unsplash/photo-1448375240586-882707db888b_629753b7.jpg";
import un_photo_1464822759023_fed622ff2c3b_629753b7 from "@/assets/unsplash/photo-1464822759023-fed622ff2c3b_629753b7.jpg";
import un_photo_1500534314209_a25ddb2bd429_629753b7 from "@/assets/unsplash/photo-1500534314209-a25ddb2bd429_629753b7.jpg";
import un_photo_1501854140801_50d01698950b_629753b7 from "@/assets/unsplash/photo-1501854140801-50d01698950b_629753b7.jpg";
import un_photo_1506905925346_21bda4d32df4_629753b7 from "@/assets/unsplash/photo-1506905925346-21bda4d32df4_629753b7.jpg";
import un_photo_1519681393784_d120267933ba_1e93d564 from "@/assets/unsplash/photo-1519681393784-d120267933ba_1e93d564.jpg";
import un_photo_1519681393784_d120267933ba_629753b7 from "@/assets/unsplash/photo-1519681393784-d120267933ba_629753b7.jpg";
import un_photo_1527489377706_5bf97e608852_629753b7 from "@/assets/unsplash/photo-1527489377706-5bf97e608852_629753b7.jpg";
import un_photo_1534531173927_aeb928d54385_629753b7 from "@/assets/unsplash/photo-1534531173927-aeb928d54385_629753b7.jpg";
import un_photo_1544735716_392fe2489ffa_1e93d564 from "@/assets/unsplash/photo-1544735716-392fe2489ffa_1e93d564.jpg";
import un_photo_1544735716_392fe2489ffa_629753b7 from "@/assets/unsplash/photo-1544735716-392fe2489ffa_629753b7.jpg";
import un_photo_1570168007204_dfb528c6958f_1e93d564 from "@/assets/unsplash/photo-1570168007204-dfb528c6958f_1e93d564.jpg";
import un_photo_1570168007204_dfb528c6958f_629753b7 from "@/assets/unsplash/photo-1570168007204-dfb528c6958f_629753b7.jpg";

const defaultSlides = [
  {
    bg: un_photo_1570168007204_dfb528c6958f_1e93d564,
    country: "AZƏRBAYCAN",
    subtitle: "Şərqin açarı, Qafqazın incisi",
    description:
      "Qədim şəhər küçələrindən buzlaq dağ zirvələrinə, zəngin mədəniyyətdən Xəzərin sahillərinə — Azərbaycan sizi heyrətdə qoyacaq.",
    accent: "#3b9cf5",
    cards: [
      {
        name: "Bakı",
        region: "Abşeron",
        subtitle: "Şərqin Paris'i",
        description: "Qədim İçərişəhər, Alov qüllələri və müasir arxitektura — Bakı hər gün yeni sirlər açır.",
        img: un_photo_1570168007204_dfb528c6958f_629753b7,
        rating: 4.9,
        reviews: "12.4k",
      },
      {
        name: "Şuşa",
        region: "Qarabağ",
        subtitle: "Musiqi şəhəri",
        description: "Qarabağın döyünən ürəyi, musiqi və şeirin beşiyi olan bu şəhər zamana aparan bir gəzinti təklif edir.",
        img: un_photo_1506905925346_21bda4d32df4_629753b7,
        rating: 4.9,
        reviews: "5.1k",
      },
      {
        name: "Qəbələ",
        region: "Şimal",
        subtitle: "Dağların qucağı",
        description: "Böyük Qafqazın yaşıl qoynunda göllər, şəlalələr və Tufandağ ski mərkəzi — mövsümü olmayan cənnət.",
        img: un_photo_1464822759023_fed622ff2c3b_629753b7,
        rating: 4.8,
        reviews: "8.2k",
      },
    ],
  },
  {
    bg: un_photo_1519681393784_d120267933ba_1e93d564,
    country: "QƏBƏLƏ",
    subtitle: "Böyük Qafqazın qucağında",
    description:
      "Göy meşələr, şəlalələr və dağ havası sizi bu füsunkar şimal bölgəsinin sirlərini kəşf etməyə dəvət edir.",
    accent: "#4dd9ac",
    cards: [
      {
        name: "Nohur Gölü",
        region: "Qəbələ",
        subtitle: "Kristal ayna",
        description: "Dağların arasında gizlənmiş bu əsrarlı göl, sakit sularıyla ziyarətçilərini heyran qoyur.",
        img: un_photo_1501854140801_50d01698950b_629753b7,
        rating: 4.8,
        reviews: "3.2k",
      },
      {
        name: "Vəndam",
        region: "Qəbələ",
        subtitle: "Yaşıl vadilər",
        description: "Heyrətamiz meşə yolları, füsunkar vadilər və təmiz dağ havası ilə Vəndam unudulmaz bir gəzinti yeridir.",
        img: un_photo_1527489377706_5bf97e608852_629753b7,
        rating: 4.7,
        reviews: "2.8k",
      },
      {
        name: "Tufandağ",
        region: "Qəbələ",
        subtitle: "Ski cənnəti",
        description: "Qışda qarla örtülü yamaclar, yayda isə gözəl trekkinq marşrutları ilə Tufandağ hər mövsüm gözəldir.",
        img: un_photo_1519681393784_d120267933ba_629753b7,
        rating: 4.9,
        reviews: "4.1k",
      },
    ],
  },
  {
    bg: un_photo_1544735716_392fe2489ffa_1e93d564,
    country: "ŞUŞA",
    subtitle: "Qarabağın döyünən ürəyi",
    description:
      "Musiqi, şeir və tarixi mədəniyyətin beşiyi olan bu qədim şəhər sizi zamana aparan bir gəzintiyə dəvət edir.",
    accent: "#f5a623",
    cards: [
      {
        name: "Qız Qalası",
        region: "Şuşa",
        subtitle: "Tarixi möcüzə",
        description: "Şuşanın simvolu olan bu qədim qala şəhərin tarixini özündə yaşadır və panoramik mənzərə təklif edir.",
        img: un_photo_1544735716_392fe2489ffa_629753b7,
        rating: 4.9,
        reviews: "7.3k",
      },
      {
        name: "Əlibəyli",
        region: "Şuşa",
        subtitle: "Təbiətin qoynunda",
        description: "Sakit kənd həyatı, yaşıl bağçalar və isti mehmanpərvərlik — şəhər həyatının stresindən uzaqlaşın.",
        img: un_photo_1500534314209_a25ddb2bd429_629753b7,
        rating: 4.6,
        reviews: "1.9k",
      },
      {
        name: "Cıdır Düzü",
        region: "Şuşa",
        subtitle: "Açıq havada",
        description: "Tarixi at yarışlarının keçirildiyi bu gözəl düzənlik bu gün də mədəni tədbirlərə ev sahibliyi edir.",
        img: un_photo_1448375240586_882707db888b_629753b7,
        rating: 4.8,
        reviews: "3.5k",
      },
    ],
  },
  {
    bg: un_photo_1448375240586_882707db888b_1e93d564,
    country: "LƏNKƏRAN",
    subtitle: "Subtropik cənnətin qucağında",
    description:
      "Çay bağçaları, Xəzər sahilləri və unikal subtropik iqlimi ilə Lənkəran unudulmaz bir səyahət hədəfidir.",
    accent: "#8bc34a",
    cards: [
      {
        name: "Hirkan Meşəsi",
        region: "Lənkəran",
        subtitle: "UNESCO mirası",
        description: "Nadir nəbatat və heyvanatlara ev sahib olan bu qoruq dünyanın ən qədim meşə ekosistemlərindən biridir.",
        img: un_photo_1448375240586_882707db888b_629753b7,
        rating: 4.7,
        reviews: "2.2k",
      },
      {
        name: "Astara",
        region: "Lənkəran",
        subtitle: "Sərhəd şəhəri",
        description: "İranla sərhəddə yerləşən bu şəhər, çay bağçaları və Xəzər sahilinin möhtəşəm mənzərəsi ilə məşhurdur.",
        img: un_photo_1534531173927_aeb928d54385_629753b7,
        rating: 4.5,
        reviews: "1.8k",
      },
      {
        name: "Lerik",
        region: "Lənkəran",
        subtitle: "Uzunömürlülər yurdu",
        description: "Dünyanın ən uzunömürlü sakinlərinin yaşadığı bu dağ rayonu saf hava və gözəl təbiəti ilə heyranedicidir.",
        img: un_photo_1501854140801_50d01698950b_629753b7,
        rating: 4.6,
        reviews: "1.3k",
      },
    ],
  },
];

export default function Hero() {
  const locale = useLocale();
  const t = useTranslations('Navbar');
  const { data: heroPlaces, isLoading } = useHeroPlaces(locale);

  const slides = useMemo(() => {
    if (!heroPlaces || heroPlaces.length === 0) return defaultSlides;

    const grouped = heroPlaces.reduce((acc, place) => {
      const cityRaw = place.city?.trim() || 'Azərbaycan';
      const city = cityRaw.charAt(0).toUpperCase() + cityRaw.slice(1).toLowerCase();

      if (!acc[city]) acc[city] = [];
      acc[city].push(place);
      return acc;
    }, {} as Record<string, Place[]>);

    return Object.entries(grouped).map(([city, cityPlaces]) => {
      const firstPlace = cityPlaces[0];
      const imageUrl = getImageUrl(firstPlace, defaultSlides[0].bg);

      return {
        bg: imageUrl,
        country: city.toUpperCase(),
        subtitle: firstPlace.subtitle || 'Möhtəşəm məkan kəşfi',
        description: firstPlace.short_description || firstPlace.title,
        accent: firstPlace.accent_color || '#3b9cf5',
        cards: cityPlaces.map(p => {
          const pImg = getImageUrl(p, defaultSlides[0].bg);
          return {
            name: p.title,
            region: city,
            subtitle: p.subtitle || '',
            description: p.short_description || p.title,
            img: pImg,
            rating: Number(p.average_rating) || 0,
            reviews: p.review_count ? `${p.review_count} rəy` : '0 rəy',
          };
        }),
      };
    });
  }, [heroPlaces]);

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [savedCards, setSavedCards] = useState<Record<string, boolean>>({});
  const [activeCard, setActiveCard] = useState(0);
  const [cardAnimKey, setCardAnimKey] = useState(0);
  const [leftContentKey, setLeftContentKey] = useState(0);
  const [isCardView, setIsCardView] = useState(false);

  const total = slides.length;
  const safeCurrent = Math.min(current, Math.max(0, total - 1));
  const slide = slides[safeCurrent] || defaultSlides[0];

  const safeActiveCard = Math.min(activeCard, Math.max(0, (slide?.cards?.length || 1) - 1));
  const activeCardData = slide?.cards?.[safeActiveCard] || defaultSlides[0].cards[0];

  const goTo = useCallback(
    (idx: number) => {
      if (animating || idx === current) return;
      setAnimating(true);
      setCurrent(idx);
      setActiveCard(0);
      setIsCardView(false);
      setLeftContentKey((k) => k + 1);
      setTimeout(() => {
        setAnimating(false);
      }, 900);
    },
    [animating, current]
  );

  const next = () => goTo((current + 1) % total);
  const back = () => goTo((current - 1 + total) % total);

  useEffect(() => {
    const t = setInterval(next, 8000);
    return () => clearInterval(t);
  }, [current, animating]);

  const toggleSave = (name: string) =>
    setSavedCards((s) => ({ ...s, [name]: !s[name] }));

  const handleCardClick = (idx: number) => {
    if (idx === activeCard) return;
    setActiveCard(idx);
    setCardAnimKey((k) => k + 1);
    setIsCardView(true);
    setLeftContentKey((k) => k + 1);
  };

  // Displayed left content: if card selected, show card info, else show slide info
  const displayCountry = isCardView ? activeCardData.name.toUpperCase() : slide.country;
  const displaySubtitle = isCardView ? activeCardData.subtitle : slide.subtitle;
  const displayDescription = isCardView ? activeCardData.description : slide.description;
  const displayRegion = isCardView ? activeCardData.region : null;

  return (
    <section
      className="hero-root relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: 680 }}
    >
      {/* ── Background Images ── */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: "opacity 900ms cubic-bezier(0.4,0,0.2,1)",
            zIndex: 0,
          }}
        >
          <Image
            src={s.bg}
            alt={s.country}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.45) saturate(1.1)" }}
            priority={i === 0}
            unoptimized
          />
        </div>
      ))}

      {/* Active card background overlay */}
      {isCardView && (
        <div
          key={`card-bg-${activeCard}-${cardAnimKey}`}
          className="absolute inset-0 card-bg-reveal"
          style={{ zIndex: 0 }}
        >
          <Image
            src={activeCardData.img}
            alt={activeCardData.name}
            fill
            className="object-cover"
            style={{ filter: "brightness(0.35) saturate(1.2)" }}
            priority
            unoptimized
          />
        </div>
      )}

      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0.35) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-1"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div className="absolute left-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: 3,
              height: i === current ? 36 : 12,
              background: i === current ? slide.accent : "rgba(255,255,255,0.3)",
            }}
            aria-label={`Slayd ${i + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 h-full flex items-center px-16 gap-8">
        <div className="flex-1 flex flex-col justify-center max-w-[520px] space-y-6">
          <div
            key={`tag-${leftContentKey}`}
            className="hero-fadein inline-flex items-center gap-2 self-start"
          >
            <span
              className="block w-6 h-[2px] rounded-full"
              style={{ background: slide.accent }}
            />
            {displayRegion ? (
              <span
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: slide.accent }}
              >
                <MapPin size={10} />
                {displayRegion}
              </span>
            ) : (
              <span
                className="text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: slide.accent }}
              >
                {t('top_destination')}
              </span>
            )}
          </div>

          {/* Country / Card Name */}
          <h1
            key={`h1-${leftContentKey}`}
            className="hero-title text-white font-black leading-none tracking-tighter drop-shadow-2xl"
            style={{ fontSize: "clamp(56px, 7vw, 110px)", letterSpacing: "-0.04em" }}
          >
            {displayCountry}
          </h1>

          {/* Subtitle */}
          <p
            key={`sub-${leftContentKey}`}
            className="hero-fadein text-white/60 font-light"
            style={{ fontSize: "clamp(14px, 1.5vw, 20px)", animationDelay: "0.1s" }}
          >
            {displaySubtitle}
          </p>

          {/* Description */}
          <p
            key={`desc-${leftContentKey}`}
            className="hero-fadein text-white/45 leading-relaxed max-w-md"
            style={{ fontSize: "clamp(13px, 1.1vw, 15px)", animationDelay: "0.2s" }}
          >
            {displayDescription}
          </p>

          {/* Rating if card view */}
          {isCardView && (
            <div
              key={`rating-${leftContentKey}`}
              className="hero-fadein flex items-center gap-3"
              style={{ animationDelay: "0.25s" }}
            >
              <div className="flex gap-1">
                {[...Array(5)].map((_, si) => (
                  <Star
                    key={si}
                    size={14}
                    className={
                      si < Math.round(activeCardData.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/20"
                    }
                  />
                ))}
              </div>
              <span className="text-white/60 text-sm font-medium">
                {activeCardData.rating} · {activeCardData.reviews} rəy
              </span>
            </div>
          )}

          {/* CTA */}
          <div
            key={`cta-${leftContentKey}`}
            className="hero-fadein flex items-center gap-4 pt-2"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-white text-sm transition-all duration-300 active:scale-95"
              style={{
                background: slide.accent,
                boxShadow: `0 8px 30px ${slide.accent}55`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 40px ${slide.accent}88`;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 30px ${slide.accent}55`;
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {isCardView ? t('plan') : t('explore')}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {isCardView && (
              <button
                onClick={() => {
                  setIsCardView(false);
                  setLeftContentKey((k) => k + 1);
                }}
                className="text-white/50 text-sm font-medium hover:text-white transition-colors flex items-center gap-1.5"
              >
                ← {t('back')}
              </button>
            )}
            {!isCardView && (
              <button className="text-white/50 text-sm font-medium hover:text-white transition-colors flex items-center gap-1.5">
                {t('learn_more')}
                <span className="text-lg leading-none">›</span>
              </button>
            )}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-3 pt-4">
            <button
              onClick={back}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <ChevronLeft size={18} className="text-white/70" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: slide.accent,
                boxShadow: `0 4px 14px ${slide.accent}66`,
              }}
            >
              <ChevronRight size={18} className="text-white" />
            </button>
            <span className="text-white/30 text-xs font-mono ml-1">
              {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Right Cards ── */}
        <div className="hidden lg:flex items-center justify-end flex-1">
          <div className="flex gap-4 items-end">
            {slide.cards.map((card, idx) => {
              const isActive = idx === activeCard;
              return (
                <div
                  key={`${current}-${card.name}`}
                  className="dest-card relative rounded-3xl overflow-hidden cursor-pointer group shrink-0"
                  style={{
                    width: isActive ? 230 : 155,
                    height: isActive ? 400 : 280,
                    animationDelay: `${idx * 0.12}s`,
                    transition: "width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
                    boxShadow: isActive
                      ? `0 28px 70px rgba(0,0,0,0.65), 0 0 0 2px ${slide.accent}66`
                      : "0 12px 30px rgba(0,0,0,0.4)",
                  }}
                  onClick={() => handleCardClick(idx)}
                >
                  {/* Card image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={card.img}
                      alt={card.name}
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      style={{ filter: isActive ? "brightness(0.6) saturate(1.2)" : "brightness(0.55) saturate(1.0)" }}
                    />
                  </div>

                  {/* Gradient */}
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.88) 100%)",
                    }}
                  />

                  {/* Active card accent glow top */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-1 card-glow-in"
                      style={{ background: slide.accent, borderRadius: "0" }}
                    />
                  )}

                  {/* Save Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(card.name);
                    }}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                    style={{
                      background: savedCards[card.name]
                        ? slide.accent
                        : "rgba(255,255,255,0.15)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <Bookmark
                      size={15}
                      className={savedCards[card.name] ? "fill-white text-white" : "text-white"}
                    />
                  </button>

                  {/* Card Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {isActive && (
                      <p
                        key={`region-${idx}-${cardAnimKey}`}
                        className="card-info-in text-white/50 text-[11px] font-semibold uppercase tracking-wider mb-1"
                      >
                        {card.region}
                      </p>
                    )}
                    <p className="text-white font-bold text-base leading-tight mb-2">
                      {card.name}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, si) => (
                          <Star
                            key={si}
                            size={10}
                            className={
                              si < Math.round(card.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-white/20"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-white/60 text-[11px] ml-1">
                        {card.rating} · {card.reviews}
                      </span>
                    </div>

                    {/* Extra info only for active card */}
                    {isActive && (
                      <div
                        key={`extra-${idx}-${cardAnimKey}`}
                        className="card-info-in mt-3 pt-3 border-t border-white/10 flex items-center gap-2"
                        style={{ animationDelay: "0.1s" }}
                      >
                        <MapPin size={11} className="text-white/40" />
                        <span className="text-white/40 text-[11px]">{card.region}, Azərbaycan</span>
                        <span
                          className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{ background: `${slide.accent}33`, color: slide.accent }}
                        >
                          {t('top')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Click hint for inactive cards */}
                  {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                      >
                        <ArrowRight size={14} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom Thumbnail Strip ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-16 pb-6"
        style={{
          background:
            "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)",
          paddingTop: "48px",
        }}
      >
        <div className="flex items-center gap-4">
          <p className="text-white/30 text-[11px] font-bold uppercase tracking-[0.25em] mr-2 shrink-0">
            {t('explore')}
          </p>
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="relative shrink-0 rounded-xl overflow-hidden transition-all duration-500 group"
              style={{
                width: i === current ? 110 : 70,
                height: 48,
                opacity: i === current ? 1 : 0.45,
                boxShadow:
                  i === current ? `0 4px 16px ${s.accent}66` : "none",
                border: i === current ? `1.5px solid ${s.accent}` : "1.5px solid transparent",
              }}
            >
              <Image
                src={s.bg}
                alt={s.country}
                fill
                unoptimized
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {i === current && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold uppercase tracking-wider drop-shadow text-center leading-tight px-1">
                    {s.country}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes hero-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-title-in {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes dest-card-in {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-info-appear {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes card-bg-appear {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes glow-in {
          from { opacity: 0; transform: scaleX(0); }
          to   { opacity: 1; transform: scaleX(1); }
        }

        .hero-fadein {
          animation: hero-fadein 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hero-title {
          animation: hero-title-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .dest-card {
          animation: dest-card-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .card-info-in {
          animation: card-info-appear 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .card-bg-reveal {
          animation: card-bg-appear 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
        .card-glow-in {
          animation: glow-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: left;
        }
      `}</style>
    </section>
  );
}
