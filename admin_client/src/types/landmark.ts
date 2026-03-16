import type { Place } from './restaurant';

export enum LandmarkType {
  HISTORIC = 'HISTORIC',
  MUSEUM = 'MUSEUM',
  PARK = 'PARK',
  MODERN = 'MODERN',
}

export interface Landmark extends Place {
  // Landmarks are currently just Places with type LANDMARK
}

export interface CreateLandmarkDto {
  title: string;
  slug: string;
  short_description: string;
  detailed_description?: string;
  whatsapp_number: string;
  address: string;
  city?: string;
  google_maps_url?: string;
  phone_number?: string;
  email?: string;
  thumbnail?: string;
  is_featured?: boolean;
  show_in_hero?: boolean;
  type?: string;
}

export type UpdateLandmarkDto = Partial<CreateLandmarkDto>;
