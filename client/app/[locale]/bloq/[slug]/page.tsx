'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useBlogPost } from '@/hooks/use-blog';
import { Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function BlogPostDetail(): React.JSX.Element {
  const { slug } = useParams() as { slug: string };
  const locale = useLocale();
  const t = useTranslations('Blog');
  const { data: post, isLoading, isError } = useBlogPost(slug, locale);
  
  const handleShare = () => {
    if (typeof window === 'undefined') return;
    const url = window.location.href;
    const title = post?.title || 'Full Guide Azerbaijan';

    if (navigator.share) {
      navigator.share({
        title: title,
        url: url,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Link kopyalandı!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-40 px-6 max-w-4xl mx-auto flex flex-col gap-8 animate-pulse">
        <div className="w-full h-[400px] bg-muted rounded-3xl" />
        <div className="h-10 bg-muted w-3/4 rounded-lg" />
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-muted rounded-full" />
          <div className="h-4 bg-muted w-32 rounded" />
        </div>
        <div className="space-y-4 pt-4">
          <div className="h-4 bg-muted w-full rounded" />
          <div className="h-4 bg-muted w-full rounded" />
          <div className="h-4 bg-muted w-2/3 rounded" />
        </div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen pt-40 flex flex-col items-center text-center px-6">
        <h1 className="text-4xl font-bold mb-4">{t('no_results_title')}</h1>
        <p className="text-muted-foreground mb-8">Bu məqalə tapılmadı və ya silinib.</p>
        <Link href="/bloq" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold transition-all hover:scale-105">
          Bütün məqalələrə qayıt
        </Link>
      </div>
    );
  }

  const publishedDate = post.published_at || post.created_at;
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString(locale === "az" ? "az-AZ" : locale === "ru" ? "ru-RU" : "en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
    : "";

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Post Header Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/bloq"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            {t('all_articles')}
          </Link>

          <div className="mb-6">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-[12px] font-bold text-white uppercase tracking-wider mb-4"
              style={{ background: post.category_color || '#3b9cf5', backdropFilter: 'blur(8px)' }}
            >
              {post.category_label || post.category}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6 leading-[1.15] tracking-tight">
              {post.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-border/50">
            <div className="flex items-center gap-4">
              <Image
                src={post.author_avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author_name || 'A')}`}
                alt={post.author_name || "Author"}
                width={48}
                height={48}
                unoptimized
                className="rounded-full object-cover border-2 border-primary/20"
              />
              <div>
                <p className="font-bold text-foreground">{post.author_name || 'Admin'}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5 uppercase tracking-wide">
                  {formattedDate && <><Calendar size={12} /> {formattedDate}</>}
                  <span className="w-1 h-1 bg-border rounded-full mx-1" />
                  {post.read_time_minutes && <><Clock size={12} /> {post.read_time_minutes} {t('read_time')}</>}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted-foreground hover:text-white transition-all cursor-pointer"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.cover_image_url && (
        <section className="px-6 mb-16">
          <div className="max-w-6xl mx-auto h-[400px] md:h-[600px] relative rounded-[2rem] overflow-hidden shadow-2xl">
            <Image
              src={post.cover_image_url}
              alt={post.title}
              fill
              unoptimized
              className="object-cover"
              priority
            />
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
            <div
              className="text-foreground leading-relaxed text-lg"
              dangerouslySetInnerHTML={{ __html: post.content_html || '' }}
            />
          </div>

        </div>
      </section>
    </div>
  );
}
