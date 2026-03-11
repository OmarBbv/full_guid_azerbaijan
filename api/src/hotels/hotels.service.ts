import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Place, PlaceStatus, PlaceType } from '../places/entities/place.entity';
import { Hotel } from './entities/hotel.entity';
import { PlaceImage } from '../places/entities/place-image.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,

    @InjectRepository(Hotel)
    private readonly hotelRepo: Repository<Hotel>,

    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateHotelDto): Promise<Hotel> {
    const language = dto.language ?? 'az';
    const existing = await this.placeRepo.findOne({
      where: { slug: dto.slug, language },
    });
    if (existing)
      throw new ConflictException(
        `Bu dildə (${language}) "${dto.slug}" slug artıq istifadəlidir.`,
      );

    return this.dataSource.transaction(async (manager) => {
      const placeData: Partial<Place> = {
        title: dto.title,
        slug: dto.slug,
        language: dto.language ?? 'az',
        short_description: dto.short_description,
        detailed_description: dto.detailed_description ?? null,
        type: PlaceType.HOTEL,
        status: PlaceStatus.PENDING,
        whatsapp_number: dto.whatsapp_number,
        phone_number: dto.phone_number ?? null,
        email: dto.email ?? null,
        website_url: dto.website_url ?? null,
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
      const savedPlace = await manager.save(
        Place,
        Object.assign(new Place(), placeData),
      );

      const hotelData: Partial<Hotel> = {
        place_id: savedPlace.id,
        star_rating: dto.star_rating ?? 3,
        hotel_type: dto.hotel_type,
        price_from_azn: dto.price_from_azn ?? null,
        price_to_azn: dto.price_to_azn ?? null,
        available_board_types: dto.available_board_types ?? null,
        total_rooms: dto.total_rooms ?? null,
        total_floors: dto.total_floors ?? null,
        check_in_time: dto.check_in_time ?? '14:00',
        check_out_time: dto.check_out_time ?? '12:00',
        free_cancellation_days: dto.free_cancellation_days ?? 0,
        has_wifi: dto.has_wifi ?? false,
        has_parking: dto.has_parking ?? false,
        has_pool: dto.has_pool ?? false,
        has_spa: dto.has_spa ?? false,
        has_gym: dto.has_gym ?? false,
        has_restaurant: dto.has_restaurant ?? false,
        has_room_service: dto.has_room_service ?? false,
        has_airport_transfer: dto.has_airport_transfer ?? false,
        has_butler_service: dto.has_butler_service ?? false,
        has_concierge: dto.has_concierge ?? false,
        pets_allowed: dto.pets_allowed ?? false,
        accepts_cards: dto.accepts_cards ?? false,
        views: dto.views ?? null,
      };
      return manager.save(Hotel, Object.assign(new Hotel(), hotelData));
    });
  }

  async findAll(language?: string): Promise<Hotel[]> {
    return this.hotelRepo.find({
      where: language ? { place: { language } } : undefined,
      relations: ['place', 'place.images', 'place.reviews'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Hotel> {
    const hotel = await this.hotelRepo.findOne({
      where: { id },
      relations: ['place', 'place.images', 'place.reviews'],
    });
    if (!hotel) throw new NotFoundException(`Hotel with ID "${id}" not found.`);
    return hotel;
  }

  async findBySlug(slug: string): Promise<Hotel> {
    const place = await this.placeRepo.findOne({
      where: { slug, type: PlaceType.HOTEL },
    });
    if (!place)
      throw new NotFoundException(`Hotel with slug "${slug}" not found.`);
    const hotel = await this.hotelRepo.findOne({
      where: { place_id: place.id },
      relations: ['place', 'place.images', 'place.reviews'],
    });
    if (!hotel)
      throw new NotFoundException(`Hotel data for slug "${slug}" not found.`);
    return hotel;
  }

  async update(id: string, dto: UpdateHotelDto): Promise<Hotel> {
    const hotel = await this.findOne(id);

    return this.dataSource.transaction(async (manager) => {
      const placeUpdate: Partial<Place> = {};
      if (dto.title !== undefined) placeUpdate.title = dto.title;
      if (dto.short_description !== undefined)
        placeUpdate.short_description = dto.short_description;
      if (dto.detailed_description !== undefined)
        placeUpdate.detailed_description = dto.detailed_description;
      if (dto.whatsapp_number !== undefined)
        placeUpdate.whatsapp_number = dto.whatsapp_number;
      if (dto.phone_number !== undefined)
        placeUpdate.phone_number = dto.phone_number;
      if (dto.email !== undefined) placeUpdate.email = dto.email;
      if (dto.website_url !== undefined)
        placeUpdate.website_url = dto.website_url;
      if (dto.address !== undefined) placeUpdate.address = dto.address;
      if (dto.city !== undefined) placeUpdate.city = dto.city;
      if (dto.latitude !== undefined) placeUpdate.latitude = dto.latitude;
      if (dto.longitude !== undefined) placeUpdate.longitude = dto.longitude;
      if (dto.thumbnail !== undefined) placeUpdate.thumbnail = dto.thumbnail;
      if (dto.working_hours !== undefined)
        placeUpdate.working_hours = dto.working_hours;
      if (dto.features !== undefined) placeUpdate.features = dto.features;
      if (dto.is_featured !== undefined)
        placeUpdate.is_featured = dto.is_featured;

      if (Object.keys(placeUpdate).length > 0) {
        await manager.update(Place, hotel.place_id, placeUpdate);
      }

      const hotelUpdate: Partial<Hotel> = {};
      if (dto.star_rating !== undefined)
        hotelUpdate.star_rating = dto.star_rating;
      if (dto.hotel_type !== undefined) hotelUpdate.hotel_type = dto.hotel_type;
      if (dto.price_from_azn !== undefined)
        hotelUpdate.price_from_azn = dto.price_from_azn;
      if (dto.price_to_azn !== undefined)
        hotelUpdate.price_to_azn = dto.price_to_azn;
      if (dto.available_board_types !== undefined)
        hotelUpdate.available_board_types = dto.available_board_types;
      if (dto.total_rooms !== undefined)
        hotelUpdate.total_rooms = dto.total_rooms;
      if (dto.total_floors !== undefined)
        hotelUpdate.total_floors = dto.total_floors;
      if (dto.check_in_time !== undefined)
        hotelUpdate.check_in_time = dto.check_in_time;
      if (dto.check_out_time !== undefined)
        hotelUpdate.check_out_time = dto.check_out_time;
      if (dto.free_cancellation_days !== undefined)
        hotelUpdate.free_cancellation_days = dto.free_cancellation_days;
      if (dto.has_wifi !== undefined) hotelUpdate.has_wifi = dto.has_wifi;
      if (dto.has_parking !== undefined)
        hotelUpdate.has_parking = dto.has_parking;
      if (dto.has_pool !== undefined) hotelUpdate.has_pool = dto.has_pool;
      if (dto.has_spa !== undefined) hotelUpdate.has_spa = dto.has_spa;
      if (dto.has_gym !== undefined) hotelUpdate.has_gym = dto.has_gym;
      if (dto.has_restaurant !== undefined)
        hotelUpdate.has_restaurant = dto.has_restaurant;
      if (dto.has_room_service !== undefined)
        hotelUpdate.has_room_service = dto.has_room_service;
      if (dto.has_airport_transfer !== undefined)
        hotelUpdate.has_airport_transfer = dto.has_airport_transfer;
      if (dto.has_butler_service !== undefined)
        hotelUpdate.has_butler_service = dto.has_butler_service;
      if (dto.has_concierge !== undefined)
        hotelUpdate.has_concierge = dto.has_concierge;
      if (dto.pets_allowed !== undefined)
        hotelUpdate.pets_allowed = dto.pets_allowed;
      if (dto.accepts_cards !== undefined)
        hotelUpdate.accepts_cards = dto.accepts_cards;
      if (dto.views !== undefined) hotelUpdate.views = dto.views;

      if (Object.keys(hotelUpdate).length > 0) {
        await manager.update(Hotel, hotel.id, hotelUpdate);
      }

      return this.findOne(id);
    });
  }

  async remove(id: string): Promise<void> {
    const hotel = await this.findOne(id);
    await this.placeRepo.remove(hotel.place);
  }

  async uploadImages(id: string, files: Express.Multer.File[]): Promise<Hotel> {
    const hotel = await this.findOne(id);
    const placeImageRepo = this.dataSource.getRepository(PlaceImage);
    const existingCount = await placeImageRepo.count({
      where: { place_id: hotel.place_id },
    });

    if (files && files.length > 0) {
      const placeImages = files.map((file, index) => {
        const pImage = new PlaceImage();
        pImage.place_id = hotel.place_id;
        pImage.url = `/uploads/${file.filename}`;
        pImage.sort_order = existingCount + index;
        return pImage;
      });
      await placeImageRepo.save(placeImages);
    }
    return this.findOne(id);
  }
}
