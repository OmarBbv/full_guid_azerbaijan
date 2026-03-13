import { Injectable } from '@nestjs/common';
import { CreateVenueImageDto } from './dto/create-venue-image.dto';
import { UpdateVenueImageDto } from './dto/update-venue-image.dto';

@Injectable()
export class VenueImageService {
  create(createVenueImageDto: CreateVenueImageDto) {
    return 'This action adds a new venueImage';
  }

  findAll() {
    return `This action returns all venueImage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} venueImage`;
  }

  update(id: number, updateVenueImageDto: UpdateVenueImageDto) {
    return `This action updates a #${id} venueImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} venueImage`;
  }
}
