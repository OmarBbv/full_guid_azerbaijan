"use client";

import { useRef, useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { useBlogPosts } from "@/hooks/use-blog";
import type { BlogPost } from "@/types/blog";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import blog_default from "@/assets/unsplash/baku_fixed.jpg";
import { MOCK_BLOG_POSTS } from "@/constants/blog";

function mapPostToUi(post: BlogPost, locale: string, t_blog: any) {
  const publishedDate = post.published_at || post.created_at;
  const date = publishedDate
    ? new Date(publishedDate).toLocaleDateString(locale === "az" ? "az-AZ" : locale === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

  const readTimeUnit = t_blog("read_time") || (locale === "az" ? "dəq" : "min");
  const readTime = post.read_time_minutes
    ? `${post.read_time_minutes} ${readTimeUnit}`
    : "";

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    img:
      post.cover_image_url ??
      blog_default,
    category: post.category_label ?? post.category ?? "",
    categoryColor: post.category_color ?? "#3b9cf5",
    date,
    readTime,
    author: post.author_name ?? "Admin",
    authorImg:
      post.author_avatar_url ??
      `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_name || 'A')}`,
    featured: post.is_featured,
  };
}

function ArticleCard({ article, index, large = false }: {
  article: ReturnType<typeof mapPostToUi>;
  index: number;
  large?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href={`/bloq/${article.slug}`}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.09}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 0.09}s`,
      }}
      className={`block ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-3xl ${large ? "h-full" : ""}`}
    >
      <article
        className={`bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] group relative rounded-3xl overflow-hidden cursor-pointer ${large ? "h-full flex flex-col" : ""}`}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ height: large ? 320 : 200 }}>
          <Image
            src={article.img}
            alt={article.title}
            fill
            unoptimized
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.65) 100%)" }}
          />

          {/* Category */}
          <div className="absolute top-4 left-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-bold text-white uppercase tracking-wider"
              style={{ background: `${article.categoryColor}dd`, backdropFilter: "blur(8px)" }}
            >
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-5 bg-card ${large ? "flex-1" : ""}`}>
          <h3
            className={`font-bold leading-tight mb-2 transition-colors duration-200 group-hover:text-primary ${large ? "text-xl" : "text-base"}`}
            style={{ color: "var(--foreground)" }}
          >
            {article.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4 line-clamp-2"
            style={{ color: "var(--muted-foreground)" }}
          >
            {article.excerpt}
          </p>

          <div
            className="flex items-center gap-3 pt-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <Image
              src={article.authorImg}
              alt={article.author}
              width={28}
              height={28}
              unoptimized
              className="rounded-full object-cover"
            />
            <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
              {article.author}
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1">
                <Calendar size={11} style={{ color: "var(--muted-foreground)" }} />
                <span suppressHydrationWarning className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                  {article.date}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={11} style={{ color: "var(--muted-foreground)" }} />
                <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogSection() {
  const t = useTranslations('Home');
  const t_blog = useTranslations('Blog');
  const locale = useLocale();
  const { data } = useBlogPosts({
    language: locale,
    published: true,
    featured: true,
  });

  const articles = (data && data.length > 0 ? data : MOCK_BLOG_POSTS)
    .map(post => mapPostToUi(post as any, locale, t_blog))
    .slice(0, 4);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-5 bg-[#f5a623] -top-[100px] -left-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-pill">📝 {t('blog_and_articles')}</span>
            <h2 className="section-title mt-4">
              {t('about_azerbaijan')}<br />
              <span className="section-title-accent">{t('worth_reading')}</span>
            </h2>
            <p className="section-desc mt-3">
              {t('blog_desc')}
            </p>
          </div>
          <Link
            href="/bloq"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 shrink-0 self-start md:self-auto"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 8px 24px rgba(30,58,138,0.25)",
            }}
          >
            {t('all_articles')}
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {articles.map((a, i) => (
            <div key={a.id} className="break-inside-avoid mb-6">
              <ArticleCard article={a as any} index={i} large={a.featured} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
