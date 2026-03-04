import {
  IsString,
  IsOptional,
  IsEnum,
  IsInt,
  IsBoolean,
  IsArray,
  Min,
  Max,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HotelType } from '../entities/hotel.entity';

export class UpdateHotelDto {
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
  phone_number?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  website_url?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsOptional()
  @Type(() => Number)
  latitude?: number;

  @IsOptional()
  @Type(() => Number)
  longitude?: number;

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

  // ─── Hotel-specific fields ───────────────────────────────────────────────

  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  star_rating?: number;

  @IsEnum(HotelType)
  @IsOptional()
  hotel_type?: HotelType;

  @IsOptional()
  @Type(() => Number)
  price_from_azn?: number;

  @IsOptional()
  @Type(() => Number)
  price_to_azn?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  available_board_types?: string[];

  @IsInt()
  @IsOptional()
  total_rooms?: number;

  @IsInt()
  @IsOptional()
  total_floors?: number;

  @IsString()
  @IsOptional()
  check_in_time?: string;

  @IsString()
  @IsOptional()
  check_out_time?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  free_cancellation_days?: number;

  @IsBoolean()
  @IsOptional()
  has_wifi?: boolean;

  @IsBoolean()
  @IsOptional()
  has_parking?: boolean;

  @IsBoolean()
  @IsOptional()
  has_pool?: boolean;

  @IsBoolean()
  @IsOptional()
  has_spa?: boolean;

  @IsBoolean()
  @IsOptional()
  has_gym?: boolean;

  @IsBoolean()
  @IsOptional()
  has_restaurant?: boolean;

  @IsBoolean()
  @IsOptional()
  has_room_service?: boolean;

  @IsBoolean()
  @IsOptional()
  has_airport_transfer?: boolean;

  @IsBoolean()
  @IsOptional()
  has_butler_service?: boolean;

  @IsBoolean()
  @IsOptional()
  has_concierge?: boolean;

  @IsBoolean()
  @IsOptional()
  pets_allowed?: boolean;

  @IsBoolean()
  @IsOptional()
  accepts_cards?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  views?: string[];
}
