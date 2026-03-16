import { z } from 'zod';
import { VenueStatus } from '@/types/venue';

export const VENUE_LANGUAGES = [
  { value: 'az', label: '🇦🇿 Azərbaycan' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'ru', label: '🇷🇺 Русский' },
  { value: 'tr', label: '🇹🇷 Türkçe' },
  { value: 'ar', label: '🇸🇦 العربية' },
  { value: 'hi', label: '🇮🇳 हिन्दी' },
] as const;

export const venueSchema = z.object({
  name: z.string().min(1, 'Ad tələb olunur').max(200),
  language: z.enum(['az', 'en', 'ru', 'tr', 'ar', 'hi']).default('az'),
  description: z.string().optional(),
  categoryId: z.coerce.number().min(1, 'Kateqoriya tələb olunur'),
  address: z.string().min(1, 'Ünvan tələb olunur'),
  city: z.string().optional(),
  district: z.string().optional(),
  phone: z.string().optional(),
  whatsapp: z.string().optional(),
  website: z.string().url('Düzgün URL daxil edin').optional().or(z.literal('')),
  thumbnail: z.any().optional(),
  status: z.nativeEnum(VenueStatus).default(VenueStatus.ACTIVE),
});

export type VenueFormValues = z.infer<typeof venueSchema>;
