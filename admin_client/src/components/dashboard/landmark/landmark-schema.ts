import { z } from 'zod';
import { PlaceStatus } from '@/types/restaurant';

export const createLandmarkSchema = z.object({
  title: z.string().min(1, 'Ad tələb olunur').max(255),
  slug: z
    .string()
    .min(1, 'Slug tələb olunur')
    .regex(/^[a-z0-9-]+$/, 'Slug yalnız kiçik hərf, rəqəm və tire ola bilər'),
  short_description: z.string().min(1, 'Qısa təsvir tələb olunur'),
  detailed_description: z.string().optional(),
  whatsapp_number: z
    .string()
    .min(1, 'WhatsApp nömrəsi tələb olunur')
    .regex(/^\+?[0-9\s-]{10,20}$/, 'WhatsApp düzgün formatda deyil'),
  phone_number: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().min(1, 'Ünvan tələb olunur'),
  city: z.string().optional(),
  google_maps_url: z.string().optional().or(z.literal('')),
  thumbnail: z.string().url().optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  show_in_hero: z.boolean().default(false),
  language: z.enum(['az', 'en', 'ru', 'tr', 'ar', 'hi']).default('az'),
  status: z.nativeEnum(PlaceStatus).default(PlaceStatus.ACTIVE),
});

export type CreateLandmarkFormValues = z.infer<typeof createLandmarkSchema>;
