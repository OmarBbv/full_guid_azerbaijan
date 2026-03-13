import { IsString, MaxLength, IsOptional, IsIn } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  icon?: string;

  @IsOptional()
  @IsString()
  @IsIn(['az', 'en', 'ru', 'tr', 'ar', 'hi'])
  language?: string;
}
