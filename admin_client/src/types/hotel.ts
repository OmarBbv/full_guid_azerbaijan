// ─── Hotel Enums ──────────────────────────────────────────────────────────────

export enum HotelType {
  HOTEL = 'HOTEL',
  BOUTIQUE = 'BOUTIQUE',
  RESORT = 'RESORT',
  VILLA = 'VILLA',
  APARTMENT = 'APARTMENT',
}

export enum BoardType {
  ROOM_ONLY = 'ROOM_ONLY',
  BED_BREAKFAST = 'BED_BREAKFAST',
  HALF_BOARD = 'HALF_BOARD',
  FULL_BOARD = 'FULL_BOARD',
  ALL_INCLUSIVE = 'ALL_INCLUSIVE',
}

// ─── Hotel ────────────────────────────────────────────────────────────────────

import type { Place } from './restaurant';

export interface Hotel {
  id: string;
  place_id: string;
  place: Place;
  star_rating: number;
  hotel_type: HotelType;
  price_from_azn: number | null;
  price_to_azn: number | null;
  available_board_types: string[] | null;
  total_rooms: number | null;
  total_floors: number | null;
  check_in_time: string;
  check_out_time: string;
  free_cancellation_days: number;
  has_wifi: boolean;
  has_parking: boolean;
  has_pool: boolean;
  has_spa: boolean;
  has_gym: boolean;
  has_restaurant: boolean;
  has_room_service: boolean;
  has_airport_transfer: boolean;
  has_butler_service: boolean;
  has_concierge: boolean;
  pets_allowed: boolean;
  accepts_cards: boolean;
  views: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface CreateHotelDto {
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  whatsapp_number?: string;
  address?: string;
  city?: string;
  google_maps_url?: string;
  thumbnail?: string;
  phone_number?: string;
  email?: string;
  star_rating?: number;
  hotel_type?: HotelType;
  price_from_azn?: number;
  price_to_azn?: number;
  total_rooms?: number;
  has_wifi?: boolean;
  has_parking?: boolean;
  has_pool?: boolean;
  has_spa?: boolean;
  has_gym?: boolean;
  has_restaurant?: boolean;
  accepts_cards?: boolean;
  language?: string;
  status?: string;
}

export type UpdateHotelDto = Partial<CreateHotelDto>;
