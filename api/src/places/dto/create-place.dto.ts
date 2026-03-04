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
import { PlaceStatus } from '../entities/place.entity';

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

  @IsEnum(PlaceStatus)
  @IsOptional()
  status?: PlaceStatus;

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
}
