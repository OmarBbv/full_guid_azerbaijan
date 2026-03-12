import { z } from 'zod';
import { HostelType } from '@/types/hostel';

export const createHostelSchema = z.object({
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
  language: z.enum(['az', 'en', 'ru', 'tr', 'ar', 'hi']).default('az'),

  hostel_type: z.nativeEnum(HostelType).default(HostelType.BACKPACKER),
  dorm_beds_count: z.coerce.number().min(1).optional(),
  private_rooms_count: z.coerce.number().min(0).optional(),
  dorm_price_from_eur: z.coerce.number().min(0).optional(),
  private_price_from_eur: z.coerce.number().min(0).optional(),
  check_in_time: z.string().default('14:00'),
  check_out_time: z.string().default('12:00'),

  has_wifi: z.boolean().default(false),
  has_kitchen: z.boolean().default(false),
  has_common_room: z.boolean().default(false),
  has_lockers: z.boolean().default(false),
  has_free_breakfast: z.boolean().default(false),
  has_bar: z.boolean().default(false),
  has_laundry: z.boolean().default(false),
  organizes_tours: z.boolean().default(false),
  has_24h_security: z.boolean().default(false),
});

export type CreateHostelFormValues = z.infer<typeof createHostelSchema>;
