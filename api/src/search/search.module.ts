import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from '../venue/entities/venue.entity';
import { VenueImage } from '../venue-image/entities/venue-image.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Place } from 'src/places/entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Place, Venue, VenueImage])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule { }
