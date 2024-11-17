import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminReviewRepository } from './admin-review.repository';
import { Transactional } from 'typeorm-transactional';
import { Page } from '../common/dto/page.dto';
import { AdminSearchReviewDto } from './model/admin-search-review.dto';
import { UpdateAdminReviewDto } from './model/update-admin-review.dto';
import { AdminReviewIngredientService } from '../admin-review-ingredient/admin-review-ingredient.service';
import { AdminReviewImgService } from '../admin-review-img/admin-review-img.service';
import { RuntimeException } from '@nestjs/core/errors/exceptions';
import { UpdateStatusAdminReviewDto } from './model/update-status-admin-review.dto';
import { UpdateAdminPointDto } from '../admin-point/model/update-admin-point.dto';
import { AdminPointService } from '../admin-point/admin-point.service';
import { PointType } from '../../common/enum/point.enum';

@Injectable()
export class AdminReviewService {
  constructor(
    private adminReviewIngredientService: AdminReviewIngredientService,
    private adminReviewImgService: AdminReviewImgService,
    private adminPointService: AdminPointService,
    private adminReviewRepository: AdminReviewRepository,
  ) {}

  /**
   * 리뷰 목록 조회 메서드
   * @param adminSearchReviewDto
   */
  async findAll(adminSearchReviewDto: AdminSearchReviewDto) {
    const total = await this.adminReviewRepository.count(adminSearchReviewDto);
    const rawItems = await this.adminReviewRepository.findReviewList(adminSearchReviewDto);

    const items = rawItems.map((rv) => ({
      ...rv,
      ingredients: this.setStringToObjArr(rv.ingredients),
      accusations: this.setStringToObjArr(rv.accusations),
      reviewImgs: this.setImgStringToObjArr(rv.reviewImgs),
      receiptImgs: this.setImgStringToObjArr(rv.receiptImgs),
    }));

    return this.setPageInfo(total, items, adminSearchReviewDto);
  }

  /**
   * 리뷰 단건 조회 메서드
   * @param reviewId
   */
  async findOneById(reviewId: number) {
    const rawItem = await this.adminReviewRepository.findOneById(reviewId);

    if (rawItem === undefined) throw new NotFoundException();

    rawItem['ingredients'] = this.setStringToObjArr(rawItem['ingredients']);
    rawItem['accusations'] = this.setStringToObjArr(rawItem['accusations']);
    rawItem['reviewImgs'] = this.setImgStringToObjArr(rawItem['reviewImgs']);
    rawItem['receiptImgs'] = this.setImgStringToObjArr(rawItem['receiptImgs']);
    return rawItem;
  }

  /**
   * 리뷰 수정 메서드
   * @param reviewId
   * @param updateAdminReviewDto
   */
  @Transactional()
  async processUpdate(reviewId: number, updateAdminReviewDto: UpdateAdminReviewDto) {
    const { reviewIngredientIdArr, reviewImgs, ...otherFields } = updateAdminReviewDto;

    const updateData = {
      ...otherFields,
      dessertCategory: { dessertCategoryId: updateAdminReviewDto.dessertCategoryId },
    };

    await this.update(reviewId, updateData);
    if (reviewIngredientIdArr) await this.adminReviewIngredientService.processDeleteInsert(reviewId, reviewIngredientIdArr);
    if (reviewImgs) await this.adminReviewImgService.update(reviewId, reviewImgs);
    return true;
  }

  /**
   * 리뷰 수정 메서드
   */
  @Transactional()
  async update(reviewId: number, updateAdminReviewDto: UpdateAdminReviewDto) {
    const result = await this.adminReviewRepository.update(reviewId, updateAdminReviewDto);
    if (!result) throw new RuntimeException('리뷰 수정에 실패했습니다.');
  }

  /**
   * 리뷰 상태 수정 메서드
   * @param status  save/delete 상태
   * @param updateStatusAdminReviewDto  reviewId
   */
  @Transactional()
  async updateStatus(status: string, updateStatusAdminReviewDto: UpdateStatusAdminReviewDto) {
    const reviewArr = await this.adminReviewRepository.findReviewListByReviewId(updateStatusAdminReviewDto.reviewIdArr);

    // status 업데이트
    const result = await this.adminReviewRepository.updateStatus(status, updateStatusAdminReviewDto);

    // status 가 save인 경우 각 리뷰의 멤버에 50 포인트 지급
    if (result && status === 'save') {
      for (const review of reviewArr) {
        const { reviewId, memberId } = review;
        const updateAdminPointDto = new UpdateAdminPointDto(50, PointType.REVIEW);
        const pointInsertResult = await this.adminPointService.processInsertUpdatePoint('save', memberId, updateAdminPointDto, reviewId);
        if (!pointInsertResult) throw new RuntimeException('포인트 적립에 실패했습니다.');
      }
    }

    if (!result) throw new RuntimeException('리뷰 상태 변경에 실패했습니다.');
    return result;
  }

  // private 메서드

  /**
   * 일반 배열 정리 메서드
   * @param strConcatedWithComma
   */
  private setStringToObjArr(strConcatedWithComma: string) {
    if (strConcatedWithComma === undefined || strConcatedWithComma === null || strConcatedWithComma === '' || strConcatedWithComma.toLowerCase() === 'null') return [];
    return strConcatedWithComma && !strConcatedWithComma.includes('null')
      ? strConcatedWithComma
          .split(', ')
          .map((item) => {
            const [id, value] = item.split(':');
            if (!id || id === 'null') return null;
            return { id: parseInt(id, 10), value };
          })
          .filter((item) => item !== null)
      : [];
  }

  /**
   * 이미지 배열 정리 메서드
   * @param strConcatedWithComma
   */
  private setImgStringToObjArr(strConcatedWithComma: string) {
    const result = [];

    // img 값에 _: 만 저장되어 있다면 값이 없다는 의미이므로 연산을 진행하지 않음
    if (strConcatedWithComma && !(strConcatedWithComma === '_:')) {
      const listArr = strConcatedWithComma.split(', ');
      listArr.forEach((item) => item.replaceAll('_:', ''));

      listArr.forEach((item) => {
        // 이미지 db 내용이 없다면 result 추가 없이 return
        if (item === undefined || item === null || item === '' || item.toLowerCase() === 'null') return;

        // idWithPath 또는 value 가 없다면 result 추가 없이 return
        const [idWithPath, value] = item.split(':');
        if (idWithPath === undefined || idWithPath === null || idWithPath === '' || idWithPath.toLowerCase() === 'null') return;
        if (value === undefined || value === null || value === '' || value.toLowerCase() === 'null') return;

        // id 또는 tgtImgName 이 없다면 result 추가 없이 return
        const [id, middlePath, tgtImgName] = idWithPath.split('_');
        if (id === undefined || id === null || id === '' || id.toLowerCase() === 'null') return;
        if (middlePath === undefined || middlePath === null || middlePath === '' || middlePath.toLowerCase() === 'null') return;
        if (tgtImgName === undefined || tgtImgName === null || tgtImgName === '' || tgtImgName.toLowerCase() === 'null') return;

        const tgtUrl = '/' + middlePath + '/' + tgtImgName;

        result.push({ id: parseInt(id, 10), tgtImgName: tgtUrl, orgImgName: value });
      });
    }
    return result;
  }

  /**
   * 페이지네이션 세팅 함수
   * @param total
   * @param items
   * @param adminSearchReviewDto
   */
  private setPageInfo(total: number, items: object[], adminSearchReviewDto: AdminSearchReviewDto) {
    const pageNo = adminSearchReviewDto.pageNo;
    const limitSize = adminSearchReviewDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }
}
