import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlacesModule } from './places/places.module';
import { HostelsModule } from './hostels/hostels.module';
import { HotelsModule } from './hotels/hotels.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { BlogModule } from './blog/blog.module';
import { RegionsModule } from './regions/regions.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdsModule } from './ads/ads.module';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { CategoryModule } from './category/category.module';
import { VenueModule } from './venue/venue.module';
import { VenueImageModule } from './venue-image/venue-image.module';
import { SearchModule } from './search/search.module';
import { CityModule } from './city/city.module';
import { AboutPageModule } from './about-page/about-page.module';
import { GuidePageModule } from './guide-page/guide-page.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'metroboomin2425'),
        database: configService.get<string>('DB_NAME', 'full_guid_db'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        logging: configService.get<string>('NODE_ENV') === 'development',
        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? {
              rejectUnauthorized: false,
            }
            : false,
      }),
      inject: [ConfigService],
    }),
    PlacesModule,
    HostelsModule,
    HotelsModule,
    RestaurantsModule,
    BlogModule,
    RegionsModule,
    AuthModule,
    UsersModule,
    AdsModule,
    UploadModule,
    CategoryModule,
    VenueModule,
    VenueImageModule,
    SearchModule,
    CityModule,
    AboutPageModule,
    GuidePageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
