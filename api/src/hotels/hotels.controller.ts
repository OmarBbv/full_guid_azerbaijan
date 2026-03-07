import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { HotelsService } from './hotels.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateHotelDto) {
    return this.hotelsService.create(dto);
  }

  @Get()
  findAll(@Query('language') language?: string) {
    return this.hotelsService.findAll(language);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.hotelsService.findBySlug(slug);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateHotelDto) {
    return this.hotelsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.hotelsService.remove(id);
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  uploadImages(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.hotelsService.uploadImages(id, files);
  }
}
