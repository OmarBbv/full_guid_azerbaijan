import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { AdBanner } from './entities/ad-banner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdBanner])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
