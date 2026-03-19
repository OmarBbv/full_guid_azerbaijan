import { IsString, MaxLength, IsOptional, IsIn, IsNumber } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(100)
  slug: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  icon?: string;

  @IsOptional()
  @IsString()
  @IsIn(['az', 'en', 'ru', 'tr', 'ar', 'hi'])
  language?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  @IsNumber()
  depth?: number;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
