import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Place, PlaceStatus, PlaceType } from '../places/entities/place.entity';
import { Restaurant } from './entities/restaurant.entity';
import { PlaceImage } from '../places/entities/place-image.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,

    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    private readonly dataSource: DataSource,
  ) { }

  // ─── Create ───────────────────────────────────────────────────────────────

  async create(dto: CreateRestaurantDto): Promise<Restaurant> {
    const language = dto.language ?? 'az';
    const existing = await this.placeRepo.findOne({ where: { slug: dto.slug, language } });
    if (existing) {
      throw new ConflictException(`Bu dildə (${language}) "${dto.slug}" slug artıq istifadəlidir.`);
    }

    return this.dataSource.transaction(async (manager) => {
      const placeData: Partial<Place> = {
        title: dto.title,
        slug: dto.slug,
        language: dto.language ?? 'az',
        short_description: dto.short_description,
        detailed_description: dto.detailed_description ?? null,
        type: PlaceType.RESTAURANT,
        status: PlaceStatus.PENDING,
        whatsapp_number: dto.whatsapp_number,
        whatsapp_message_template: dto.whatsapp_message_template ?? null,
        phone_number: dto.phone_number ?? null,
        email: dto.email ?? null,
        address: dto.address ?? '',
        city: dto.city ?? null,
        latitude: dto.latitude ?? null,
        longitude: dto.longitude ?? null,
        thumbnail: dto.thumbnail ?? null,
        working_hours: dto.working_hours ?? null,
        features: dto.features ?? null,
        meta_title: dto.meta_title ?? null,
        meta_description: dto.meta_description ?? null,
        is_featured: dto.is_featured ?? false,
      };
      const savedPlace = await manager.save(Place, Object.assign(new Place(), placeData));

      // 2. Build & save the Restaurant-specific record
      const restaurantData: Partial<Restaurant> = {
        place_id: savedPlace.id,
        cuisine_type: dto.cuisine_type,
        specialties: dto.specialties ?? null,
        dining_style: dto.dining_style,
        price_range: dto.price_range,
        avg_bill_per_person_azn: dto.avg_bill_per_person_azn ?? null,
        seating_capacity: dto.seating_capacity ?? null,
        menu_pdf_url: dto.menu_pdf_url ?? null,
        menu_images: dto.menu_images ?? null,
        has_wifi: dto.has_wifi ?? false,
        has_parking: dto.has_parking ?? false,
        has_outdoor_seating: dto.has_outdoor_seating ?? false,
        has_live_music: dto.has_live_music ?? false,
        is_halal_certified: dto.is_halal_certified ?? false,
        is_vegetarian_friendly: dto.is_vegetarian_friendly ?? false,
        has_private_rooms: dto.has_private_rooms ?? false,
        accepts_cards: dto.accepts_cards ?? false,
      };
      return manager.save(Restaurant, Object.assign(new Restaurant(), restaurantData));
    });
  }

  // ─── Read ─────────────────────────────────────────────────────────────────

  async findAll(language?: string): Promise<Restaurant[]> {
    return this.restaurantRepo.find({
      where: language ? { place: { language } } : undefined,
      relations: ['place', 'place.images', 'place.reviews'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantRepo.findOne({
      where: { id },
      relations: ['place', 'place.images', 'place.reviews'],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found.`);
    }
    return restaurant;
  }

  async findBySlug(slug: string): Promise<Restaurant> {
    const place = await this.placeRepo.findOne({
      where: { slug, type: PlaceType.RESTAURANT },
    });
    if (!place) {
      throw new NotFoundException(`Restaurant with slug "${slug}" not found.`);
    }
    const restaurant = await this.restaurantRepo.findOne({
      where: { place_id: place.id },
      relations: ['place', 'place.images', 'place.reviews'],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant data for slug "${slug}" not found.`);
    }
    return restaurant;
  }

  // ─── Update ───────────────────────────────────────────────────────────────

  async update(id: string, dto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.findOne(id);

    return this.dataSource.transaction(async (manager) => {
      // Update base Place fields (only what's provided)
      const placeUpdate: Partial<Place> = {};
      if (dto.title !== undefined) placeUpdate.title = dto.title;
      if (dto.short_description !== undefined) placeUpdate.short_description = dto.short_description;
      if (dto.detailed_description !== undefined) placeUpdate.detailed_description = dto.detailed_description;
      if (dto.whatsapp_number !== undefined) placeUpdate.whatsapp_number = dto.whatsapp_number;
      if (dto.whatsapp_message_template !== undefined) placeUpdate.whatsapp_message_template = dto.whatsapp_message_template;
      if (dto.phone_number !== undefined) placeUpdate.phone_number = dto.phone_number;
      if (dto.email !== undefined) placeUpdate.email = dto.email;
      if (dto.address !== undefined) placeUpdate.address = dto.address;
      if (dto.city !== undefined) placeUpdate.city = dto.city;
      if (dto.latitude !== undefined) placeUpdate.latitude = dto.latitude;
      if (dto.longitude !== undefined) placeUpdate.longitude = dto.longitude;
      if (dto.thumbnail !== undefined) placeUpdate.thumbnail = dto.thumbnail;
      if (dto.working_hours !== undefined) placeUpdate.working_hours = dto.working_hours;
      if (dto.features !== undefined) placeUpdate.features = dto.features;
      if (dto.meta_title !== undefined) placeUpdate.meta_title = dto.meta_title;
      if (dto.meta_description !== undefined) placeUpdate.meta_description = dto.meta_description;
      if (dto.is_featured !== undefined) placeUpdate.is_featured = dto.is_featured;

      if (Object.keys(placeUpdate).length > 0) {
        await manager.update(Place, restaurant.place_id, placeUpdate);
      }

      // Update restaurant-specific fields
      const restaurantUpdate: Partial<Restaurant> = {};
      if (dto.cuisine_type !== undefined) restaurantUpdate.cuisine_type = dto.cuisine_type;
      if (dto.specialties !== undefined) restaurantUpdate.specialties = dto.specialties;
      if (dto.dining_style !== undefined) restaurantUpdate.dining_style = dto.dining_style;
      if (dto.price_range !== undefined) restaurantUpdate.price_range = dto.price_range;
      if (dto.avg_bill_per_person_azn !== undefined) restaurantUpdate.avg_bill_per_person_azn = dto.avg_bill_per_person_azn;
      if (dto.seating_capacity !== undefined) restaurantUpdate.seating_capacity = dto.seating_capacity;
      if (dto.menu_pdf_url !== undefined) restaurantUpdate.menu_pdf_url = dto.menu_pdf_url;
      if (dto.menu_images !== undefined) restaurantUpdate.menu_images = dto.menu_images;
      if (dto.has_wifi !== undefined) restaurantUpdate.has_wifi = dto.has_wifi;
      if (dto.has_parking !== undefined) restaurantUpdate.has_parking = dto.has_parking;
      if (dto.has_outdoor_seating !== undefined) restaurantUpdate.has_outdoor_seating = dto.has_outdoor_seating;
      if (dto.has_live_music !== undefined) restaurantUpdate.has_live_music = dto.has_live_music;
      if (dto.is_halal_certified !== undefined) restaurantUpdate.is_halal_certified = dto.is_halal_certified;
      if (dto.is_vegetarian_friendly !== undefined) restaurantUpdate.is_vegetarian_friendly = dto.is_vegetarian_friendly;
      if (dto.has_private_rooms !== undefined) restaurantUpdate.has_private_rooms = dto.has_private_rooms;
      if (dto.accepts_cards !== undefined) restaurantUpdate.accepts_cards = dto.accepts_cards;

      if (Object.keys(restaurantUpdate).length > 0) {
        await manager.update(Restaurant, restaurant.id, restaurantUpdate);
      }

      return this.findOne(id);
    });
  }

  // ─── Delete ───────────────────────────────────────────────────────────────

  async remove(id: string): Promise<void> {
    const restaurant = await this.findOne(id);
    await this.placeRepo.remove(restaurant.place);
  }

  async uploadImages(id: string, files: Express.Multer.File[]): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    const placeImageRepo = this.dataSource.getRepository(PlaceImage);
    const existingCount = await placeImageRepo.count({ where: { place_id: restaurant.place_id } });

    if (files && files.length > 0) {
      const placeImages = files.map((file, index) => {
        const pImage = new PlaceImage();
        pImage.place_id = restaurant.place_id;
        pImage.url = `/uploads/${file.filename}`;
        pImage.sort_order = existingCount + index;
        return pImage;
      });
      await placeImageRepo.save(placeImages);
    }
    return this.findOne(id);
  }
}
