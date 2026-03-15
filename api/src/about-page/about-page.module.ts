import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutPage } from './entities/about-page.entity';
import { AboutPageService } from './about-page.service';
import { AboutPageController } from './about-page.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AboutPage])],
  controllers: [AboutPageController],
  providers: [AboutPageService],
  exports: [AboutPageService],
})
export class AboutPageModule {}
