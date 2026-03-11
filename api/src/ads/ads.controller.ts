import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { AdPosition } from './entities/ad-banner.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createAdDto: CreateAdDto) {
    const ad = await this.adsService.create(createAdDto);
    return {
      status: 'success',
      data: ad,
    };
  }

  @Get()
  async findAll(
    @Query('activeOnly') activeOnly?: string,
    @Query('position') position?: string,
  ) {
    try {
      let ads;
      if (position) {
        ads = await this.adsService.findActiveByPosition(position as AdPosition);
      } else {
        ads = await this.adsService.findAll(activeOnly === 'true');
      }
      return { status: 'success', data: ads };
    } catch {
      return { status: 'success', data: [] };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const ad = await this.adsService.findOne(id);
    return {
      status: 'success',
      data: ad,
    };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateAdDto: UpdateAdDto) {
    const ad = await this.adsService.update(id, updateAdDto);
    return {
      status: 'success',
      data: ad,
    };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.adsService.remove(id);
    return {
      status: 'success',
      message: 'Ad banner deleted successfully',
    };
  }
}
