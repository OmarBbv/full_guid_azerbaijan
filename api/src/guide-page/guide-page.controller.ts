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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GuidePageService } from './guide-page.service';
import { CreateGuidePageDto, UpdateGuidePageDto } from './dto/create-guide-page.dto';
import { multerOptions } from '../config/multer.config';

@Controller('guide-pages')
export class GuidePageController {
  constructor(private readonly guidePageService: GuidePageService) {}

  @Post()
  create(@Body() dto: CreateGuidePageDto) {
    return this.guidePageService.create(dto);
  }

  @Get()
  findAll(
    @Query('language') language?: string,
    @Query('active') active?: string,
  ) {
    const onlyActive = active === 'true';
    return this.guidePageService.findAll(language, onlyActive);
  }

  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('language') language?: string,
  ) {
    return this.guidePageService.findBySlug(slug, language);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.guidePageService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateGuidePageDto,
  ) {
    return this.guidePageService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.guidePageService.remove(id);
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  uploadImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.guidePageService.uploadImage(id, file.filename);
  }
}
