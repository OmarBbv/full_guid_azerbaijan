import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}

  // ─── CREATE ───────────────────────────────────────────────────────────────

  async create(dto: CreateCityDto): Promise<City> {
    const language = dto.language ?? 'az';
    const existing = await this.cityRepo.findOne({
      where: { slug: dto.slug, language },
    });
    if (existing) {
      throw new ConflictException(
        `Bu dildə (${language}) "${dto.slug}" slug artıq istifadə olunur.`,
      );
    }

    const city = this.cityRepo.create({
      ...dto,
      language,
      is_active: dto.is_active ?? true,
      is_featured: dto.is_featured ?? false,
      sort_order: dto.sort_order ?? 0,
    });
    return this.cityRepo.save(city);
  }

  // ─── READ ALL ─────────────────────────────────────────────────────────────

  async findAll(language?: string, onlyActive = false, onlyFeatured = false): Promise<City[]> {
    const where: FindOptionsWhere<City> = {};
    if (language) where.language = language;
    if (onlyActive) where.is_active = true;
    if (onlyFeatured) where.is_featured = true;

    return this.cityRepo.find({
      where: Object.keys(where).length > 0 ? where : undefined,
      order: { sort_order: 'ASC', name: 'ASC' },
    });
  }

  // ─── READ ONE (by id) ─────────────────────────────────────────────────────

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepo.findOne({ where: { id } });
    if (!city) throw new NotFoundException(`City with ID "${id}" not found.`);
    return city;
  }

  // ─── READ ONE (by slug) ───────────────────────────────────────────────────

  async findBySlug(slug: string, language = 'az'): Promise<City> {
    const city = await this.cityRepo.findOne({ where: { slug, language } });
    if (!city) {
      // Dil qeyd edilməyibsə, default az yoxla
      const defaultCity = await this.cityRepo.findOne({ where: { slug, language: 'az' } });
      if (defaultCity) return defaultCity;
      throw new NotFoundException(`City with slug "${slug}" not found.`);
    }
    return city;
  }

  // ─── UPDATE ───────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);
    const newLanguage = dto.language ?? city.language;

    // slug dəyişirsə, konflikt yoxla
    if ((dto.slug && dto.slug !== city.slug) || newLanguage !== city.language) {
      const taken = await this.cityRepo.findOne({
        where: { slug: dto.slug ?? city.slug, language: newLanguage },
      });
      if (taken && taken.id !== id) {
        throw new ConflictException(
          `Bu dildə (${newLanguage}) "${dto.slug ?? city.slug}" slug artıq istifadə olunur.`,
        );
      }
    }

    Object.assign(city, dto);
    return this.cityRepo.save(city);
  }

  // ─── DELETE ───────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const city = await this.findOne(id);
    await this.cityRepo.remove(city);
  }

  // ─── UPLOAD IMAGES ────────────────────────────────────────────────────────

  async uploadImages(
    id: string,
    files: { image?: Express.Multer.File[]; cover_image?: Express.Multer.File[]; gallery?: Express.Multer.File[] },
  ): Promise<City> {
    const city = await this.findOne(id);

    let updated = false;

    if (files.image && files.image.length > 0) {
      city.image_url = `/uploads/${files.image[0].filename}`;
      updated = true;
    }

    if (files.cover_image && files.cover_image.length > 0) {
      city.cover_image_url = `/uploads/${files.cover_image[0].filename}`;
      updated = true;
    }

    if (files.gallery && files.gallery.length > 0) {
      const newGalleryUrls = files.gallery.map((f) => `/uploads/${f.filename}`);
      city.gallery_urls = [...(city.gallery_urls || []), ...newGalleryUrls];
      updated = true;
    }

    if (updated) {
      return this.cityRepo.save(city);
    }
    return city;
  }
}
