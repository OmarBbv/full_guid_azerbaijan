import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
  MaxLength,
} from 'class-validator';

export class CreateAboutPageDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  subtitle?: string;

  @IsString()
  @MaxLength(255)
  slug: string;


  @IsOptional()
  sections?: Array<{ title: string; content: string }>;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  image_url?: string;


  @IsString()
  @IsOptional()
  @MaxLength(10)
  language?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsInt()
  @IsOptional()
  sort_order?: number;
}
