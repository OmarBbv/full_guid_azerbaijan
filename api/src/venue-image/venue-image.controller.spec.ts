import { Test, TestingModule } from '@nestjs/testing';
import { VenueImageController } from './venue-image.controller';
import { VenueImageService } from './venue-image.service';

describe('VenueImageController', () => {
  let controller: VenueImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VenueImageController],
      providers: [VenueImageService],
    }).compile();

    controller = module.get<VenueImageController>(VenueImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
