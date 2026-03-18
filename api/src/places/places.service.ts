import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Not } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place, PlaceStatus } from './entities/place.entity';
import { PlaceImage } from './entities/place-image.entity';

@Injectable()
export class PlacesService {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
    @InjectRepository(PlaceImage)
    private readonly placeImageRepository: Repository<PlaceImage>,
  ) { }

  async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
    const { images: _images, ...rest } = createPlaceDto as CreatePlaceDto & {
      images?: unknown;
    };
    const place = this.placeRepository.create({
      ...rest,
      status: createPlaceDto.status ?? PlaceStatus.ACTIVE,
    } as Partial<Place>);
    return await this.placeRepository.save(place);
  }

  async findAll(
    excludeTypes?: string[],
    showInHero?: boolean,
    type?: string,
    language?: string,
  ): Promise<Place[]> {
    const where: any = {};
    if (excludeTypes && excludeTypes.length > 0) {
      where.type = Not(In(excludeTypes));
    }
    if (showInHero !== undefined) {
      where.show_in_hero = showInHero;
    }
    if (type) {
      where.type = type;
    }
    if (language) {
      where.language = language;
    }
    return await this.placeRepository.find({
      where,
      relations: ['images', 'reviews'],
    });
  }

  async findOne(id: string, language?: string): Promise<Place> {
    const isIdUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id);
    const whereClause: any = isIdUuid ? { id } : { slug: id };

    const place = await this.placeRepository.findOne({
      where: whereClause,
      relations: ['images', 'reviews'],
    });

    if (!place) {
      throw new NotFoundException(`Place with ID or slug ${id} not found`);
    }

    // Try to find the translation if a specific language is requested
    if (language && place.language !== language) {
      const translation = await this.placeRepository.findOne({
        where: { slug: place.slug, language },
        relations: ['images', 'reviews'],
      });
      if (translation) {
        return translation;
      }
    }

    return place;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findOne(id);
    const { images: _images, ...rest } = updatePlaceDto as UpdatePlaceDto & {
      images?: unknown;
    };
    this.placeRepository.merge(place, rest as Partial<Place>);
    return await this.placeRepository.save(place);
  }

  async remove(id: string): Promise<void> {
    const place = await this.findOne(id);
    await this.placeRepository.remove(place);
  }

  async removeImage(imageId: string): Promise<void> {
    const image = await this.placeImageRepository.findOne({ where: { id: imageId } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found`);
    }
    await this.placeImageRepository.remove(image);
  }

  async uploadImages(id: string, files: Express.Multer.File[]): Promise<Place> {
    const place = await this.findOne(id);
    const existingCount = await this.placeImageRepository.count({
      where: { place_id: place.id },
    });

    if (files && files.length > 0) {
      const placeImages = files.map((file, index) => {
        const pImage = new PlaceImage();
        pImage.place_id = place.id;
        pImage.url = `/uploads/${file.filename}`;
        pImage.sort_order = existingCount + index;
        return pImage;
      });
      await this.placeImageRepository.save(placeImages);
    }

    // refetch place with images
    const updatedPlace = await this.placeRepository.findOne({
      where: { id: place.id },
      relations: ['images', 'reviews'],
    });

    if (!updatedPlace) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }

    return updatedPlace;
  }
}
