import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './entities/place.entity';
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
    const { images: _images, ...rest } = createPlaceDto as CreatePlaceDto & { images?: unknown };
    const place = this.placeRepository.create(rest as Partial<Place>);
    return await this.placeRepository.save(place);
  }

  async findAll(): Promise<Place[]> {
    return await this.placeRepository.find();
  }

  async findOne(id: string): Promise<Place> {
    const place = await this.placeRepository.findOne({ where: { id } });
    if (!place) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }
    return place;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto): Promise<Place> {
    const place = await this.findOne(id);
    const { images: _images, ...rest } = updatePlaceDto as UpdatePlaceDto & { images?: unknown };
    this.placeRepository.merge(place, rest as Partial<Place>);
    return await this.placeRepository.save(place);
  }

  async remove(id: string): Promise<void> {
    const place = await this.findOne(id);
    await this.placeRepository.remove(place);
  }

  async uploadImages(id: string, files: Express.Multer.File[]): Promise<Place> {
    const place = await this.findOne(id);
    const existingCount = await this.placeImageRepository.count({ where: { place_id: place.id } });

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
      relations: ['images', 'reviews']
    });

    if (!updatedPlace) {
      throw new NotFoundException(`Place with ID ${id} not found`);
    }

    return updatedPlace;
  }
}
