import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuidePage } from './entities/guide-page.entity';
import { GuidePageService } from './guide-page.service';
import { GuidePageController } from './guide-page.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GuidePage])],
  controllers: [GuidePageController],
  providers: [GuidePageService],
  exports: [GuidePageService],
})
export class GuidePageModule {}
