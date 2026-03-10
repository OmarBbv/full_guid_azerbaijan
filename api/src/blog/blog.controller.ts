import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseUUIDPipe,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateBlogPostDto) {
    return this.blogService.create(dto);
  }

  @Get()
  findAll(
    @Query('language') language?: string,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('featured') featured?: string,
    @Query('published') published?: string,
  ) {
    return this.blogService.findAll({
      language,
      category,
      search,
      featured,
      published,
    });
  }

  @Get('slug/:slug')
  findBySlug(
    @Param('slug') slug: string,
    @Query('language') language?: string,
  ) {
    return this.blogService.findOneBySlug(slug, language);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogService.findOneById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateBlogPostDto,
  ) {
    return this.blogService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.blogService.remove(id);
  }

  @Post(':id/cover')
  @UseInterceptors(FilesInterceptor('images', 1, multerOptions))
  uploadCover(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.blogService.uploadCover(id, files[0]);
  }
}

