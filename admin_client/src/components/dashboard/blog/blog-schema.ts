import { z } from 'zod';

export const blogPostSchema = z.object({
  title: z.string().min(1, 'Başlıq mütləqdir').max(255, 'Başlıq çox uzundur'),
  slug: z.string().min(1, 'Slug mütləqdir').max(255, 'Slug çox uzundur'),
  language: z.enum(['az', 'en', 'ru']).default('az'),
  excerpt: z.string().min(1, 'Qısa təsvir mütləqdir'),
  content_html: z.string().optional(),
  category: z.string().max(100).optional(),
  category_label: z.string().max(120).optional(),
  category_color: z.string().max(20).optional(),
  cover_image_url: z.string().optional(),
  author_name: z.string().max(120).optional(),
  author_avatar_url: z.string().optional(),
  read_time_minutes: z.coerce.number().int().min(0).optional(),
  published_at: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_pinned: z.boolean().default(false),
  is_published: z.boolean().default(true),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
