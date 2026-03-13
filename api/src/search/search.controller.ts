import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  search(
    @Query('q') q?: string,
    @Query('city') city?: string,
    @Query('type') type?: string,
    @Query('language') language?: string,
    @Query('limit') limit?: string,
  ) {
    return this.searchService.search({
      q,
      city,
      type,
      language,
      limit: limit ? parseInt(limit, 10) : 30,
    });
  }
}
