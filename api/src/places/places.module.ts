import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

// ─── Entities ─────────────────────────────────────────────────────────────────
import { Place } from './entities/place.entity';
import { PlaceImage } from './entities/place-image.entity';
import { PlaceReview } from './entities/place-review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Place,
      PlaceImage,
      PlaceReview,
    ]),
  ],
  controllers: [
    PlacesController,
  ],
  providers: [PlacesService],
  exports: [
    TypeOrmModule,
    PlacesService,
  ],
})
export class PlacesModule { }
