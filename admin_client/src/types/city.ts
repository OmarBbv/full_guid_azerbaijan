// ─── City ─────────────────────────────────────────────────────────────────────

export interface City {
  id: string;
  name: string;
  slug: string;
  language: string;
  description: string | null;
  image_url: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
  latitude: number | null;
  longitude: number | null;
  region: string | null;
  country_code: string | null;
  highlights: string[] | null;
  attractions: Array<{ name: string; type: string }> | null;
  meta_title: string | null;
  meta_description: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCityDto {
  name: string;
  slug: string;
  language?: string;
  description?: string;
  gallery_urls?: string[];
  latitude?: number;
  longitude?: number;
  region?: string;
  country_code?: string;
  highlights?: string[];
  attractions?: Array<{ name: string; type: string }>;
  meta_title?: string;
  meta_description?: string;
  is_active?: boolean;
  is_featured?: boolean;
  sort_order?: number;
}

export type UpdateCityDto = Partial<CreateCityDto>;
