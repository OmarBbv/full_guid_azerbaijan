import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venue, VenueStatus } from './entities/venue.entity';
import { VenueImage } from 'src/venue-image/entities/venue-image.entity';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { QueryVenueDto } from './dto/query-venue.dto';

@Injectable()
export class VenueService {
  constructor(
    @InjectRepository(Venue)
    private venueRepo: Repository<Venue>,

    @InjectRepository(VenueImage)
    private imageRepo: Repository<VenueImage>,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      + '-' + Date.now();
  }

  // ──── YARAT ────
  async create(dto: CreateVenueDto): Promise<Venue> {
    const venue = this.venueRepo.create({
      ...dto,
      slug: this.generateSlug(dto.name),
      status: VenueStatus.ACTIVE,
    });

    const saved = await this.venueRepo.save(venue);

    if (dto.images?.length) {
      const images = dto.images.map((img, i) =>
        this.imageRepo.create({
          ...img,
          order: img.order ?? i,
          venueId: saved.id,
        })
      );
      await this.imageRepo.save(images);
    }

    return this.findOne(saved.id);
  }

  // ──── HAMISI ────
  async findAll(query: QueryVenueDto) {
    const { page = 1, limit = 20, categoryId, city, search, status, language } = query;

    const qb = this.venueRepo
      .createQueryBuilder('venue')
      .leftJoinAndSelect('venue.category', 'category')
      .leftJoinAndSelect('venue.subCategory', 'subCategory')
      .leftJoinAndSelect('venue.images', 'images');

    if (categoryId) {
      qb.andWhere('venue.categoryId = :categoryId', { categoryId });
    }
    if (query.subCategoryId) {
      qb.andWhere('venue.subCategoryId = :subCategoryId', { subCategoryId: query.subCategoryId });
    }
    if (city) {
      qb.andWhere('venue.city = :city', { city });
    }
    if (status) {
      qb.andWhere('venue.status = :status', { status });
    }
    if (search) {
      qb.andWhere(
        '(venue.name LIKE :search OR venue.address LIKE :search)',
        { search: `%${search}%` }
      );
    }
    if (language) {
      qb.andWhere('venue.language = :language', { language });
    }

    qb.orderBy('venue.createdAt', 'DESC');

    const skip = (page - 1) * limit;
    qb.skip(skip).take(limit);

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ──── BİR DƏNƏ (ID) ────
  async findOne(id: number): Promise<Venue> {
    const venue = await this.venueRepo.findOne({
      where: { id },
      relations: ['category', 'subCategory', 'images'],
    });
    if (!venue) throw new NotFoundException('Məkan tapılmadı');
    return venue;
  }

  // ──── BİR DƏNƏ (SLUG) ────
  async findBySlug(slug: string): Promise<Venue> {
    const venue = await this.venueRepo.findOne({
      where: { slug, status: VenueStatus.ACTIVE },
      relations: ['category', 'subCategory', 'images'],
    });
    if (!venue) throw new NotFoundException('Məkan tapılmadı');
    return venue;
  }

  // ──── YENİLƏ ────
  async update(id: number, dto: UpdateVenueDto): Promise<Venue> {
    const venue = await this.findOne(id);
    Object.assign(venue, dto);
    await this.venueRepo.save(venue);
    return this.findOne(id);
  }

  // ──── SİL ────
  async remove(id: number): Promise<void> {
    const venue = await this.findOne(id);
    await this.venueRepo.remove(venue);
  }

  // ──── STATUS ────
  async changeStatus(id: number, status: VenueStatus): Promise<Venue> {
    await this.venueRepo.update(id, { status });
    return this.findOne(id);
  }
}
