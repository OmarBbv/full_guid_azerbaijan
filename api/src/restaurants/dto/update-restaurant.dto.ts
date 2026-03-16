import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsArray,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CuisineType,
  DiningStyle,
  PriceRange,
} from '../entities/restaurant.entity';

export class UpdateRestaurantDto {
  // ─── Place base fields ───────────────────────────────────────────────────

  @IsString()
  @MaxLength(255)
  @IsOptional()
  title?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  short_description?: string;

  @IsString()
  @IsOptional()
  detailed_description?: string;

  @IsString()
  @MaxLength(50)
  @IsOptional()
  whatsapp_number?: string;

  @IsString()
  @IsOptional()
  whatsapp_message_template?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  google_maps_url?: string;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsOptional()
  working_hours?: Record<string, unknown>;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @IsString()
  @IsOptional()
  meta_title?: string;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  // ─── Restaurant-specific fields ─────────────────────────────────────────

  @IsEnum(CuisineType)
  @IsOptional()
  cuisine_type?: CuisineType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specialties?: string[];

  @IsEnum(DiningStyle)
  @IsOptional()
  dining_style?: DiningStyle;

  @IsEnum(PriceRange)
  @IsOptional()
  price_range?: PriceRange;

  @IsInt()
  @IsOptional()
  @Min(0)
  avg_bill_per_person_azn?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  seating_capacity?: number;

  @IsBoolean()
  @IsOptional()
  requires_reservation?: boolean;

  @IsString()
  @IsOptional()
  menu_pdf_url?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  menu_images?: string[];

  @IsBoolean()
  @IsOptional()
  has_wifi?: boolean;

  @IsBoolean()
  @IsOptional()
  has_parking?: boolean;

  @IsBoolean()
  @IsOptional()
  has_outdoor_seating?: boolean;

  @IsBoolean()
  @IsOptional()
  has_live_music?: boolean;

  @IsBoolean()
  @IsOptional()
  is_halal_certified?: boolean;

  @IsBoolean()
  @IsOptional()
  is_vegetarian_friendly?: boolean;

  @IsBoolean()
  @IsOptional()
  has_private_rooms?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_cards?: boolean;
}
