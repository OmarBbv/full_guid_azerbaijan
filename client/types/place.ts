export interface PlaceImage {
  id: string;
  url: string;
  is_cover?: boolean;
  sort_order?: number;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

export interface WorkingHours {
  monday?: { open: string; close: string; closed?: boolean };
  tuesday?: { open: string; close: string; closed?: boolean };
  wednesday?: { open: string; close: string; closed?: boolean };
  thursday?: { open: string; close: string; closed?: boolean };
  friday?: { open: string; close: string; closed?: boolean };
  saturday?: { open: string; close: string; closed?: boolean };
  sunday?: { open: string; close: string; closed?: boolean };
  display?: string;
}

export interface Place {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string | null;
  subtitle: string | null;
  accent_color: string | null;
  city: string | null;
  district?: string | null;
  thumbnail: string | null;
  images: PlaceImage[];
  average_rating: number | string;
  review_count: number;
  show_in_hero: boolean;
  is_featured: boolean;
  type?: string;
  // Contact
  whatsapp_number?: string | null;
  whatsapp_message_template?: string | null;
  phone_number?: string | null;
  email?: string | null;
  website_url?: string | null;
  // Location
  address?: string | null;
  google_maps_url?: string | null;
  // Operation
  working_hours?: WorkingHours | null;
  social_media?: SocialMedia | null;
  // SEO
  meta_title?: string | null;
  meta_description?: string | null;
}
