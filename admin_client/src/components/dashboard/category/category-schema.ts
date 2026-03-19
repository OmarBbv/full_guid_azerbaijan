import { z } from 'zod';

export const CATEGORY_LANGUAGES = [
  { value: 'az', label: '🇦🇿 Azərbaycan' },
  { value: 'en', label: '🇬🇧 English' },
  { value: 'ru', label: '🇷🇺 Русский' },
  { value: 'tr', label: '🇹🇷 Türkçe' },
  { value: 'ar', label: '🇸🇦 العربية' },
  { value: 'hi', label: '🇮🇳 हिन्दी' },
] as const;

export const categorySchema = z.object({
  name: z.string().min(1, 'Ad tələb olunur').max(100),
  slug: z.string().min(1, 'Slug tələb olunur').max(100),
  icon: z.string().optional().or(z.literal('')),
  language: z.enum(['az', 'en', 'ru', 'tr', 'ar', 'hi']).default('az'),
  parentId: z.coerce.number().optional().nullable(),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
