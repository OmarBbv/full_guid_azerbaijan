export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  language: string;
  excerpt: string;
  content_html: string | null;
  category: string | null;
  category_label: string | null;
  category_color: string | null;
  cover_image_url: string | null;
  author_name: string | null;
  author_avatar_url: string | null;
  read_time_minutes: number | null;
  published_at: string | null;
  is_featured: boolean;
  is_pinned: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogQueryParams {
  language?: string;
  category?: string;
  search?: string;
  featured?: boolean;
  published?: boolean;
}
