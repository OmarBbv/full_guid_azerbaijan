import { Category } from './category';

export enum VenueStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export interface VenueImage {
  id: number;
  url: string;
  alt?: string;
  order: number;
}

export interface Venue {
  id: number;
  slug: string;
  name: string;
  language: string;
  description?: string;
  address: string;
  city?: string;
  googleMapsUrl?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  workingHours?: any;
  rating: number;
  reviewCount: number;
  status: VenueStatus;
  thumbnail?: string;
  categoryId: number;
  category?: Category;
  subCategoryId?: number | null;
  subCategory?: Category;
  images?: VenueImage[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateVenueDto {
  name: string;
  language?: string;
  description?: string;
  categoryId: number;
  subCategoryId?: number | null;
  address: string;
  city?: string;
  googleMapsUrl?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  workingHours?: any;
  thumbnail?: string;
  images?: { url: string; alt?: string; order?: number }[];
}

export type UpdateVenueDto = Partial<CreateVenueDto>;

export interface QueryVenueDto {
  page?: number;
  limit?: number;
  categoryId?: number;
  city?: string;
  search?: string;
  status?: VenueStatus;
  language?: string;
}
