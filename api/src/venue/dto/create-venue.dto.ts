// dto/create-venue.dto.ts
import {
  IsString, IsNumber, IsOptional,
  IsObject, IsArray, IsEmail,
  MaxLength, ValidateNested,
  IsIn
} from 'class-validator';
import { Type } from 'class-transformer';

class WorkingHourDto {
  @IsString() open: string;
  @IsString() close: string;
  @IsOptional() closed?: boolean;
}

class WorkingHoursDto {
  @ValidateNested() @Type(() => WorkingHourDto) monday: WorkingHourDto;
  @ValidateNested() @Type(() => WorkingHourDto) tuesday: WorkingHourDto;
  @ValidateNested() @Type(() => WorkingHourDto) wednesday: WorkingHourDto;
  @ValidateNested() @Type(() => WorkingHourDto) thursday: WorkingHourDto;
  @ValidateNested() @Type(() => WorkingHourDto) friday: WorkingHourDto;
  @ValidateNested() @Type(() => WorkingHourDto) saturday: WorkingHourDto;
  @ValidateNested() @Type(() => WorkingHourDto) sunday: WorkingHourDto;
}

class VenueImageDto {
  @IsString() url: string;
  @IsOptional() @IsString() alt?: string;
  @IsOptional() @IsNumber() order?: number;
}

export class CreateVenueDto {
  @IsString() @MaxLength(200)
  name: string;

  @IsOptional()
  @IsString()
  @IsIn(['az', 'en', 'ru', 'tr', 'ar', 'hi'])
  language?: string;

  @IsOptional() @IsString()
  description?: string;

  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  subCategoryId?: number;

  @IsString() @MaxLength(500)
  address: string;

  @IsOptional() @IsString()
  city?: string;

  @IsOptional() @IsString() @MaxLength(500)
  googleMapsUrl?: string;

  @IsOptional() @IsString()
  phone?: string;

  @IsOptional() @IsString()
  whatsapp?: string;

  @IsOptional() @IsString()
  website?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => WorkingHoursDto)
  workingHours?: WorkingHoursDto;

  @IsOptional() @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VenueImageDto)
  images?: VenueImageDto[];
}