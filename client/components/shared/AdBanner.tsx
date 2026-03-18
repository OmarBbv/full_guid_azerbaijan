'use client';

import Image from 'next/image';
import { useAdsByPosition } from '@/hooks/use-ads';
import type { AdPosition } from '@/services/api/ad.service';

interface AdBannerProps {
  position: AdPosition;
  className?: string;
}

export default function AdBannerComponent({ position, className = '' }: AdBannerProps) {
  const { data: ad } = useAdsByPosition(position);

  if (!ad) return null;

  const aspectRatio = position === 'mekan_sidebar' ? '10/3' : '35/6';

  const content = (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-lg border border-border/10 group ${className}`}
    >
      <span className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white/70 text-[10px] uppercase font-bold px-2 py-0.5 rounded z-10 pointer-events-none select-none">
        Reklam
      </span>

      <div className="relative w-full" style={{ aspectRatio }}>
        <Image
          src={ad.image_url}
          alt={ad.title || 'Reklam'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          unoptimized
        />
        {ad.redirect_url && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        )}
      </div>
    </div>
  );

  if (ad.redirect_url) {
    return (
      <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer sponsored" className="block w-full">
        {content}
      </a>
    );
  }

  return content;
}
