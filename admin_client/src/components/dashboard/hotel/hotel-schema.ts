import { z } from 'zod';
import { HotelType } from '@/types/hotel';

export const createHotelSchema = z.object({
  // ─── Place fields ─────────────────────────────────────────────────────────
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
  address: z.string().optional(),
  city: z.string().optional(),
  thumbnail: z.string().url().optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  language: z.enum(['az', 'en', 'ru']).default('az'),

  // ─── Hotel fields ─────────────────────────────────────────────────────────
  hotel_type: z.nativeEnum(HotelType).default(HotelType.HOTEL),
  star_rating: z.coerce.number().min(1).max(5).default(3),
  price_from_azn: z.coerce.number().min(0).optional(),
  price_to_azn: z.coerce.number().min(0).optional(),
  total_rooms: z.coerce.number().min(1).optional(),
  check_in_time: z.string().default('14:00'),
  check_out_time: z.string().default('12:00'),

  // ─── Amenities ────────────────────────────────────────────────────────────
  has_wifi: z.boolean().default(false),
  has_parking: z.boolean().default(false),
  has_pool: z.boolean().default(false),
  has_spa: z.boolean().default(false),
  has_gym: z.boolean().default(false),
  has_restaurant: z.boolean().default(false),
  has_room_service: z.boolean().default(false),
  has_airport_transfer: z.boolean().default(false),
  pets_allowed: z.boolean().default(false),
  accepts_cards: z.boolean().default(true),
});

export type CreateHotelFormValues = z.infer<typeof createHotelSchema>;
