import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikeDto } from './dto/like.dto';
import { MemberIdDto } from './dto/member.id.dto';
import { ReviewCreateDto } from './dto/review.create.dto';
import { ReviewIdDto } from './dto/review.id.dto';
import { ReviewUpdateDto } from './dto/review.update.dto';
import { multerOptionsFactory } from 'src/config/file/multer.option.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReviewImgSaveDto } from './dto/reviewimg.save.dto';
import { ReviewImgIdDto } from './dto/reviewimg.id.dto';
import { UpdateReviewImgListDto } from './dto/reviewimg.list.change.dto';
import { IngredientNameDto } from './dto/ingredient.name.dto';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @ApiOperation({ summary: '홈화면 - 카테고리별 리뷰 이미지 목록 조회' })
  @Get('home/list/:memberId')
  async getHomeReviewImgList(@Param() memberIdDto: MemberIdDto) {
    return await this.reviewService.getHomeReviewImgList(memberIdDto);
  }
  @ApiOperation({ summary: '선택한 카테고리의 리뷰 목록 조회' })
  @Get('category/list/:dessertCategoryId/:selectedOrder/:memberId')
  async getReviewCategoryList(@Param() reviewCategoryDto: ReviewCategoryDto) {
    return await this.reviewService.findReviewCategoryList(reviewCategoryDto);
  }

  @ApiOperation({ summary: '리뷰 좋아요' })
  @Post('like/:memberId/:reviewId/:isLike')
  async postLikeItem(@Param() likeDto: LikeDto) {
    await this.reviewService.postLikeItem(likeDto);
  }
  @ApiOperation({ summary: '후기작성가능한 후기 갯수' })
  @Get('generable/count/:memberId')
  async getGenerableReviewCount(@Param() memberIdDto: MemberIdDto) {
    return await this.reviewService.getGenerableReviewCount(memberIdDto);
  }

  @ApiOperation({ summary: '후기 작성가능한 일수' })
  @Get('generable/date')
  async getGenerableReviewDate() {
    return await this.reviewService.getGenerableReviewDate();
  }

  @ApiOperation({ summary: '후기 작성가능한 후기 목록' })
  @Get('generable/list/:memberId')
  async getGenerableReviewList(@Param() memberIdDto: MemberIdDto) {
    return await this.reviewService.getGenerableReviewList(memberIdDto);
  }

  @ApiOperation({ summary: '후기 작성목록 등록' })
  @Post('generable')
  async postGernerableReviewList(@Body() reviewCreateDto: ReviewCreateDto) {
    return await this.reviewService.postGenerableReviewList(reviewCreateDto);
  }

  @ApiOperation({ summary: '작성가능한 후기 삭제' })
  @Delete('generable')
  async deleteGenerableReview(@Param() reviewIdDto: ReviewIdDto) {
    return await this.reviewService.deleteGenerableReview(reviewIdDto);
  }

  @ApiOperation({ summary: 'test용 API - 재료 하나 생성' })
  @Post('ingredient/:ingredientName')
  async postIngredientList(@Param() ingredientNameDto: IngredientNameDto) {
    return await this.reviewService.postIngredientList(ingredientNameDto);
  }

  @ApiOperation({ summary: '재료목록조회' })
  @Get('ingredient/list')
  async getIngredientList() {
    return await this.reviewService.getIngredientList();
  }

  @ApiOperation({ summary: '작성가능한 후기 하나 조회' })
  @Get('generable/:reviewId')
  async getGenerableReview(@Param() reviewIdDto: ReviewIdDto) {
    return await this.reviewService.getGenerableReview(reviewIdDto);
  }

  @ApiOperation({ summary: '후기 작성목록 수정/ 작성완료' })
  @Patch('generable')
  async patchGenerableReview(@Body() reviewUpdateDto: ReviewUpdateDto) {
    return await this.reviewService.patchGenerableReview(reviewUpdateDto);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', multerOptionsFactory()))
  @ApiOperation({ summary: '리뷰이미지 하나 저장' })
  @Post('generable/img/:reviewId/:num/:isMain')
  async postReviewImg(@UploadedFile() file: Express.Multer.File, @Param() reviewImgSaveDto: ReviewImgSaveDto) {
    return await this.reviewService.postReviewImg(reviewImgSaveDto, file);
  }

  @ApiOperation({ summary: '리뷰이미지 하나 삭제' })
  @Delete('generable/img/:reviewImgId')
  async deleteReviewImg(@Param() reviewImgIdDto: ReviewImgIdDto) {
    await this.reviewService.deleteReviewImg(reviewImgIdDto);
  }

  @ApiOperation({ summary: '리뷰이미지 삭제후/순서변경/메인변경 수정' })
  @Patch('generable/img')
  async updateReviewImg(@Body() updateReviewImgListDto: UpdateReviewImgListDto) {
    await this.reviewService.updateReviewImg(updateReviewImgListDto);
  }
}
