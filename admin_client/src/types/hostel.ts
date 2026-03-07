// ─── Hostel Enums ─────────────────────────────────────────────────────────────

export enum HostelType {
  PARTY_HOSTEL = 'PARTY_HOSTEL',
  FAMILY_HOSTEL = 'FAMILY_HOSTEL',
  BOUTIQUE_HOSTEL = 'BOUTIQUE_HOSTEL',
  BACKPACKER = 'BACKPACKER',
  HISTORIC = 'HISTORIC',
}

export enum DormGender {
  MIXED = 'MIXED',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

// ─── Hostel ───────────────────────────────────────────────────────────────────

import type { Place } from './restaurant';

export interface Hostel {
  id: string;
  place_id: string;
  place: Place;
  hostel_type: HostelType;
  dorm_beds_count: number | null;
  private_rooms_count: number | null;
  max_dorm_size: number | null;
  available_dorm_gender: DormGender | null;
  dorm_price_from_eur: number | null;
  private_price_from_eur: number | null;
  check_in_time: string;
  check_out_time: string;
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
  has_24h_security: boolean;
  has_cctv: boolean;
  has_keycard_access: boolean;
  social_events: string[] | null;
  hostel_vibe: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateHostelDto {
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  whatsapp_number: string;
  address?: string;
  city?: string;
  phone_number?: string;
  email?: string;
  hostel_type?: HostelType;
  dorm_beds_count?: number;
  private_rooms_count?: number;
  dorm_price_from_eur?: number;
  private_price_from_eur?: number;
  check_in_time?: string;
  check_out_time?: string;
  has_wifi?: boolean;
  has_kitchen?: boolean;
  has_common_room?: boolean;
  has_lockers?: boolean;
  has_free_breakfast?: boolean;
  has_bar?: boolean;
  has_laundry?: boolean;
}

export type UpdateHostelDto = Partial<CreateHostelDto>;
