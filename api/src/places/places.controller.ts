import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) { }

  @Post()
  create(@Body() createPlaceDto: CreatePlaceDto) {
    return this.placesService.create(createPlaceDto);
  }

  @Get()
  findAll(
    @Query('exclude_types') excludeTypes?: string,
    @Query('show_in_hero') showInHero?: string,
    @Query('type') type?: string,
    @Query('language') language?: string,
  ) {
    const exclude = excludeTypes ? excludeTypes.split(',') : undefined;
    const isHero = showInHero === 'true' ? true : showInHero === 'false' ? false : undefined;
    return this.placesService.findAll(exclude, isHero, type, language);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('language') language?: string) {
    return this.placesService.findOne(id, language);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    return this.placesService.update(id, updatePlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }

  @Post(':id/images')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  uploadImages(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.placesService.uploadImages(id, files);
  }
}
