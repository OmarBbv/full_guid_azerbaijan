import {
  IsString,
  IsEnum,
  IsUrl,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { AdPosition } from '../entities/ad-banner.entity';

export class CreateAdDto {
  @IsString()
  title: string;

  @IsEnum(AdPosition)
  position: AdPosition;

  @IsString()
  image_url: string;

  @IsUrl()
  @IsOptional()
  redirect_url?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
