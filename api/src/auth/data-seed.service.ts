import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { Venue, VenueStatus } from '../venue/entities/venue.entity';

@Injectable()
export class DataSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(DataSeedService.name);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Venue)
    private readonly venueRepo: Repository<Venue>,
  ) {}

  async onApplicationBootstrap() {
    /*
    const categoriesData = [
      {
        name: 'Restoranlar',
        slug: 'restoranlar-test',
        icon: '🍴',
        subcategories: [
          { name: 'Milli Mətbəx', slug: 'milli-metbex-test', icon: '🍲' },
          { name: 'Fast Food', slug: 'fast-food-test', icon: '🍔' },
        ],
      },
      {
        name: 'Görməli Yerlər',
        slug: 'landmarks-test',
        icon: '🏛️',
        subcategories: [
          { name: 'Tarixi Abidələr', slug: 'history-test', icon: '🗿' },
          { name: 'Muzeylər', slug: 'museums-test', icon: '🖼️' },
        ],
      },
    ];

    for (const catData of categoriesData) {
      let parent = await this.categoryRepo.findOne({ where: { slug: catData.slug } });
      if (!parent) {
        parent = this.categoryRepo.create({
          name: catData.name,
          slug: catData.slug,
          icon: catData.icon,
          language: 'az',
          depth: 0,
        });
        parent = await this.categoryRepo.save(parent);
        this.logger.log(`Ana kateqoriya yaradıldı: ${parent.name}`);
      }

      for (const subData of catData.subcategories) {
        let sub = await this.categoryRepo.findOne({ where: { slug: subData.slug } });
        if (!sub) {
          sub = this.categoryRepo.create({
            name: subData.name,
            slug: subData.slug,
            icon: subData.icon,
            language: 'az',
            parentId: parent.id,
            depth: 1,
          });
          sub = await this.categoryRepo.save(sub);
          this.logger.log(`Alt kateqoriya yaradıldı: ${sub.name}`);
        }

        // Create 2 test venues for each subcategory (Always run this check)
        for (let i = 1; i <= 2; i++) {
          const venueSlug = `${sub.slug}-venue-${i}`;
          let venue = await this.venueRepo.findOne({ where: { slug: venueSlug } });
          
          const venueData = {
            name: `${sub.name} Məkanı ${i}`,
            slug: venueSlug,
            description: `${sub.name} haqqında ətraflı məlumat burada olacaq. Azərbaycanın ən seçkin məkanlarından biri olan bu yer qonaqlarına unudulmaz təcrübə vəd edir. Geniş menyu və peşəkar xidmət ilə sizi gözləyirik.`,
            address: `Bakı şəhəri, Nizami küçəsi ${144 + i}`,
            city: 'Bakı',
            googleMapsUrl: 'https://goo.gl/maps/example',
            phone: `+994 50 123 45 6${i}`,
            whatsapp: `+994 50 123 45 6${i}`,
            website: 'https://example.com',
            thumbnail: `https://images.unsplash.com/photo-${1517248135467 + i}-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000`,
            workingHours: {
              monday: { open: '09:00', close: '22:00', closed: false },
              tuesday: { open: '09:00', close: '22:00', closed: false },
              wednesday: { open: '09:00', close: '22:00', closed: false },
              thursday: { open: '09:00', close: '22:00', closed: false },
              friday: { open: '09:00', close: '23:00', closed: false },
              saturday: { open: '10:00', close: '23:00', closed: false },
              sunday: { open: '10:00', close: '21:00', closed: false },
            },
            status: VenueStatus.ACTIVE,
            language: 'az',
            categoryId: parent.id,
            subCategoryId: sub.id,
            rating: 4.0 + (i * 0.2),
            reviewCount: 10 + (i * 15),
          };

          if (!venue) {
            venue = this.venueRepo.create(venueData);
            await this.venueRepo.save(venue);
            this.logger.log(`Test məkanı yaradıldı: ${venue.name}`);
          } else {
            // Update existing venue with new data to ensure all fields are filled
            Object.assign(venue, venueData);
            await this.venueRepo.save(venue);
          }
        }
      }
    }
    */
  }
}
