import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { AboutPage } from './entities/about-page.entity';
import { CreateAboutPageDto } from './dto/create-about-page.dto';
import { UpdateAboutPageDto } from './dto/update-about-page.dto';

@Injectable()
export class AboutPageService {
  constructor(
    @InjectRepository(AboutPage)
    private readonly aboutPageRepo: Repository<AboutPage>,
  ) {}

  async create(dto: CreateAboutPageDto): Promise<AboutPage> {
    const language = dto.language ?? 'az';
    const existing = await this.aboutPageRepo.findOne({
      where: { slug: dto.slug, language },
    });
    if (existing) {
      throw new ConflictException(
        `Bu dildə (${language}) "${dto.slug}" slug artıq istifadə olunur.`,
      );
    }

    const page = this.aboutPageRepo.create({
      ...dto,
      language,
    });
    return this.aboutPageRepo.save(page);
  }

  async findAll(language?: string, onlyActive = false): Promise<AboutPage[]> {
    const where: FindOptionsWhere<AboutPage> = {};
    if (language) where.language = language;
    if (onlyActive) where.is_active = true;

    return this.aboutPageRepo.find({
      where,
      order: { sort_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<AboutPage> {
    const page = await this.aboutPageRepo.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException('Səhifə tapılmadı');
    }
    return page;
  }

  async findBySlug(slug: string, language = 'az'): Promise<AboutPage> {
    const page = await this.aboutPageRepo.findOne({
      where: { slug, language, is_active: true },
    });
    if (!page) {
      throw new NotFoundException('Səhifə tapılmadı');
    }
    return page;
  }

  async update(id: string, dto: UpdateAboutPageDto): Promise<AboutPage> {
    const page = await this.findOne(id);
    Object.assign(page, dto);
    return this.aboutPageRepo.save(page);
  }

  async remove(id: string): Promise<void> {
    const page = await this.findOne(id);
    await this.aboutPageRepo.remove(page);
  }

  async uploadImage(id: string, file: Express.Multer.File): Promise<AboutPage> {
    const page = await this.findOne(id);
    page.image_url = `/uploads/${file.filename}`;
    return this.aboutPageRepo.save(page);
  }
}
