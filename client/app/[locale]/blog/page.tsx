"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ArrowRight, Calendar, Clock, BookOpen, TrendingUp, Compass, Coffee } from "lucide-react";

// Mock Data
const categories = [
  { id: "hamısı", label: "Bütün Məqalələr", icon: <BookOpen size={16} /> },
  { id: "bələdçi", label: "Səyahət Bələdçisi", icon: <Compass size={16} /> },
  { id: "mədəniyyət", label: "Mədəniyyət", icon: <Coffee size={16} /> },
  { id: "təbiət", label: "Təbiət & Ekstrim", icon: <TrendingUp size={16} /> },
];

const articles = [
  {
    id: 1,
    title: "Bakının ən gözəl 10 nöqtəsi — fotosevərlərin xəritəsi",
    excerpt: "Alov Qüllələrindən İçərişəhərə, Xəzər sahilindən Biləcəri stansiyasına — şəhərin ən fotogenik yerləri.",
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop",
    category: "bələdçi",
    categoryLabel: "Bələdçi",
    categoryColor: "#3b9cf5",
    date: "24 Fevral 2026",
    readTime: "6 dəq",
    author: "Leyla M.",
    authorImg: "https://i.pravatar.cc/40?img=5",
    featured: true,
  },
  {
    id: 2,
    title: "Qəbələ dağlarında 4 günlük trekkinq — tam bələdçi",
    excerpt: "Tufandağdan Nohur gölünə qədər uzanan bu cığır, Azərbaycanın ən gözəl dağ mənzərələrini təqdim edir. Bütün detallar burada.",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
    category: "təbiət",
    categoryLabel: "Təbiət",
    categoryColor: "#4dd9ac",
    date: "18 Fevral 2026",
    readTime: "9 dəq",
    author: "Murad H.",
    authorImg: "https://i.pravatar.cc/40?img=12",
  },
  {
    id: 3,
    title: "Şuşa — yenidən doğan şəhərin ruhu ilə tanışlıq",
    excerpt: "Azərbaycanın mədəni paytaxtı Şuşa, tarixi bərpa ilə yenidən həyata qayıdır. Buraya getməzdən 5 şeyi bilin.",
    img: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=800&auto=format&fit=crop",
    category: "mədəniyyət",
    categoryLabel: "Mədəniyyət",
    categoryColor: "#f5a623",
    date: "12 Fevral 2026",
    readTime: "7 dəq",
    author: "Aytən R.",
    authorImg: "https://i.pravatar.cc/40?img=9",
  },
  {
    id: 4,
    title: "Lənkəran çay bağçaları — Azərbaycanın gizli cənnəti",
    excerpt: "Subtropik iqlim, yaşıl bağçalar və Xəzər sahilinin möhtəşəm mənzərəsi — Lənkəranda itirilmiş bir həftə.",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
    category: "təbiət",
    categoryLabel: "Təbiət",
    categoryColor: "#8bc34a",
    date: "5 Fevral 2026",
    readTime: "5 dəq",
    author: "Rauf K.",
    authorImg: "https://i.pravatar.cc/40?img=15",
  },
  {
    id: 5,
    title: "Milli mətbəxin şahəsəri: Plov və onun növləri",
    excerpt: "Azərbaycan mətbəxində plovun xüsusi yeri var. Onun hansı növləri və fərqli dadları mövcuddur?",
    img: "https://images.unsplash.com/photo-1627308595229-7830f5c9c66e?q=80&w=800&auto=format&fit=crop",
    category: "mədəniyyət",
    categoryLabel: "Mədəniyyət",
    categoryColor: "#f5a623",
    date: "1 Yanvar 2026",
    readTime: "8 dəq",
    author: "Aysel Q.",
    authorImg: "https://i.pravatar.cc/40?img=33",
  },
  {
    id: 6,
    title: "Göygöl Milli Parkı: İlin bütün fəsillərində",
    excerpt: "Göygölün payızda saralan, qışda isə bəmbəyaz olan mənzərələrinə baxış və ideal istirahət planı.",
    img: "https://plus.unsplash.com/premium_photo-1669867124803-34eeb8b6eb06?q=80&w=800&auto=format&fit=crop",
    category: "bələdçi",
    categoryLabel: "Bələdçi",
    categoryColor: "#3b9cf5",
    date: "28 Dekabr 2025",
    readTime: "4 dəq",
    author: "Natiq E.",
    authorImg: "https://i.pravatar.cc/40?img=11",
  }
];

function ArticleCard({ article, index, layout = "grid" }: {
  article: typeof articles[0];
  index: number;
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
            <img
              src={article.img}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                🔥 Həftənin seçimi
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
                <img src={article.authorImg} alt={article.author} className="w-10 h-10 rounded-full object-cover border-2 border-background" />
                <div>
                  <p className="text-sm font-bold text-foreground">{article.author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock size={12} /> {article.readTime} oxuma
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
          <img
            src={article.img}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            <img
              src={article.authorImg}
              alt={article.author}
              className="w-8 h-8 rounded-full object-cover"
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
  const [activeCategory, setActiveCategory] = useState("hamısı");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === "hamısı" || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles.find(a => a.featured);
  const regularArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

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
              <BookOpen size={16} /> Bələdçi & Hekayələr
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-tight tracking-tight max-w-4xl">
              Dünyanı <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-500">Kəşf Et</span>,<br className="hidden md:block" /> İlham Al
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Səyahət tövsiyələri, maraqlı məkanlar və unudulmaz təcrübələrlə dolu məqalələri oxuyun.
            </p>

            {/* Search Box */}
            <div className="relative flex items-center w-full max-w-xl shadow-xl shadow-primary/5 rounded-full bg-card border border-border/60 hover:border-primary/50 transition-colors mx-auto p-1.5">
              <div className="pl-4 pr-2 text-muted-foreground">
                <Search size={20} />
              </div>
              <input
                type="text"
                placeholder="Məqalə, yer və ya mövzu axtar..."
                className="w-full bg-transparent border-none outline-none py-3 px-2 text-foreground placeholder:text-muted-foreground/60 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full font-bold transition-all shadow-md active:scale-95 whitespace-nowrap hidden sm:block">
                Axtar
              </button>
            </div>

          </div>
        </section>

        {/* Categories Section */}
        <section className="pb-10 px-6 max-w-7xl mx-auto">
          <div className="flex gap-3 justify-start lg:justify-center overflow-x-auto pb-4 pt-2 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-hide">
            {categories.map((cat) => (
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

          {filteredArticles.length > 0 ? (
            <>
              {/* Featured Article */}
              {featuredArticle && activeCategory === "hamısı" && !searchQuery && (
                <div className="mb-12">
                  <ArticleCard article={featuredArticle} index={0} layout="featured" />
                </div>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularArticles.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} layout="grid" />
                ))}
              </div>
            </>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center bg-card rounded-3xl border border-border/50 border-dashed">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 text-3xl">
                📝
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Məqalə tapılmadı</h3>
              <p className="text-muted-foreground max-w-md">Axtarış meyarlarınıza uyğun məqalə yoxdur. Zəhmət olmasa başqa sözlə sınayın və ya filtrləri təmizləyin.</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("hamısı"); }}
                className="mt-6 px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md"
              >
                Təmizlə
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filteredArticles.length > 0 && (
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3.5 bg-card border border-border rounded-full text-foreground font-bold hover:bg-muted transition-colors shadow-sm flex items-center gap-2 group">
                Daha çox köhnə məqalə
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
