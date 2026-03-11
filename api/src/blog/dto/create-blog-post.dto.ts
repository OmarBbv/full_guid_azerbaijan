import {
  IsString,
  IsOptional,
  IsInt,
  IsBoolean,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateBlogPostDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  language?: string; // 'az' | 'en' | 'ru'

  @IsString()
  excerpt: string;

  @IsString()
  @IsOptional()
  content_html?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  category?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  category_label?: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  category_color?: string;

  @IsString()
  @IsOptional()
  cover_image_url?: string;

  @IsString()
  @IsOptional()
  @MaxLength(120)
  author_name?: string;

  @IsString()
  @IsOptional()
  author_avatar_url?: string;

  @IsInt()
  @IsOptional()
  read_time_minutes?: number;

  @IsDateString()
  @IsOptional()
  published_at?: string;

  @IsBoolean()
  @IsOptional()
  is_featured?: boolean;

  @IsBoolean()
  @IsOptional()
  is_pinned?: boolean;

  @IsBoolean()
  @IsOptional()
  is_published?: boolean;
}
