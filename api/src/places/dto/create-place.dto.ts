import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
  IsObject,
  IsUUID,
} from 'class-validator';
import { PlaceStatus, PlaceType } from '../entities/place.entity';

export class CreatePlaceDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  short_description: string;

  @IsString()
  @IsOptional()
  detailed_description?: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  accent_color?: string;

  @IsEnum(PlaceStatus)
  @IsOptional()
  status?: PlaceStatus;

  @IsEnum(PlaceType)
  @IsOptional()
  type?: PlaceType;

  @IsString()
  whatsapp_number: string;

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
  website_url?: string;

  @IsUUID()
  @IsOptional()
  city_id?: string;

  @IsUUID()
  @IsOptional()
  category_id?: string;

  @IsUUID()
  @IsOptional()
  subcategory_id?: string;

  @IsString()
  address: string;

  @IsNumber()
  @IsOptional()
  latitude?: number;

  @IsNumber()
  @IsOptional()
  longitude?: number;

  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsString()
  @IsOptional()
  video_url?: string;

  @IsObject()
  @IsOptional()
  working_hours?: Record<string, any>;

  @IsObject()
  @IsOptional()
  social_media?: Record<string, any>;

  @IsArray()
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

  @IsBoolean()
  @IsOptional()
  show_in_hero?: boolean;

  @IsString()
  @IsOptional()
  language?: string; // 'az' | 'en' | 'ru'  (default: 'az')
}
