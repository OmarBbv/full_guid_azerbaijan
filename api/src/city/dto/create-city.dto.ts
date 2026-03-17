import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsInt,
  IsNumber,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCityDto {
  @IsString()
  @MaxLength(150)
  name: string;

  @IsString()
  @MaxLength(150)
  slug: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  language?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  image_url?: string | null;

  @IsString()
  @IsOptional()
  cover_image_url?: string | null;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  gallery_urls?: string[] | null;

  @IsString()
  @IsOptional()
  google_maps_url?: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  region?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  country_code?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  highlights?: string[];

  @IsArray()
  @IsOptional()
  attractions?: Array<{ name: string; type: string }>;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  meta_title?: string;

  @IsString()
  @IsOptional()
  meta_description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  sort_order?: number;
}
