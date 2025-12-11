import { Controller, Get } from "@nestjs/common";
import { ReviewsService } from "./reviews.service";

@Controller("reviews")
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll() {
    return {
      success: true,
      message: "Reviews can be retrieved from /user/:userId/reviews",
    };
  }
}
