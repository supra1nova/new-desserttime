import { Body, Controller, Delete, Get, Param, Patch, Query } from '@nestjs/common';
import { AdminReviewService } from './admin-review.service';
import { AdminSearchReviewDto } from './model/admin-search-review.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateAdminReviewDto } from './model/update-admin-review.dto';
import { UpdateStatusAdminReviewDto } from './model/update-status-admin-review.dto';

@ApiTags('Admin Review')
@Controller('admin-review')
export class AdminReviewController {
  constructor(private readonly adminReviewService: AdminReviewService) {}

  @ApiOperation({ summary: '전체 리뷰 목록 조회' })
  @Get()
  async findAll(@Query() adminSearchReviewDto: AdminSearchReviewDto) {
    return this.adminReviewService.findAll(adminSearchReviewDto);
  }

  @ApiOperation({ summary: '리뷰 조회' })
  @ApiParam({
    name: 'reviewId',
    type: Number,
    description: 'review 아이디',
    example: 4,
  })
  @Get(':reviewId')
  async findOneById(@Param('reviewId') reviewId: string) {
    return await this.adminReviewService.findOneById(+reviewId);
  }

  @ApiOperation({ summary: '리뷰 수정' })
  @ApiParam({
    name: 'reviewId',
    type: Number,
    description: '리뷰 아이디',
    example: 4,
  })
  @ApiBody({
    type: UpdateAdminReviewDto,
    description: `
      dessertCategoryId: 2차 카테고리 id
      storeName: 가게명
      menuId: 메뉴 id
      menuName: 메뉴명
      content: 리뷰 내용
      memo: 관리자 메모
      reviewIngredientIdArr: 재료 id 배열
      reviewImgs: 리뷰 이미지 객체 배열
  `,
    examples: {
      example1: {
        summary: '리뷰 수정 예시1',
        value: {
          reviewId: 4,
          dessertCategoryId: 22,
          storeName: 'ㅇㅇ디저트',
          menuName: '초콜릿 케이크',
          content: '초콜릿 맛이 엄청나요!!',
          adminMemo: '오버하는 리뷰를 자주씀',
          reviewIngredientIdArr: [1, 2, 3],
          reviewImgs: [
            { reviewImgId: 1, num: 1, isMain: true, isUsable: true },
            { reviewImgId: 2, num: 2, isMain: false, isUsable: true },
          ],
        },
      },
      example2: {
        summary: '리뷰 수정 예시2',
        value: {
          reviewId: 4,
          dessertCategoryId: 30,
          storeName: 'ㅁㅁ베이커리',
          menuName: '치즈 케이크',
          content: '깊은 치즈의 맛 최고의 케이크',
          adminMemo: '리뷰를 영화 시사평처럼 작성',
          reviewIngredientIdArr: [1, 2, 3],
          reviewImgs: [
            { reviewImgId: 13, num: 4, isMain: false, isUsable: true },
            { reviewImgId: 14, num: 1, isMain: false, isUsable: true },
            { reviewImgId: 15, num: 3, isMain: true, isUsable: true },
            { reviewImgId: 16, num: 0, isMain: false, isUsable: false },
            { reviewImgId: 17, num: 2, isMain: false, isUsable: true },
            { reviewImgId: 18, num: 5, isMain: false, isUsable: true },
          ],
        },
      },
    },
  })
  @Patch(':reviewId')
  async update(@Param('reviewId') reviewId: string, @Body() updateAdminReviewDto: UpdateAdminReviewDto) {
    return await this.adminReviewService.processUpdate(+reviewId, updateAdminReviewDto);
  }

  @ApiOperation({ summary: '리뷰 다중 등록 처리' })
  @ApiBody({
    type: UpdateStatusAdminReviewDto,
    description: `
      reviewIdArr: 리뷰 id 배열
  `,
    examples: {
      example1: {
        value: {
          reviewIdArr: [4, 5],
        },
      },
    },
  })
  @Patch('register')
  async register(@Body() updateStatusAdminReviewDto: UpdateStatusAdminReviewDto) {
    return await this.adminReviewService.updateStatus('save', updateStatusAdminReviewDto);
  }

  @ApiOperation({ summary: '리뷰 다중 삭제 처리' })
  @ApiBody({
    type: UpdateStatusAdminReviewDto,
    description: `
      reviewIdArr: 리뷰 id 배열
  `,
    examples: {
      example1: {
        value: {
          reviewIdArr: [4, 5],
        },
      },
    },
  })
  @Delete('delete')
  async delete(@Body() updateStatusAdminReviewDto: UpdateStatusAdminReviewDto) {
    return await this.adminReviewService.updateStatus('delete', updateStatusAdminReviewDto);
  }
}
