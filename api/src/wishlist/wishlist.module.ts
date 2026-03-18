import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistService } from './wishlist.service';
import { WishlistController } from './wishlist.controller';
import { Wishlist } from './entities/wishlist.entity';
import { PlacesModule } from '../places/places.module';
import { BlogModule } from '../blog/blog.module';
import { CityModule } from '../city/city.module';
import { VenueModule } from '../venue/venue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    PlacesModule,
    BlogModule,
    CityModule,
    VenueModule,
  ],
  controllers: [WishlistController],
  providers: [WishlistService],
  exports: [WishlistService],
})
export class WishlistModule {}
