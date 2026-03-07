import { z } from 'zod';
import { CuisineType, DiningStyle, PriceRange } from '@/types/restaurant';

export const createRestaurantSchema = z.object({
  // ─── Place (base) fields ─────────────────────────────────────────────────
  title: z.string().min(1, 'Ad tələb olunur').max(255),
  slug: z
    .string()
    .min(1, 'Slug tələb olunur')
    .max(255)
    .regex(/^[a-z0-9-]+$/, 'Slug yalnız kiçik hərf, rəqəm və tire ola bilər'),
  short_description: z.string().min(1, 'Qısa təsvir tələb olunur'),
  detailed_description: z.string().optional(),
  whatsapp_number: z
    .string()
    .min(1, 'WhatsApp nömrəsi tələb olunur'),
  whatsapp_message_template: z.string().optional(),
  phone_number: z.string().optional(),
  email: z.string().email('Düzgün e-poçt daxil edin').optional().or(z.literal('')),
  address: z.string().optional(),
  city: z.string().optional(),
  thumbnail: z.string().url('Düzgün URL daxil edin').optional().or(z.literal('')),
  is_featured: z.boolean().default(false),

  // ─── Restaurant-specific fields ──────────────────────────────────────────
  cuisine_type: z.nativeEnum(CuisineType).default(CuisineType.AZERBAIJANI),
  dining_style: z.nativeEnum(DiningStyle).default(DiningStyle.CASUAL),
  price_range: z.nativeEnum(PriceRange).default(PriceRange.MID),
  avg_bill_per_person_azn: z.coerce.number().min(0).optional(),
  seating_capacity: z.coerce.number().min(1).optional(),

  // ─── Amenities ────────────────────────────────────────────────────────────
  has_wifi: z.boolean().default(false),
  has_parking: z.boolean().default(false),
  has_outdoor_seating: z.boolean().default(false),
  has_live_music: z.boolean().default(false),
  is_halal_certified: z.boolean().default(false),
  is_vegetarian_friendly: z.boolean().default(false),
  has_private_rooms: z.boolean().default(false),
  accepts_cards: z.boolean().default(false),
});

export type CreateRestaurantFormValues = z.infer<typeof createRestaurantSchema>;
