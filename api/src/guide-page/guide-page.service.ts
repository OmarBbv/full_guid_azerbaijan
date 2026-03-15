import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { GuidePage } from './entities/guide-page.entity';
import { CreateGuidePageDto, UpdateGuidePageDto } from './dto/create-guide-page.dto';

@Injectable()
export class GuidePageService {
  constructor(
    @InjectRepository(GuidePage)
    private readonly guidePageRepo: Repository<GuidePage>,
  ) {}

  async create(dto: CreateGuidePageDto): Promise<GuidePage> {
    const language = dto.language ?? 'az';
    const existing = await this.guidePageRepo.findOne({
      where: { slug: dto.slug, language },
    });
    if (existing) {
      throw new ConflictException(
        `Bu dildə (${language}) "${dto.slug}" slug artıq istifadə olunur.`,
      );
    }

    const page = this.guidePageRepo.create({
      ...dto,
      language,
    });
    return this.guidePageRepo.save(page);
  }

  async findAll(language?: string, onlyActive = false): Promise<GuidePage[]> {
    const where: FindOptionsWhere<GuidePage> = {};
    if (language) where.language = language;
    if (onlyActive) where.is_active = true;

    return this.guidePageRepo.find({
      where,
      order: { sort_order: 'ASC', created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<GuidePage> {
    const page = await this.guidePageRepo.findOne({ where: { id } });
    if (!page) {
      throw new NotFoundException('Səhifə tapılmadı');
    }
    return page;
  }

  async findBySlug(slug: string, language = 'az'): Promise<GuidePage> {
    const page = await this.guidePageRepo.findOne({
      where: { slug, language, is_active: true },
    });
    if (!page) {
      throw new NotFoundException('Səhifə tapılmadı');
    }
    return page;
  }

  async update(id: string, dto: UpdateGuidePageDto): Promise<GuidePage> {
    const page = await this.findOne(id);
    Object.assign(page, dto);
    return this.guidePageRepo.save(page);
  }

  async remove(id: string): Promise<void> {
    const page = await this.findOne(id);
    await this.guidePageRepo.remove(page);
  }

  async uploadImage(id: string, fileName: string): Promise<GuidePage> {
    const page = await this.findOne(id);
    page.image_url = `/uploads/${fileName}`;
    return this.guidePageRepo.save(page);
  }
}
