import { Controller, Get, Param } from '@nestjs/common';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.regionsService.findBySlug(slug);
  }

  @Get('id/:id')
  findById(@Param('id') id: string) {
    return this.regionsService.findById(id);
  }
}
