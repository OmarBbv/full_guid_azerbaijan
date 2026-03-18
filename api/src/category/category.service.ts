import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async create(dto: CreateCategoryDto) {
    const category = this.categoryRepo.create({
      ...dto,
      slug: dto.slug || this.generateSlug(dto.name),
    });
    return this.categoryRepo.save(category);
  }

  async findAll(language?: string) {
    const where: any = {};
    if (language) where.language = language;
    return this.categoryRepo.find({
      where,
      order: { id: 'DESC' }
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Kateqoriya tapılmadı');
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    await this.findOne(id);
    const updateData: any = { ...dto };
    if (!dto.slug && dto.name) {
      updateData.slug = this.generateSlug(dto.name);
    }
    await this.categoryRepo.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
  }
}
