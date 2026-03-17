import { Injectable, NotFoundException } from '@nestjs/common';
import { CityService } from '../city/city.service';
import { City } from '../city/entities/city.entity';

@Injectable()
export class RegionsService {
  constructor(private readonly cityService: CityService) { }

  async findAll(language?: string): Promise<City[]> {
    return this.cityService.findAll(language, true); // Active cities
  }

  async findBySlug(slug: string, language?: string): Promise<City> {
    return this.cityService.findBySlug(slug, language || 'az');
  }

  async findById(id: string, language?: string): Promise<City> {
    const city = await this.cityService.findOne(id);

    // If language is specified and differs from the found city's language,
    // try to find the same city (by slug) in the requested language
    if (language && city.language !== language) {
      try {
        return await this.cityService.findBySlug(city.slug, language);
      } catch {
        // No translation for this language, return the original
        return city;
      }
    }

    return city;
  }
}
