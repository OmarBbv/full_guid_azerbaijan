import Hero from '@/components/home/Hero';
import StatsSection from '@/components/home/StatsSection';
import InteractiveMap from '@/components/home/InteractiveMap';
import PopularPlaces from '@/components/home/PopularPlaces';
import ExperienceSection from '@/components/home/ExperienceSection';
import BlogSection from '@/components/home/BlogSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import HomeVenues from '@/components/home/HomeVenues';
import AdBannerComponent from '@/components/shared/AdBanner';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background text-foreground transition-colors duration-300">

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <Hero />

        {/* Stats / Statistikalar */}
        <StatsSection />

        {/* 📢 hero_alti Reklam */}
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AdBannerComponent position="hero_alti" />
        </div>

        {/* Məkanlar: Restoran, Otel, Hostel */}
        <HomeVenues />

        {/* 📢 orta_banner Reklam */}
        <div className="max-w-7xl mx-auto px-6 w-full">
          <AdBannerComponent position="orta_banner" />
        </div>

        {/* Interactive Map */}
        {/* <InteractiveMap /> */}

        {/* Populyar Məkanlar */}
        <PopularPlaces />

        {/* Necə işləyir + Turlar */}
        <ExperienceSection />

        {/* Rəylər */}
        <TestimonialsSection />

        {/* Bloq */}
        <BlogSection />

        {/* Newsletter */}
        <NewsletterSection />
      </main>

    </div>
  );
}
