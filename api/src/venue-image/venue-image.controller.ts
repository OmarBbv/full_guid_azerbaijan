import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VenueImageService } from './venue-image.service';
import { CreateVenueImageDto } from './dto/create-venue-image.dto';
import { UpdateVenueImageDto } from './dto/update-venue-image.dto';

@Controller('venue-image')
export class VenueImageController {
  constructor(private readonly venueImageService: VenueImageService) {}

  @Post()
  create(@Body() createVenueImageDto: CreateVenueImageDto) {
    return this.venueImageService.create(createVenueImageDto);
  }

  @Get()
  findAll() {
    return this.venueImageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueImageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueImageDto: UpdateVenueImageDto) {
    return this.venueImageService.update(+id, updateVenueImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueImageService.remove(+id);
  }
}
