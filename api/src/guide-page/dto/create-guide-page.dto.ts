import { IsString, IsOptional, IsBoolean, IsInt, IsArray, MaxLength } from 'class-validator';

export class CreateGuidePageDto {
  @IsString()
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @MaxLength(255)
  slug: string;

  @IsOptional()
  @IsArray()
  sections?: Array<{ title: string; content: string }>;

  @IsString()
  @IsOptional()
  language?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsInt()
  @IsOptional()
  sort_order?: number;

  @IsString()
  @IsOptional()
  image_url?: string;
}

export class UpdateGuidePageDto extends CreateGuidePageDto {}
