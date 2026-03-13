import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from '../config/multer.config';

@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        status: 'error',
        message: 'Fayl seçilməyib',
      };
    }
    return {
      status: 'success',
      data: {
        url: `/uploads/${file.filename}`,
      },
    };
  }
}
