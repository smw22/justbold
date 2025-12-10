import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import { SearchQueryDto } from "./dto/search-query-dto";

@Controller("search")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query() searchQueryDto: SearchQueryDto) {
    try {
      const results = await this.searchService.search(searchQueryDto);
      return {
        success: true,
        data: results,
        message: "Search completed successfully",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message,
      };
    }
  }
}
