import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Request() req: any, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistService.create(req.user.id, createWishlistDto);
  }

  @Get()
  findAll(@Request() req: any) {
    return this.wishlistService.findAll(req.user.id);
  }

  @Get('status')
  getStatus(
    @Request() req: any,
    @Query('targetId') targetId: string,
    @Query('targetType') targetType: string,
  ) {
    return this.wishlistService.getStatus(req.user.id, targetId, targetType);
  }

  @Delete()
  remove(
    @Request() req: any,
    @Query('targetId') targetId: string,
    @Query('targetType') targetType: string,
  ) {
    return this.wishlistService.remove(req.user.id, targetId, targetType);
  }
}
