import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { CityService } from './city.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  // POST /cities
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateCityDto) {
    return this.cityService.create(dto);
  }

  // GET /cities?language=az&active=true&featured=true
  @Get()
  findAll(
    @Query('language') language?: string,
    @Query('active') active?: string,
    @Query('featured') featured?: string,
  ) {
    return this.cityService.findAll(language, active === 'true', featured === 'true');
  }

  // GET /cities/slug/:slug?language=az
  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string, @Query('language') language?: string) {
    return this.cityService.findBySlug(slug, language || 'az');
  }

  // GET /cities/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.cityService.findOne(id);
  }

  // PATCH /cities/:id
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCityDto,
  ) {
    return this.cityService.update(id, dto);
  }

  // DELETE /cities/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.cityService.remove(id);
  }

  @Post(':id/images')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'cover_image', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ],
      multerOptions,
    ),
  )
  uploadImages(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; cover_image?: Express.Multer.File[]; gallery?: Express.Multer.File[] },
  ) {
    return this.cityService.uploadImages(id, files || {});
  }
}
