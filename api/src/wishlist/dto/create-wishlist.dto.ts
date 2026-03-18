import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  targetId: string;

  @IsNotEmpty()
  @IsString()
  targetType: string;
}
