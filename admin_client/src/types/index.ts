export interface Place {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  type: 'RESTAURANT' | 'HOTEL' | 'HOSTEL' | 'LANDMARK' | 'OTHER';
  status: 'ACTIVE' | 'PENDING' | 'INACTIVE';
  whatsapp_number: string;
  whatsapp_message_template?: string;
  phone_number?: string;
  email?: string;
  website_url?: string;
  address: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  thumbnail?: string;
  video_url?: string;
  working_hours?: any;
  social_media?: any;
  features?: string[];
  meta_title?: string;
  meta_description?: string;
  is_featured: boolean;
  view_count: number;
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  images?: PlaceImage[];
}

export interface PlaceImage {
  id: string;
  url: string;
  alt_text?: string;
  is_cover: boolean;
  sort_order: number;
}

export interface Hotel {
  id: string;
  place_id: string;
  place: Place;
  star_rating: number;
  hotel_type: string;
  price_from_azn?: number;
  price_to_azn?: number;
  available_board_types?: string[];
  total_rooms?: number;
  total_floors?: number;
  check_in_time?: string;
  check_out_time?: string;
  free_cancellation_days?: number;
  has_wifi: boolean;
  has_parking: boolean;
  has_pool: boolean;
  has_spa: boolean;
  has_gym: boolean;
  has_restaurant: boolean;
  has_room_service: boolean;
  has_airport_transfer: boolean;
  pets_allowed: boolean;
  accepts_cards: boolean;
  created_at: string;
  updated_at: string;
}

export interface Hostel {
  id: string;
  place_id: string;
  place: Place;
  hostel_type: string;
  dorm_beds_count?: number;
  private_rooms_count?: number;
  max_dorm_size?: number;
  available_dorm_gender?: string;
  dorm_price_from_eur?: number;
  private_price_from_eur?: number;
  check_in_time?: string;
  check_out_time?: string;
  has_wifi: boolean;
  has_kitchen: boolean;
  has_common_room: boolean;
  has_lockers: boolean;
  has_free_breakfast: boolean;
  has_bar: boolean;
  has_laundry: boolean;
  has_luggage_storage: boolean;
  has_24h_reception: boolean;
  organizes_tours: boolean;
  created_at: string;
  updated_at: string;
}

export interface Restaurant {
  id: string;
  place_id: string;
  place: Place;
  cuisine_type: string;
  dining_style?: string;
  price_range?: string;
  avg_bill_per_person_azn?: number;
  seating_capacity?: number;
  has_wifi: boolean;
  has_parking: boolean;
  has_outdoor_seating: boolean;
  has_live_music: boolean;
  is_halal_certified: boolean;
  is_vegetarian_friendly: boolean;
  created_at: string;
  updated_at: string;
}
