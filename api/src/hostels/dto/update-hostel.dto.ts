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
import { HostelType, DormGender } from '../entities/hostel.entity';

export class UpdateHostelDto {
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

  // ─── Hostel-specific fields ──────────────────────────────────────────────

  @IsEnum(HostelType)
  @IsOptional()
  hostel_type?: HostelType;

  @IsInt()
  @Min(0)
  @IsOptional()
  dorm_beds_count?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  private_rooms_count?: number;

  @IsInt()
  @Min(2)
  @IsOptional()
  max_dorm_size?: number;

  @IsEnum(DormGender)
  @IsOptional()
  available_dorm_gender?: DormGender;

  @IsOptional()
  @Type(() => Number)
  dorm_price_from_eur?: number;

  @IsOptional()
  @Type(() => Number)
  private_price_from_eur?: number;

  @IsString()
  @IsOptional()
  check_in_time?: string;

  @IsString()
  @IsOptional()
  check_out_time?: string;

  @IsBoolean()
  @IsOptional()
  has_wifi?: boolean;

  @IsBoolean()
  @IsOptional()
  has_kitchen?: boolean;

  @IsBoolean()
  @IsOptional()
  has_common_room?: boolean;

  @IsBoolean()
  @IsOptional()
  has_lockers?: boolean;

  @IsBoolean()
  @IsOptional()
  has_free_breakfast?: boolean;

  @IsBoolean()
  @IsOptional()
  has_bar?: boolean;

  @IsBoolean()
  @IsOptional()
  has_laundry?: boolean;

  @IsBoolean()
  @IsOptional()
  has_luggage_storage?: boolean;

  @IsBoolean()
  @IsOptional()
  has_24h_reception?: boolean;

  @IsBoolean()
  @IsOptional()
  organizes_tours?: boolean;

  @IsBoolean()
  @IsOptional()
  has_24h_security?: boolean;

  @IsBoolean()
  @IsOptional()
  has_cctv?: boolean;

  @IsBoolean()
  @IsOptional()
  has_keycard_access?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  social_events?: string[];

  @IsString()
  @IsOptional()
  hostel_vibe?: string;
}
