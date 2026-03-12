import { z } from 'zod';
import { PlaceType } from '@/types/restaurant';

export const createPlaceSchema = z.object({
  title: z.string().min(1, 'Ad mütləqdir'),
  slug: z.string().min(1, 'Slug mütləqdir'),
  short_description: z.string().min(1, 'Qısa təsvir mütləqdir'),
  detailed_description: z.string().optional(),
  subtitle: z.string().optional(),
  accent_color: z.string().optional(),
  type: z.nativeEnum(PlaceType),
  whatsapp_number: z.string().min(1, 'WhatsApp nömrəsi mütləqdir'),
  phone_number: z.string().optional(),
  email: z.string().email('Düzgün e-poçt deyil').optional().or(z.literal('')),
  city: z.string().optional(),
  address: z.string().min(1, 'Ünvan mütləqdir'),
  thumbnail: z.string().url('Düzgün URL deyil').optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  show_in_hero: z.boolean().default(false),
  language: z.enum(['az', 'en', 'ru', 'tr', 'ar', 'hi']).default('az'),
});

export type CreatePlaceFormValues = z.infer<typeof createPlaceSchema>;
