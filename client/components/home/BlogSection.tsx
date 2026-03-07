"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

const articles = [
  {
    id: 1,
    title: "Bakının ən gözəl 10 nöqtəsi — fotosevərlərin xəritəsi",
    excerpt:
      "Alov Qüllələrindən İçərişəhərə, Xəzər sahilindən Biləcəri stansiyasına — şəhərin ən fotogenik yerləri.",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=700&auto=format&fit=crop",
    category: "Bakı",
    categoryColor: "#3b9cf5",
    date: "24 Fevral 2026",
    readTime: "6 dəq",
    author: "Leyla M.",
    authorImg: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 2,
    title: "Qəbələ dağlarında 4 günlük trekkinq — tam bələdçi",
    excerpt:
      "Tufandağdan Nohur gölünə qədər uzanan bu cığır, Azərbaycanın ən gözəl dağ mənzərələrini təqdim edir.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=700&auto=format&fit=crop",
    category: "Trekkinq",
    categoryColor: "#4dd9ac",
    date: "18 Fevral 2026",
    readTime: "9 dəq",
    author: "Murad H.",
    authorImg: "https://i.pravatar.cc/40?img=12",
    featured: true,
  },
  {
    id: 3,
    title: "Şuşa — yenidən doğan şəhərin ruhu ilə tanışlıq",
    excerpt:
      "Azərbaycanın mədəni paytaxtı Şuşa, tarixi bərpa ilə yenidən həyata qayıdır. Buraya getməzdən 5 şeyi bilin.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=700&auto=format&fit=crop",
    category: "Mədəniyyət",
    categoryColor: "#f5a623",
    date: "12 Fevral 2026",
    readTime: "7 dəq",
    author: "Aytən R.",
    authorImg: "https://i.pravatar.cc/40?img=9",
  },
  {
    id: 4,
    title: "Lənkəran çay bağçaları — Azərbaycanın gizli cənnəti",
    excerpt:
      "Subtropik iqlim, yaşıl bağçalar və Xəzər sahilinin möhtəşəm mənzərəsi — Lənkəranda itirilmiş bir həftə.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=700&auto=format&fit=crop",
    category: "Təbiət",
    categoryColor: "#8bc34a",
    date: "5 Fevral 2026",
    readTime: "5 dəq",
    author: "Rauf K.",
    authorImg: "https://i.pravatar.cc/40?img=15",
  },
];

function ArticleCard({ article, index, large = false }: {
  article: typeof articles[0];
  index: number;
  large?: boolean;
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

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.65s ease ${index * 0.09}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 0.09}s`,
      }}
      className={large ? "h-full" : ""}
    >
      <article
        className={`bg-card border border-border shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] hover:-translate-y-1 group relative rounded-3xl overflow-hidden cursor-pointer ${large ? "h-full flex flex-col" : ""}`}
      >
        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: large ? 320 : 200 }}>
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            <img
              src={article.authorImg}
              alt={article.author}
              className="w-7 h-7 rounded-full object-cover"
            />
            <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>
              {article.author}
            </span>
            <div className="flex items-center gap-3 ml-auto">
              <div className="flex items-center gap-1">
                <Calendar size={11} style={{ color: "var(--muted-foreground)" }} />
                <span className="text-[11px]" style={{ color: "var(--muted-foreground)" }}>
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
    </div>
  );
}

export default function BlogSection() {
  const t = useTranslations('Home');
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
          <a
            href="/bloq"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-1 shrink-0 self-start md:self-auto"
            style={{
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 8px 24px rgba(30,58,138,0.25)",
            }}
          >
            {t('all_articles')}
            <ArrowRight size={15} />
          </a>
        </div>

        {/* Blog columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {articles.map((a, i) => (
            <div key={a.id} className="break-inside-avoid mb-6">
              <ArticleCard article={a} index={i} large={a.featured} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
