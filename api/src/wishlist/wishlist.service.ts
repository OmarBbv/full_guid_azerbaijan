import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { PlacesService } from '../places/places.service';
import { BlogService } from '../blog/blog.service';
import { CityService } from '../city/city.service';
import { VenueService } from '../venue/venue.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly placesService: PlacesService,
    private readonly blogService: BlogService,
    private readonly cityService: CityService,
    private readonly venueService: VenueService,
  ) {}

  async create(userId: string, createWishlistDto: CreateWishlistDto) {
    const existing = await this.wishlistRepository.findOne({
      where: { 
        userId, 
        targetId: createWishlistDto.targetId, 
        targetType: createWishlistDto.targetType 
      },
    });

    if (existing) {
      throw new ConflictException('Item already in wishlist');
    }

    const wishlistEntry = this.wishlistRepository.create({
      userId,
      targetId: createWishlistDto.targetId,
      targetType: createWishlistDto.targetType,
    });

    return await this.wishlistRepository.save(wishlistEntry);
  }

  async findAll(userId: string) {
    const wishlistEntries = await this.wishlistRepository.find({
      where: { userId },
    });

    const results = await Promise.all(
      wishlistEntries.map(async (entry) => {
        let itemData: any = null;
        try {
          if (entry.targetType === 'PLACE') {
            itemData = await this.placesService.findOne(entry.targetId);
          } else if (entry.targetType === 'BLOG') {
            itemData = await this.blogService.findOneById(entry.targetId);
          } else if (entry.targetType === 'CITY') {
            itemData = await this.cityService.findOne(entry.targetId);
          } else if (entry.targetType === 'VENUE') {
            itemData = await this.venueService.findOne(parseInt(entry.targetId));
          }
        } catch (e) {
          // Item might have been deleted
        }

        return {
          ...entry,
          item: itemData,
        };
      }),
    );

    return results.filter(r => r.item !== null);
  }

  async remove(userId: string, targetId: string, targetType: string) {
    const entry = await this.wishlistRepository.findOne({
      where: { userId, targetId, targetType },
    });

    if (!entry) {
      throw new NotFoundException('Wishlist entry not found');
    }

    return await this.wishlistRepository.remove(entry);
  }

  async getStatus(userId: string, targetId: string, targetType: string) {
    const entry = await this.wishlistRepository.findOne({
      where: { userId, targetId, targetType },
    });
    return { isFavorite: !!entry };
  }
}
