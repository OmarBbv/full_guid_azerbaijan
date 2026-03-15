import { Injectable, NotFoundException } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { City } from '../city/entities/city.entity';

@Injectable()
export class RegionsService {
  constructor(private readonly cityService: CityService) { }

  async findAll(): Promise<City[]> {
    return this.cityService.findAll(undefined, true); // Active cities
  }

  async findBySlug(slug: string): Promise<City> {
    return this.cityService.findBySlug(slug);
  }
}
