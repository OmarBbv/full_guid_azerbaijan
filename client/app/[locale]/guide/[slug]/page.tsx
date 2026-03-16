import { Metadata } from "next";
import { notFound } from "next/navigation";
import { guidePageService } from "@/services/api/guide-page.service";
import { Info } from "lucide-react";
import { Link } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const page = await guidePageService.getBySlug(slug, locale);
    return {
      title: `${page.title} - FullGuide Azerbaijan`,
      description: page.subtitle || page.title,
    };
  } catch {
    return { title: 'Məlumat | FullGuide' };
  }
}

export default async function GuidePageDetail({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  let page;
  try {
    page = await guidePageService.getBySlug(slug, locale);
  } catch (error) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70dvh] min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {page.image_url ? (
            <img
              src={page.image_url.startsWith('http') ? page.image_url : `${process.env.NEXT_PUBLIC_API_URL}${page.image_url}`}
              alt={page.title}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.4)" }}
            />
          ) : (
            <div className="w-full h-full bg-slate-900" />
          )}
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto pt-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {page.title}
          </h1>

          {page.subtitle && (
            <p className="text-xl md:text-2xl text-white/80 font-medium max-w-3xl leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              {page.subtitle}
            </p>
          )}
        </div>

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce opacity-50">
          <div className="w-px h-12 bg-linear-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* Dynamic Sections */}
        {page.sections && page.sections.length > 0 ? (
          <div className="space-y-20">
            {page.sections.map((section: any, index: number) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
                {section.title && (
                  <h2 className="text-3xl font-bold mb-6 text-foreground tracking-tight">
                    {section.title}
                  </h2>
                )}
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/30 rounded-[40px] border border-dashed border-border">
            <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Məzmun tezliklə əlavə olunacaq.</p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <section className="pb-24 px-6 max-w-5xl mx-auto">
        <div className="bg-muted/50 rounded-[50px] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 border border-border/50">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Başqa suallarınız var?</h3>
            <p className="text-muted-foreground">Kömək üçün bizimlə əlaqə saxlayın.</p>
          </div>
          <Link href="/contact" className="px-10 py-5 bg-foreground text-background rounded-full font-black hover:scale-105 transition-all shadow-xl">
            Bizimlə Əlaqə
          </Link>
        </div>
      </section>
    </div>
  );
}
