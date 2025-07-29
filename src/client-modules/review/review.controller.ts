import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { SearchReviewByCategoryDto } from './dto/search-review-by-category.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LikeDto } from './dto/like.dto';
import { GetRegistrableReviewListDto } from './dto/get-registrable-review-list.dto';
import { CreateRegistrableReviewDto } from './dto/create-registrable-review.dto';
import { GetRegistrableReviewDto } from './dto/get-registrable-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { multerOptionsFactory } from 'src/config/file/multer.option.factory';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateReviewImgDto } from './dto/create-review-img.dto';
import { DeleteReviewImgDto } from './dto/delete-review-img.dto';
import { UpdateReviewImgListDto } from './dto/update-review-img-list.dto';
import { SearchRegistrableReview } from './dto/search-registrable-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { JwtAuthGuard } from '../../config/auth/jwt/jwt.guard';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: '리뷰 하나 조회' })
  @Get()
  async getReview(@Query() getReviewDto: GetReviewDto) {
    return await this.reviewService.getReview(getReviewDto);
  }

  @ApiOperation({ summary: '홈화면 - 카테고리별 리뷰 이미지 목록 조회' })
  @Get('home/list/:memberId')
  async getReviewListWithImagePerCategory(
    @Param(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    )
    getRegistrableReviewListDto: GetRegistrableReviewListDto,
  ) {
    return await this.reviewService.getReviewListWithImagePerCategory(getRegistrableReviewListDto);
  }

  @ApiOperation({ summary: '선택한 카테고리의 리뷰 목록 조회' })
  @Get('category/list/:dessertCategoryId/:selectedOrder/:memberId')
  async getReviewListByCategory(@Param() searchReviewByCategoryDto: SearchReviewByCategoryDto) {
    return await this.reviewService.findReviewListByCategory(searchReviewByCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰에 좋아요 하기' })
  @Post('like/:memberId/:reviewId/:isLike')
  async createLike(@Param() likeDto: LikeDto) {
    await this.reviewService.insertLike(likeDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '작성가능한 총 후기 갯수' })
  @Get('registrable/count/:memberId')
  async getRegistrableReviewCount(@Param() getRegistrableReviewListDto: GetRegistrableReviewListDto) {
    return await this.reviewService.getRegistrableReviewCount(getRegistrableReviewListDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '이번달, 후기 작성가능한 일수' })
  @Get('registrable/date')
  async getRegistrableReviewDate() {
    return await this.reviewService.getRegistrableReviewDate();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성가능한 후기 목록' })
  @Get('registrable/list/:memberId')
  async getRegistrableReviewList(@Param() searchRegistrableReview: SearchRegistrableReview) {
    return await this.reviewService.getRegistrableReviewList(searchRegistrableReview);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성목록 등록' })
  @Post('registrable/list')
  async createRegistrableReviewList(@Body() createRegistrableReviewDto: CreateRegistrableReviewDto) {
    return await this.reviewService.createRegistrableReviewList(createRegistrableReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '작성 가능한 후기 하나 삭제' })
  @Delete('registrable')
  async deleteRegistrableReview(@Param() getRegistrableReviewDto: GetRegistrableReviewDto) {
    return await this.reviewService.deleteRegistrableReview(getRegistrableReviewDto);
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
  @Get('registrable/:reviewId')
  async getRegistrableReview(@Param() getRegistrableReviewDto: GetRegistrableReviewDto) {
    return await this.reviewService.getRegistrableReview(getRegistrableReviewDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기작성 - 후기 하나 생성 및 수정 (뒤로가기)' })
  @Post('registrable')
  async createRegistrableReview(@Body() reviewSaveDto: CreateReviewDto) {
    return await this.reviewService.createRegistrableReview(reviewSaveDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '후기 작성 - 후기 등록 (작성완료)' })
  @Patch('registrable')
  async updateRegistrableReview(@Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.updateRegistrableReview(updateReviewDto);
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
  @Post('registrable/img/:reviewId/:num/:isMain')
  async createReviewImg(@UploadedFile() file: Express.Multer.File, @Param() createReviewImgDto: CreateReviewImgDto) {
    return await this.reviewService.createReviewImg(createReviewImgDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰이미지 삭제후/순서변경/메인변경 수정' })
  @Patch('registrable/img')
  async updateReviewImg(@Body() updateReviewImgListDto: UpdateReviewImgListDto) {
    await this.reviewService.updateReviewImg(updateReviewImgListDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '리뷰이미지 하나 삭제' })
  @Delete('registrable/img/:reviewImgId')
  async deleteReviewImg(@Param() reviewImgIdDto: DeleteReviewImgDto) {
    await this.reviewService.deleteReviewImg(reviewImgIdDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '사용자가 좋아요를 누른 리뷰 목록 조회' })
  @Get('like/list/:memberId')
  async getLikedReviewList(@Param() memberIdPagingDto: SearchRegistrableReview) {
    return await this.reviewService.getLikedReviewList(memberIdPagingDto);
  }
}
