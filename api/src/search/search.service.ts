import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Place } from '../places/entities/place.entity';
import { Venue, VenueStatus } from '../venue/entities/venue.entity';

export interface SearchResultItem {
  id: string;
  kind: 'place' | 'venue';
  type: string;
  title: string;
  description: string;
  city: string | null;
  thumbnail: string | null;
  rating: number;
  slug: string;
  language: string;
}

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,

    @InjectRepository(Venue)
    private readonly venueRepo: Repository<Venue>,
  ) { }

  async search(params: {
    q?: string;
    city?: string;
    type?: string;
    language?: string;
    limit?: number;
  }): Promise<{ results: SearchResultItem[]; total: number }> {
    const { q, city, type, language, limit = 50 } = params;

    const results: SearchResultItem[] = [];

    const isVenueOnly = type?.toLowerCase() === 'venue';
    const searchPlaces = !isVenueOnly;
    const searchVenues = !type || isVenueOnly;

    if (searchPlaces) {
      const qb = this.placeRepo
        .createQueryBuilder('place')
        .leftJoinAndSelect('place.images', 'images');

      if (q) {
        qb.andWhere(
          '(place.title ILIKE :q OR place.short_description ILIKE :q OR place.city ILIKE :q OR place.address ILIKE :q)',
          { q: `%${q}%` },
        );
      }

      if (city) {
        qb.andWhere('place.city ILIKE :city', { city: `%${city}%` });
      }

      if (language) {
        qb.andWhere('place.language = :language', { language });
      }

      if (type && !isVenueOnly) {
        // Cast enum to TEXT before LOWER() — PostgreSQL can't call LOWER on enum directly
        qb.andWhere('LOWER(place.type::TEXT) = :type', { type: type.toLowerCase() });
      }

      qb.orderBy('place.average_rating', 'DESC').take(limit);

      const places = await qb.getMany();

      for (const p of places) {
        const thumbUrl = p.thumbnail || p.images?.[0]?.url || null;
        results.push({
          id: p.id,
          kind: 'place',
          type: p.type.toLowerCase(),
          title: p.title,
          description: p.short_description,
          city: p.city,
          thumbnail: thumbUrl,
          rating: Number(p.average_rating) || 0,
          slug: p.slug,
          language: p.language,
        });
      }
    }

    // ── Venues ──────────────────────────────────────────────────────────
    if (searchVenues) {
      const qb = this.venueRepo
        .createQueryBuilder('venue')
        .leftJoinAndSelect('venue.category', 'category')
        .leftJoinAndSelect('venue.images', 'images');

      if (q) {
        qb.andWhere(
          '(venue.name ILIKE :q OR venue.description ILIKE :q OR venue.city ILIKE :q OR venue.address ILIKE :q)',
          { q: `%${q}%` },
        );
      }

      if (city) {
        qb.andWhere('venue.city ILIKE :city', { city: `%${city}%` });
      }

      if (language) {
        qb.andWhere('venue.language = :language', { language });
      }

      qb.orderBy('venue.rating', 'DESC').take(limit);

      const venues = await qb.getMany();

      for (const v of venues) {
        const thumbUrl = v.thumbnail || v.images?.[0]?.url || null;
        results.push({
          id: v.id.toString(),
          kind: 'venue',
          type: v.category?.slug || 'venue',
          title: v.name,
          description: v.description || '',
          city: v.city,
          thumbnail: thumbUrl,
          rating: Number(v.rating) || 0,
          slug: v.slug,
          language: v.language,
        });
      }
    }

    // Sort by rating desc
    results.sort((a, b) => b.rating - a.rating);
    const sliced = results.slice(0, limit);

    return { results: sliced, total: sliced.length };
  }
}
