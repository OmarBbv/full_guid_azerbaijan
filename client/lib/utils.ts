import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Place } from "@/types/place"
import un_photo_1514933651103_005eec06c04b_3224055e from "@/assets/unsplash/photo-1514933651103-005eec06c04b_3224055e.jpg";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (p: Place | undefined | null, fallbackUrl: any = un_photo_1514933651103_005eec06c04b_3224055e): any => {
  if (!p) return fallbackUrl;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';

  const processPath = (url: any) => {
    if (!url) return null;
    if (typeof url !== 'string') return url;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads')) return `${apiUrl}${url}`;
    return url;
  };

  if (p.thumbnail) {
    const processed = processPath(p.thumbnail);
    if (processed) return processed;
  }

  if (p.images && p.images.length > 0) {
    const coverImage = p.images.find(img => img.is_cover);
    const sortedImages = [...p.images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    const finalUrl = coverImage ? coverImage.url : sortedImages[0].url;
    return processPath(finalUrl) || fallbackUrl;
  }

  return fallbackUrl;
};
