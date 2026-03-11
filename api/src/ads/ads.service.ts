import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdBanner, AdPosition } from './entities/ad-banner.entity';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdBanner)
    private readonly adRepository: Repository<AdBanner>,
  ) {}

  async create(createAdDto: CreateAdDto): Promise<AdBanner> {
    const ad = this.adRepository.create(createAdDto);
    return await this.adRepository.save(ad);
  }

  async findAll(activeOnly = false): Promise<AdBanner[]> {
    const query = this.adRepository.createQueryBuilder('ad');
    if (activeOnly) {
      query.where('ad.is_active = :isActive', { isActive: true });
    }
    return await query.getMany();
  }

  async findActiveByPosition(position: AdPosition): Promise<AdBanner[]> {
    return await this.adRepository.find({
      where: {
        position,
        is_active: true,
      },
    });
  }

  async findOne(id: string): Promise<AdBanner> {
    const ad = await this.adRepository.findOne({ where: { id } });
    if (!ad) {
      throw new NotFoundException(`Ad banner with ID ${id} not found`);
    }
    return ad;
  }

  async update(id: string, updateAdDto: UpdateAdDto): Promise<AdBanner> {
    const ad = await this.findOne(id);
    Object.assign(ad, updateAdDto);
    return await this.adRepository.save(ad);
  }

  async remove(id: string): Promise<void> {
    const ad = await this.findOne(id);
    await this.adRepository.remove(ad);
  }
}
