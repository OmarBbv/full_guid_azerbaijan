import { useTranslations } from 'next-intl';
import Hero from '@/components/home/Hero';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background text-foreground transition-colors duration-300">

      {/* Hero Section */}
      <main className="flex-1 flex flex-col">
        <Hero />
      </main>

    </div>
  );
}
