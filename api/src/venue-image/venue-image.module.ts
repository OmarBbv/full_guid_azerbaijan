import { Module } from '@nestjs/common';
import { VenueImageService } from './venue-image.service';
import { VenueImageController } from './venue-image.controller';

@Module({
  controllers: [VenueImageController],
  providers: [VenueImageService],
})
export class VenueImageModule {}
