import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Place, PlaceStatus } from '../places/entities/place.entity';
import { Venue, VenueStatus } from '../venue/entities/venue.entity';

export interface SearchResultItem {
  id: string;
  kind: 'place' | 'venue';
  type: string;       // RESTAURANT | HOTEL | HOSTEL | venue-category-slug ...
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
  ) {}

  async search(params: {
    q?: string;
    city?: string;
    type?: string;   // restaurant | hotel | hostel | venue
    language?: string;
    limit?: number;
  }): Promise<{ results: SearchResultItem[]; total: number }> {
    const { q, city, type, language, limit = 30 } = params;

    const results: SearchResultItem[] = [];

    const searchPlaces = !type || ['restaurant', 'hotel', 'hostel', 'landmark', 'nature', 'entertainment', 'museum', 'other'].includes(type.toLowerCase());
    const searchVenues = !type || type.toLowerCase() === 'venue';

    // ── Places (restaurants, hotels, hostels, landmarks…) ──
    if (searchPlaces) {
      const where: any[] = [];

      // Build OR conditions: name matches OR city matches
      const terms = q ? [
        { title: ILike(`%${q}%`), status: PlaceStatus.ACTIVE, ...(language ? { language } : {}) },
        { short_description: ILike(`%${q}%`), status: PlaceStatus.ACTIVE, ...(language ? { language } : {}) },
        { city: ILike(`%${q}%`), status: PlaceStatus.ACTIVE, ...(language ? { language } : {}) },
      ] : [
        { status: PlaceStatus.ACTIVE, ...(language ? { language } : {}) }
      ];

      for (const cond of terms) {
        if (city) (cond as any).city = ILike(`%${city}%`);
        if (type && type.toLowerCase() !== 'venue') (cond as any).type = type.toUpperCase();
        where.push(cond);
      }

      const places = await this.placeRepo.find({
        where,
        relations: ['images'],
        take: limit,
        order: { average_rating: 'DESC' },
      });

      for (const p of places) {
        results.push({
          id: p.id,
          kind: 'place',
          type: p.type.toLowerCase(),
          title: p.title,
          description: p.short_description,
          city: p.city,
          thumbnail: p.thumbnail || p.images?.[0]?.url || null,
          rating: Number(p.average_rating) || 0,
          slug: p.slug,
          language: p.language,
        });
      }
    }

    // ── Venues ──
    if (searchVenues) {
      const qb = this.venueRepo
        .createQueryBuilder('venue')
        .leftJoinAndSelect('venue.category', 'category')
        .leftJoinAndSelect('venue.images', 'images')
        .where('venue.status = :status', { status: VenueStatus.ACTIVE });

      if (q) {
        qb.andWhere(
          '(venue.name ILIKE :q OR venue.description ILIKE :q OR venue.city ILIKE :q)',
          { q: `%${q}%` },
        );
      }
      if (city) qb.andWhere('venue.city ILIKE :city', { city: `%${city}%` });
      if (language) qb.andWhere('venue.language = :language', { language });

      qb.orderBy('venue.rating', 'DESC').take(limit);

      const venues = await qb.getMany();

      for (const v of venues) {
        results.push({
          id: v.id.toString(),
          kind: 'venue',
          type: v.category?.slug || 'venue',
          title: v.name,
          description: v.description || '',
          city: v.city,
          thumbnail: v.thumbnail || v.images?.[0]?.url || null,
          rating: Number(v.rating) || 0,
          slug: v.slug,
          language: v.language,
        });
      }
    }

    // Sort combined results by rating desc
    results.sort((a, b) => b.rating - a.rating);

    return {
      results: results.slice(0, limit),
      total: results.length,
    };
  }
}
