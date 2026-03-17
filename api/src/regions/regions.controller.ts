import { Controller, Get, Param, Query } from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  findAll(@Query('language') language?: string) {
    return this.regionsService.findAll(language);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string, @Query('language') language?: string) {
    return this.regionsService.findBySlug(slug, language);
  }

  @Get('id/:id')
  findById(@Param('id') id: string, @Query('language') language?: string) {
    return this.regionsService.findById(id, language);
  }
}
