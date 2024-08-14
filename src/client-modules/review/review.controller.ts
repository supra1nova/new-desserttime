import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikeDto } from './dto/like.dto';
import { TransactionInterceptor } from 'src/config/interceptor/transaction.interceptor';
import { MemberIdDto } from './dto/member.id.dto';
import { ReviewCreateDto } from './dto/review.create.dto';
import { ReviewIdDto } from './dto/review.id.dto';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '선택한 카테고리의 리뷰 목록 조회' })
  @Get('category/list/:dessertCategoryId/:selectedOrder/:memberId')
  async getReviewCategoryList(@Param() reviewCategoryDto: ReviewCategoryDto) {
    return await this.reviewService.findReviewCategoryList(reviewCategoryDto);
  }
  @ApiOperation({ summary: '리뷰 좋아요' })
  @UseInterceptors(TransactionInterceptor)
  @Post('like/:memberId/:reviewId/:isLike')
  async postLikeItem(@Param() likeDto: LikeDto) {
    await this.reviewService.postLikeItem(likeDto);
  }
  @ApiOperation({ summary: '후기작성가능한 후기 갯수' })
  @UseInterceptors(TransactionInterceptor)
  @Get('generable/count/:memberId')
  async getGenerableReviewCount(@Param() memberIdDto: MemberIdDto) {
    return await this.reviewService.getGenerableReviewCount(memberIdDto);
  }

  @ApiOperation({ summary: '후기 작성가능한 일수' })
  @UseInterceptors(TransactionInterceptor)
  @Get('generable/date')
  async getGenerableReviewDate() {
    return await this.reviewService.getGenerableReviewDate();
  }

  @ApiOperation({ summary: '후기 작성가능한 후기 목록' })
  @UseInterceptors(TransactionInterceptor)
  @Get('generable/list/:memberId')
  async getGenerableReviewList(@Param() memberIdDto: MemberIdDto) {
    return await this.reviewService.getGenerableReviewList(memberIdDto);
  }

  @ApiOperation({ summary: '후기 작성목록 등록' })
  @UseInterceptors(TransactionInterceptor)
  @Post('generable')
  async postGernerableReviewList(@Body() reviewCreateDto: ReviewCreateDto) {
    return await this.reviewService.postGenerableReviewList(reviewCreateDto);
  }

  @ApiOperation({ summary: '작성가능한 후기 삭제' })
  @UseInterceptors(TransactionInterceptor)
  @Delete('generable')
  async deleteGenerableReview(@Param() reviewIdDto: ReviewIdDto) {
    return await this.reviewService.deleteGenerableReview(reviewIdDto);
  }

  @ApiOperation({ summary: '작성가능한 후기 하나 조회' })
  @UseInterceptors(TransactionInterceptor)
  @Get('generable/:reviewId')
  async getGenerableReview(@Param() reviewIdDto: ReviewIdDto) {
    return await this.reviewService.getGenerableReview(reviewIdDto);
  }
}
