import { MapPin, ArrowRight, Star, Globe, Camera, Compass } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { regionService } from "@/services/api/region.service";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    let region;
    try {
      region = await regionService.getRegionById(slug, locale);
    } catch {
      region = await regionService.getRegionBySlug(slug, locale);
    }
    return {
      title: `${region.name} - Azərbaycanın Regionları | FullGuide`,
      description: region.description || `${region.name} haqqında ətraflı məlumat.`,
      openGraph: {
        title: `${region.name} - FullGuide Azərbaycan`,
        description: region.description || '',
        images: [region.cover_image_url || region.image_url || ''],
      },
    };
  } catch {
    return { title: 'Region | FullGuide' };
  }
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RegionPage' });
  
  let region;
  try {
    // Try ID first, with language so we get the correct translation
    region = await regionService.getRegionById(slug, locale);
  } catch {
    try {
      // Fallback: try treating the param as a slug
      region = await regionService.getRegionBySlug(slug, locale);
    } catch {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background px-4">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
            <MapPin className="w-10 h-10 text-muted-foreground opacity-30" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">{t("not_found_title")}</h1>
            <p className="text-muted-foreground mb-8">{t("not_found_desc")}</p>
          </div>
          <Link href="/regions" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-lg transition-all">
            {t("back_to_regions")}
          </Link>
        </div>
      );
    }
  }

  const heroImage = region.cover_image_url || region.image_url || "https://images.unsplash.com/photo-1606775791264-b333a5cf05cc?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[90dvh] min-h-[600px] overflow-hidden">
        {/* Background Image with Parallax-like feel */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={region.name}
            className="w-full h-full object-cover scale-105"
            style={{ filter: "brightness(0.65)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pt-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Globe className="w-4 h-4 text-primary" />
            <span>{region.region || 'Azərbaycan'}</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            {region.name}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            {region.description?.slice(0, 180)}...
          </p>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{t("scroll_down")}</span>
            <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </section>

      <main className="relative z-20">
        {/* About & Stats */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-xs mb-4">
                <Compass className="w-4 h-4" />
                <span>{t("about_region")}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]">
                {t("why_visit", { name: `<span class="text-primary">${region.name}</span>` }).split('<span').map((part, i) => {
                  if (i === 0) return part;
                  const [inner, rest] = part.split('</span>');
                  const match = inner.match(/class="([^"]+)">/);
                  const className = match ? match[1] : '';
                  const content = inner.replace(/.*>/, '');
                  return (
                    <span key={i}>
                      <span className={className}>{content}</span>{rest}
                    </span>
                  );
                })}
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
                <p className="text-xl leading-relaxed">
                  {region.description || t("description_placeholder")}
                </p>
              </div>

              {/* Highlights Chips */}
              {region.highlights && region.highlights.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-4">
                  {region.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-muted/50 border border-border/50 px-6 py-4 rounded-3xl hover:bg-muted transition-colors group">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-bold text-sm text-foreground">{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5">
              {/* Attraction List Card */}
              <div className="sticky top-24 bg-card border border-border/50 rounded-[40px] p-8 md:p-12 shadow-2xl">
                <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                  {t("must_see")}
                </h3>
                
                <div className="space-y-4">
                  {region.attractions && region.attractions.length > 0 ? (
                    region.attractions.map((attr, idx) => (
                      <div
                        key={idx}
                        className="group flex items-center justify-between p-5 bg-muted/30 hover:bg-primary/5 rounded-3xl transition-all border border-transparent hover:border-primary/10"
                      >
                        <div>
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors">
                            {attr.name}
                          </h4>
                          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">{attr.type}</span>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground italic text-center py-6">{t("no_attractions")}</p>
                  )}
                </div>

                <Link
                  href={`/mekanlar?region=${region.id}`}
                  className="mt-10 w-full flex items-center justify-center gap-3 py-5 bg-foreground text-background rounded-full font-bold hover:scale-[1.02] transition-all"
                >
                  {t("see_all_venues")} <Compass className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {region.gallery_urls && region.gallery_urls.length > 0 && (
          <section className="py-24 bg-muted/30">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-primary font-bold uppercase text-xs mb-3">
                    <Camera className="w-4 h-4" />
                    <span>{t("visual_discovery")}</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black">{t("gallery_title", { name: region.name })}</h2>
                </div>
                <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
                  {t("gallery_desc")}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {region.gallery_urls.map((url, i) => (
                  <div 
                    key={i} 
                    className={`group relative overflow-hidden rounded-3xl bg-muted ${
                      i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'
                    }`}
                  >
                    <img 
                      src={url} 
                      alt={`${region.name} gallery ${i}`} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                        <Camera className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden bg-primary rounded-[60px] p-12 md:p-20 text-center text-primary-foreground">
              {/* Background Shapes */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                  {t("plan_trip", { name: region.name })}
                </h2>
                <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto font-medium">
                  {t("plan_trip_desc")}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`/mekanlar?region=${region.id}`}
                    className="px-10 py-5 bg-white text-primary rounded-full font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    {t("discover_now")}
                  </Link>
                  <Link
                    href="/contact"
                    className="px-10 py-5 bg-transparent border-2 border-white/50 text-white rounded-full font-black text-lg hover:bg-white/10 transition-all"
                  >
                    {t("contact_us")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
