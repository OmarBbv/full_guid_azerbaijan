import { Test, TestingModule } from '@nestjs/testing';
import { VenueImageService } from './venue-image.service';

describe('VenueImageService', () => {
  let service: VenueImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VenueImageService],
    }).compile();

    service = module.get<VenueImageService>(VenueImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
