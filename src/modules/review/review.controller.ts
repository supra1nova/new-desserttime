import { Controller, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '선택한 카테고리의 리뷰 목록 조회' })
  @Get('category/list/:dessertCategoryId')
  async getReviewCategoryList(@Param() reviewCategoryDto: ReviewCategoryDto) {
    return await this.reviewService.findReviewCategoryList(reviewCategoryDto);
  }
}
