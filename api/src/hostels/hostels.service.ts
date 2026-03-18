import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Place, PlaceStatus, PlaceType } from '../places/entities/place.entity';
import { Hostel } from './entities/hostel.entity';
import { PlaceImage } from '../places/entities/place-image.entity';
import { CreateHostelDto } from './dto/create-hostel.dto';
import { UpdateHostelDto } from './dto/update-hostel.dto';

@Injectable()
export class HostelsService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepo: Repository<Place>,

    @InjectRepository(Hostel)
    private readonly hostelRepo: Repository<Hostel>,

    private readonly dataSource: DataSource,
  ) {}

  async create(dto: CreateHostelDto): Promise<Hostel> {
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
        type: PlaceType.HOSTEL,
        status: PlaceStatus.ACTIVE,
        whatsapp_number: dto.whatsapp_number,
        phone_number: dto.phone_number ?? null,
        email: dto.email ?? null,
        address: dto.address ?? '',
        city: dto.city ?? null,
        google_maps_url: dto.google_maps_url ?? null,
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

      const hostelData: Partial<Hostel> = {
        place_id: savedPlace.id,
        hostel_type: dto.hostel_type,
        dorm_beds_count: dto.dorm_beds_count ?? null,
        private_rooms_count: dto.private_rooms_count ?? null,
        max_dorm_size: dto.max_dorm_size ?? null,
        available_dorm_gender: dto.available_dorm_gender ?? null,
        dorm_price_from_eur: dto.dorm_price_from_eur ?? null,
        private_price_from_eur: dto.private_price_from_eur ?? null,
        check_in_time: dto.check_in_time ?? '14:00',
        check_out_time: dto.check_out_time ?? '12:00',
        has_wifi: dto.has_wifi ?? false,
        has_kitchen: dto.has_kitchen ?? false,
        has_common_room: dto.has_common_room ?? false,
        has_lockers: dto.has_lockers ?? false,
        has_free_breakfast: dto.has_free_breakfast ?? false,
        has_bar: dto.has_bar ?? false,
        has_laundry: dto.has_laundry ?? false,
        has_luggage_storage: dto.has_luggage_storage ?? false,
        has_24h_reception: dto.has_24h_reception ?? false,
        organizes_tours: dto.organizes_tours ?? false,
        has_24h_security: dto.has_24h_security ?? false,
        has_cctv: dto.has_cctv ?? false,
        has_keycard_access: dto.has_keycard_access ?? false,
        social_events: dto.social_events ?? null,
        hostel_vibe: dto.hostel_vibe ?? null,
      };
      return manager.save(Hostel, Object.assign(new Hostel(), hostelData));
    });
  }

  async findAll(language?: string): Promise<Hostel[]> {
    return this.hostelRepo.find({
      where: language ? { place: { language } } : undefined,
      relations: ['place', 'place.images', 'place.reviews'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Hostel> {
    const hostel = await this.hostelRepo.findOne({
      where: [{ id }, { place_id: id }],
      relations: ['place', 'place.images', 'place.reviews'],
    });
    if (!hostel)
      throw new NotFoundException(`Hostel with ID or PlaceID "${id}" not found.`);
    return hostel;
  }

  async findBySlug(slug: string): Promise<Hostel> {
    const place = await this.placeRepo.findOne({
      where: { slug, type: PlaceType.HOSTEL },
    });
    if (!place)
      throw new NotFoundException(`Hostel with slug "${slug}" not found.`);
    const hostel = await this.hostelRepo.findOne({
      where: { place_id: place.id },
      relations: ['place', 'place.images', 'place.reviews'],
    });
    if (!hostel)
      throw new NotFoundException(`Hostel data for slug "${slug}" not found.`);
    return hostel;
  }

  async update(id: string, dto: UpdateHostelDto): Promise<Hostel> {
    const hostel = await this.findOne(id);

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
      if (dto.address !== undefined) placeUpdate.address = dto.address;
      if (dto.city !== undefined) placeUpdate.city = dto.city;
      if (dto.google_maps_url !== undefined)
        placeUpdate.google_maps_url = dto.google_maps_url;
      if (dto.thumbnail !== undefined) placeUpdate.thumbnail = dto.thumbnail;
      if (dto.working_hours !== undefined)
        placeUpdate.working_hours = dto.working_hours;
      if (dto.features !== undefined) placeUpdate.features = dto.features;
      if (dto.is_featured !== undefined)
        placeUpdate.is_featured = dto.is_featured;

      if (Object.keys(placeUpdate).length > 0) {
        await manager.update(Place, hostel.place_id, placeUpdate);
      }

      const hostelUpdate: Partial<Hostel> = {};
      if (dto.hostel_type !== undefined)
        hostelUpdate.hostel_type = dto.hostel_type;
      if (dto.dorm_beds_count !== undefined)
        hostelUpdate.dorm_beds_count = dto.dorm_beds_count;
      if (dto.private_rooms_count !== undefined)
        hostelUpdate.private_rooms_count = dto.private_rooms_count;
      if (dto.max_dorm_size !== undefined)
        hostelUpdate.max_dorm_size = dto.max_dorm_size;
      if (dto.available_dorm_gender !== undefined)
        hostelUpdate.available_dorm_gender = dto.available_dorm_gender;
      if (dto.dorm_price_from_eur !== undefined)
        hostelUpdate.dorm_price_from_eur = dto.dorm_price_from_eur;
      if (dto.private_price_from_eur !== undefined)
        hostelUpdate.private_price_from_eur = dto.private_price_from_eur;
      if (dto.check_in_time !== undefined)
        hostelUpdate.check_in_time = dto.check_in_time;
      if (dto.check_out_time !== undefined)
        hostelUpdate.check_out_time = dto.check_out_time;
      if (dto.has_wifi !== undefined) hostelUpdate.has_wifi = dto.has_wifi;
      if (dto.has_kitchen !== undefined)
        hostelUpdate.has_kitchen = dto.has_kitchen;
      if (dto.has_common_room !== undefined)
        hostelUpdate.has_common_room = dto.has_common_room;
      if (dto.has_lockers !== undefined)
        hostelUpdate.has_lockers = dto.has_lockers;
      if (dto.has_free_breakfast !== undefined)
        hostelUpdate.has_free_breakfast = dto.has_free_breakfast;
      if (dto.has_bar !== undefined) hostelUpdate.has_bar = dto.has_bar;
      if (dto.has_laundry !== undefined)
        hostelUpdate.has_laundry = dto.has_laundry;
      if (dto.has_luggage_storage !== undefined)
        hostelUpdate.has_luggage_storage = dto.has_luggage_storage;
      if (dto.has_24h_reception !== undefined)
        hostelUpdate.has_24h_reception = dto.has_24h_reception;
      if (dto.organizes_tours !== undefined)
        hostelUpdate.organizes_tours = dto.organizes_tours;
      if (dto.has_24h_security !== undefined)
        hostelUpdate.has_24h_security = dto.has_24h_security;
      if (dto.has_cctv !== undefined) hostelUpdate.has_cctv = dto.has_cctv;
      if (dto.has_keycard_access !== undefined)
        hostelUpdate.has_keycard_access = dto.has_keycard_access;
      if (dto.social_events !== undefined)
        hostelUpdate.social_events = dto.social_events;
      if (dto.hostel_vibe !== undefined)
        hostelUpdate.hostel_vibe = dto.hostel_vibe;

      if (Object.keys(hostelUpdate).length > 0) {
        await manager.update(Hostel, hostel.id, hostelUpdate);
      }

      return this.findOne(id);
    });
  }

  async remove(id: string): Promise<void> {
    const hostel = await this.findOne(id);
    await this.placeRepo.remove(hostel.place);
  }

  async uploadImages(
    id: string,
    files: Express.Multer.File[],
  ): Promise<Hostel> {
    const hostel = await this.findOne(id);
    const placeImageRepo = this.dataSource.getRepository(PlaceImage);
    const existingCount = await placeImageRepo.count({
      where: { place_id: hostel.place_id },
    });

    if (files && files.length > 0) {
      const placeImages = files.map((file, index) => {
        const pImage = new PlaceImage();
        pImage.place_id = hostel.place_id;
        pImage.url = `/uploads/${file.filename}`;
        pImage.sort_order = existingCount + index;
        return pImage;
      });
      await placeImageRepo.save(placeImages);
    }
    return this.findOne(id);
  }
}
