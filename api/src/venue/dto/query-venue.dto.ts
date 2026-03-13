import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { VenueStatus } from '../entities/venue.entity';

export class QueryVenueDto {
  @IsOptional() @Type(() => Number) @IsNumber()
  page?: number = 1;

  @IsOptional() @Type(() => Number) @IsNumber()
  limit?: number = 20;

  @IsOptional() @Type(() => Number) @IsNumber()
  categoryId?: number;

  @IsOptional() @IsString()
  city?: string;

  @IsOptional() @IsString()
  search?: string;

  @IsOptional() @IsEnum(VenueStatus)
  status?: VenueStatus;

  @IsOptional() @IsString()
  language?: string;
}
