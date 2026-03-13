import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Place } from '../places/entities/place.entity';
import { Venue } from '../venue/entities/venue.entity';
import { VenueImage } from '../venue-image/entities/venue-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Venue, VenueImage])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
