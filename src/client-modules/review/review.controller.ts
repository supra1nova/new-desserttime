import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
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
import { MemberIdPagingDto } from './dto/review.dto';
import { JwtAuthGuard } from 'src/config/auth/jwt/jwt.guard';
import { ReviewSaveDto } from './dto/review.save.dto';
import { ReviewMemberIdDto } from './dto/review.member.dto';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '리뷰 하나 조회' })
  @Get()
  async findReviewOne(@Query() reviewMemberIdDto: ReviewMemberIdDto) {
    return await this.reviewService.findReviewOne(reviewMemberIdDto);
  }

  @ApiOperation({ summary: '홈화면 - 카테고리별 리뷰 이미지 목록 조회' })
  @Get('home/list/:memberId')
  async getHomeReviewImgList(@Param(new ValidationPipe({ whitelist: true, transform: true })) memberIdDto: MemberIdDto) {
    return await this.reviewService.getHomeReviewImgList(memberIdDto);
  }

  @ApiOperation({ summary: '선택한 카테고리의 리뷰 목록 조회' })
  @Get('category/list/:dessertCategoryId/:selectedOrder/:memberId')
  async getReviewCategoryList(@Param() reviewCategoryDto: ReviewCategoryDto) {
    return await this.reviewService.findReviewCategoryList(reviewCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰에 좋아요 하기' })
  @Post('like/:memberId/:reviewId/:isLike')
  async postLikeItem(@Param() likeDto: LikeDto) {
    await this.reviewService.postLikeItem(likeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기작성가능한 총 후기 갯수' })
  @Get('generable/count/:memberId')
  async getGenerableReviewCount(@Query() memberIdDto: MemberIdDto) {
    return await this.reviewService.getGenerableReviewCount(memberIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이번달, 후기 작성가능한 일수' })
  @Get('generable/date')
  async getGenerableReviewDate() {
    return await this.reviewService.getGenerableReviewDate();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성가능한 후기 목록' })
  @Get('generable/list/:memberId')
  async getGenerableReviewList(@Param() memberIdPagingDto: MemberIdPagingDto) {
    return await this.reviewService.getGenerableReviewList(memberIdPagingDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성목록 등록' })
  @Post('generable/list')
  async postGernerableReviewList(@Body() reviewCreateDto: ReviewCreateDto) {
    return await this.reviewService.postGenerableReviewList(reviewCreateDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '작성 가능한 후기 하나 삭제' })
  @Delete('generable')
  async deleteGenerableReview(@Param() reviewIdDto: ReviewIdDto) {
    return await this.reviewService.deleteGenerableReview(reviewIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성 - 재료목록조회' })
  @Get('ingredient/list')
  async getIngredientList() {
    return await this.reviewService.getIngredientList();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기작성 - 작성가능한 후기 하나 조회' })
  @Get('generable/:reviewId')
  async getGenerableReview(@Param() reviewIdDto: ReviewIdDto) {
    return await this.reviewService.getGenerableReview(reviewIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기작성 - 후기 하나 생성 및 수정 (뒤로가기)' })
  @Post('generable')
  async postGenerableReview(@Body() reviewSaveDto: ReviewSaveDto) {
    return await this.reviewService.postGenerableReview(reviewSaveDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성 - 후기 등록 (작성완료)' })
  @Patch('generable')
  async patchGenerableReview(@Body() reviewUpdateDto: ReviewUpdateDto) {
    return await this.reviewService.patchGenerableReview(reviewUpdateDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰이미지 하나 삭제' })
  @Delete('generable/img/:reviewImgId')
  async deleteReviewImg(@Param() reviewImgIdDto: ReviewImgIdDto) {
    await this.reviewService.deleteReviewImg(reviewImgIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰이미지 삭제후/순서변경/메인변경 수정' })
  @Patch('generable/img')
  async updateReviewImg(@Body() updateReviewImgListDto: UpdateReviewImgListDto) {
    await this.reviewService.updateReviewImg(updateReviewImgListDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자가 좋아요를 누른 리뷰 목록 조회' })
  @Get('like/list/:memberId')
  async getLikedReviewList(@Param() memberIdPagingDto: MemberIdPagingDto) {
    return await this.reviewService.getLikedReviewList(memberIdPagingDto);
  }
}
