import {
  Controller, Get, Post, Put, Delete,
  Param, Body, Query, ParseIntPipe, Patch
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { QueryVenueDto } from './dto/query-venue.dto';
import { VenueStatus } from './entities/venue.entity';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) { }

  @Post()
  create(@Body() dto: CreateVenueDto) {
    return this.venueService.create(dto);
  }

  @Get()
  findAll(@Query() query: QueryVenueDto) {
    return this.venueService.findAll(query);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.venueService.findBySlug(slug);
  }

  @Get('admin-detail/:id')
  findByIdAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.venueService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateVenueDto
  ) {
    return this.venueService.update(id, dto);
  }

  @Patch(':id/status')
  changeStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: VenueStatus
  ) {
    return this.venueService.changeStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.venueService.remove(id);
  }
}
