import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AboutPageService } from './about-page.service';
import { CreateAboutPageDto } from './dto/create-about-page.dto';
import { UpdateAboutPageDto } from './dto/update-about-page.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';
import { multerOptions } from '../config/multer.config';

@Controller('about-pages')
export class AboutPageController {
  constructor(private readonly aboutPageService: AboutPageService) {}

  @Post()
  create(@Body() dto: CreateAboutPageDto) {
    return this.aboutPageService.create(dto);
  }

  @Get()
  findAll(
    @Query('language') language?: string,
    @Query('active') active?: string,
  ) {
    const onlyActive = active === 'true';
    return this.aboutPageService.findAll(language, onlyActive);
  }

  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('language') language?: string,
  ) {
    return this.aboutPageService.findBySlug(slug, language);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.aboutPageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateAboutPageDto,
  ) {
    return this.aboutPageService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.aboutPageService.remove(id);
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.aboutPageService.uploadImage(id, file);
  }
}
