export interface PlaceImage {
  id: string;
  url: string;
  is_cover?: boolean;
  sort_order?: number;
}

export interface Place {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  subtitle: string | null;
  accent_color: string | null;
  city: string | null;
  thumbnail: string | null;
  images: PlaceImage[];
  average_rating: number | string;
  review_count: number;
  show_in_hero: boolean;
  is_featured: boolean;
}
