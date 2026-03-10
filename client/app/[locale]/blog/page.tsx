"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useBlogPosts } from "@/hooks/use-blog";
import type { BlogPost } from "@/types/blog";
import {
  Search,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  TrendingUp,
  Compass,
  Coffee,
} from "lucide-react";
import un_photo_1526779259212_939e64788e3c_be9dcf27 from "@/assets/unsplash/photo-1526779259212-939e64788e3c_be9dcf27.jpg";

function mapPostToUi(
  post: BlogPost,
  locale: string,
  t: any
): {
  id: string;
  title: string;
  excerpt: string;
  img: any;
  category: string | null;
  categoryLabel: string | null;
  categoryColor: string | null;
  date: string;
  readTime: string | null;
  author: string | null;
  authorImg: string | null;
  featured: boolean;
} {
  const date = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale === "az" ? "az-AZ" : locale === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

  const readTime = post.read_time_minutes
    ? `${post.read_time_minutes} ${t("read_time")}`
    : null;

  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    img:
      post.cover_image_url ??
      un_photo_1526779259212_939e64788e3c_be9dcf27,
    category: post.category,
    categoryLabel: post.category_label,
    categoryColor: post.category_color,
    date,
    readTime,
    author: post.author_name,
    authorImg: post.author_avatar_url,
    featured: post.is_featured,
  };
}

type UiArticle = ReturnType<typeof mapPostToUi>;

function ArticleCard({ article, index, t, layout = "grid" }: {
  article: UiArticle;
  index: number;
  t: any;
  layout?: "grid" | "featured" | "list";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (layout === "featured") {
    return (
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: `opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)`,
        }}
        className="w-full relative group rounded-[2rem] overflow-hidden bg-card border border-border/60 shadow-xl cursor-pointer"
      >
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image */}
          <div className="lg:w-3/5 h-[300px] lg:h-[450px] relative overflow-hidden">
            <Image
              src={article.img}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/30" />

            <span
              className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-[12px] font-bold text-white uppercase tracking-wider"
              style={{ background: `${article.categoryColor}dd`, backdropFilter: "blur(8px)" }}
            >
              {article.categoryLabel}
            </span>
          </div>

          {/* Content */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-card">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-bold text-primary flex items-center gap-1.5">
                🔥 {t("featured_label")}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-border"></span>
              <span className="text-sm font-medium text-muted-foreground">{article.date}</span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors text-foreground">
              {article.title}
            </h3>

            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-3">
                <Image
                  src={article.authorImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author || 'A')}`}
                  alt={article.author || "Author"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover border-2 border-background"
                  unoptimized
                />
                <div>
                  <p className="text-sm font-bold text-foreground">{article.author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock size={12} /> {article.readTime}
                  </p>
                </div>
              </div>

              <button className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${index * 0.08}s`,
      }}
      className="h-full"
    >
      <article className="h-full flex flex-col bg-card border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 group relative rounded-3xl overflow-hidden cursor-pointer">
        {/* Image */}
        <div className="relative overflow-hidden h-[240px]">
          <Image
            src={article.img}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Category */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-block px-3 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider"
              style={{ background: `${article.categoryColor}dd`, backdropFilter: "blur(8px)" }}
            >
              {article.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col bg-card">
          <h3 className="font-bold text-lg leading-tight mb-3 transition-colors duration-200 group-hover:text-primary text-foreground line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm leading-relaxed mb-6 line-clamp-2 text-muted-foreground flex-1">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-border/50 mt-auto">
            <Image
              src={article.authorImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author || 'A')}`}
              alt={article.author || "Author"}
              width={32}
              height={32}
              className="rounded-full object-cover"
              unoptimized
            />
            <span className="text-xs font-bold text-foreground">
              {article.author}
            </span>
            <div className="flex items-center gap-3 ml-auto text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span className="text-[11px] font-medium">{article.date}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function BlogPage() {
  const locale = useLocale();
  const t = useTranslations("Blog");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const CATEGORY_META = [
    { id: "all", label: t("all_articles"), icon: <BookOpen size={16} /> },
    { id: "guide", label: t("guide"), icon: <Compass size={16} /> },
    { id: "culture", label: t("culture"), icon: <Coffee size={16} /> },
    { id: "nature", label: t("nature"), icon: <TrendingUp size={16} /> },
  ] as const;

  const { data, isLoading } = useBlogPosts({
    language: locale,
    category: activeCategory !== "all" ? activeCategory : undefined,
    search: searchQuery || undefined,
    published: true,
  });

  const uiArticles: UiArticle[] = (data ?? []).map(post => mapPostToUi(post, locale, t));

  const featuredArticle = uiArticles.find(a => a.featured);
  const regularArticles = uiArticles.filter(a => a.id !== featuredArticle?.id);

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20">

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10">

        {/* Header Section */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-6 relative">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
              <BookOpen size={16} /> {t("title")}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight max-w-4xl">
              {t("hero_title_part1")} <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-500">{t("hero_title_accent")}</span>,<br className="hidden md:block" /> {t("hero_title_part2")}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              {t("hero_subtitle")}
            </p>

            {/* Search Box */}
            <div className="relative flex items-center w-full max-w-xl shadow-xl shadow-primary/5 rounded-full bg-card border border-border/60 hover:border-primary/50 transition-colors mx-auto p-1.5">
              <div className="pl-4 pr-2 text-muted-foreground">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder={t("search_placeholder")}
                className="w-full bg-transparent border-none outline-none py-3 px-2 text-foreground placeholder:text-muted-foreground/60 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95 whitespace-nowrap hidden sm:block">
                {t("search_button")}
              </button>
            </div>

          </div>
        </section>

        {/* Categories Section */}
        <section className="pb-10 px-6 max-w-7xl mx-auto">
          <div className="flex gap-3 justify-start lg:justify-center overflow-x-auto pb-4 pt-2 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
            {CATEGORY_META.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap active:scale-95"
                style={{
                  background: activeCategory === cat.id ? "var(--primary)" : "var(--card)",
                  color: activeCategory === cat.id ? "var(--primary-foreground)" : "var(--muted-foreground)",
                  border: `1px solid ${activeCategory === cat.id ? "transparent" : "var(--border)"}`,
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Section */}
        <section className="pb-24 px-6 max-w-7xl mx-auto">

          {!isLoading && uiArticles.length > 0 ? (
            <>
              {/* Featured Article */}
              {featuredArticle && activeCategory === "all" && !searchQuery && (
                <div className="mb-12">
                  <ArticleCard article={featuredArticle} index={0} layout="featured" t={t} />
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} layout="grid" t={t} />
                ))}
              </div>
            </>
          ) : !isLoading ? (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border/50 border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 text-3xl">
                📝
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{t("no_results_title")}</h3>
              <p className="text-muted-foreground max-w-md">{t("no_results_desc")}</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md"
              >
                {t("clear_filters")}
              </button>
            </div>
          ) : null}

          {/* Load More Button */}
          {uiArticles.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3.5 bg-card border border-border rounded-full text-foreground font-bold hover:bg-muted transition-colors shadow-sm flex items-center gap-2 group">
                {t("load_more")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

        </section>

      </div>

      <style jsx global>{`
        /* Hide scrollbar for category list */
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
