// ─── Enums (mirrored from API) ────────────────────────────────────────────────

export enum PlaceStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

export enum PlaceType {
  RESTAURANT = 'RESTAURANT',
  HOTEL = 'HOTEL',
  HOSTEL = 'HOSTEL',
  LANDMARK = 'LANDMARK',
  NATURE = 'NATURE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  MUSEUM = 'MUSEUM',
  OTHER = 'OTHER',
}

export enum CuisineType {
  AZERBAIJANI = 'AZERBAIJANI',
  TURKISH = 'TURKISH',
  EUROPEAN = 'EUROPEAN',
  ITALIAN = 'ITALIAN',
  SEAFOOD = 'SEAFOOD',
  ASIAN = 'ASIAN',
  GEORGIAN = 'GEORGIAN',
  MIXED = 'MIXED',
  OTHER = 'OTHER',
}

export enum DiningStyle {
  CASUAL = 'CASUAL',
  FINE_DINING = 'FINE_DINING',
  CAFE = 'CAFE',
  FAST_FOOD = 'FAST_FOOD',
  BUFFET = 'BUFFET',
  MUSEUM_STYLE = 'MUSEUM_STYLE',
}

export enum PriceRange {
  BUDGET = 'BUDGET',
  MID = 'MID',
  UPSCALE = 'UPSCALE',
  LUXURY = 'LUXURY',
}

// ─── Place (base) ─────────────────────────────────────────────────────────────

export interface PlaceImage {
  id: string;
  url: string;
  is_cover: boolean;
  sort_order: number;
}

export interface Place {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  detailed_description: string | null;
  subtitle: string | null;
  accent_color: string | null;
  type: PlaceType;
  status: PlaceStatus;
  whatsapp_number: string;
  whatsapp_message_template: string | null;
  phone_number: string | null;
  email: string | null;
  address: string;
  city: string | null;
  google_maps_url: string | null;
  thumbnail: string | null;
  images?: PlaceImage[];
  working_hours: Record<string, unknown> | null;
  features: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_featured: boolean;
  show_in_hero: boolean;
  average_rating: number;
  review_count: number;
  view_count: number;
  created_at: string;
  updated_at: string;
}

// ─── Restaurant ───────────────────────────────────────────────────────────────

export interface Restaurant {
  id: string;
  place_id: string;
  place: Place;
  cuisine_type: CuisineType;
  specialties: string[] | null;
  dining_style: DiningStyle;
  price_range: PriceRange;
  avg_bill_per_person_azn: number | null;
  seating_capacity: number | null;
  menu_pdf_url: string | null;
  menu_images: string[] | null;
  has_wifi: boolean;
  has_parking: boolean;
  has_outdoor_seating: boolean;
  has_live_music: boolean;
  is_halal_certified: boolean;
  is_vegetarian_friendly: boolean;
  has_private_rooms: boolean;
  accepts_cards: boolean;
  created_at: string;
  updated_at: string;
}

// ─── DTOs ─────────────────────────────────────────────────────────────────────

export interface CreatePlaceDto {
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  subtitle?: string;
  accent_color?: string;
  type?: PlaceType;
  status?: PlaceStatus;
  whatsapp_number: string;
  whatsapp_message_template?: string;
  phone_number?: string;
  email?: string;
  website_url?: string;
  address: string;
  city?: string;
  google_maps_url?: string;
  thumbnail?: string;
  video_url?: string;
  is_featured?: boolean;
  show_in_hero?: boolean;
}

export type UpdatePlaceDto = Partial<CreatePlaceDto>;

export interface CreateRestaurantDto {
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  whatsapp_number: string;
  whatsapp_message_template?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  city?: string;
  google_maps_url?: string;
  thumbnail?: string;
  features?: string[];
  meta_title?: string;
  meta_description?: string;
  is_featured?: boolean;
  cuisine_type?: CuisineType;
  specialties?: string[];
  dining_style?: DiningStyle;
  price_range?: PriceRange;
  avg_bill_per_person_azn?: number;
  seating_capacity?: number;
  has_wifi?: boolean;
  has_parking?: boolean;
  has_outdoor_seating?: boolean;
  has_live_music?: boolean;
  is_halal_certified?: boolean;
  is_vegetarian_friendly?: boolean;
  has_private_rooms?: boolean;
  accepts_cards?: boolean;
}

export type UpdateRestaurantDto = Partial<CreateRestaurantDto>;
