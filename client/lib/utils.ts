import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Place } from "@/types/place"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (p: Place | undefined | null, fallbackUrl: string = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=2074&auto=format&fit=crop'): string => {
  if (!p) return fallbackUrl;
  if (p.thumbnail) return p.thumbnail;
  if (p.images && p.images.length > 0) {
    const coverImage = p.images.find(img => img.is_cover);
    const sortedImages = [...p.images].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    return (coverImage ? coverImage.url : sortedImages[0].url).replace('localhost', '127.0.0.1');
  }
  return fallbackUrl;
};
