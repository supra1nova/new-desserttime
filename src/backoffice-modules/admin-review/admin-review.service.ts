import { Injectable } from '@nestjs/common';
import { AdminReviewRepository } from './admin-review.repository';
import { Transactional } from 'typeorm-transactional';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';
import { Page } from '../common/dto/page.dto';

@Injectable()
export class AdminReviewService {
  constructor(private adminReviewRepository: AdminReviewRepository) {}

  /**
   * 리뷰 목록 조회 메서드
   * @param adminSearchReviewDto
   */
  @Transactional()
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

  /*
  findOne(id: number) {
    return `This action returns a #${id} adminReview`;
  }

  update(id: number, updateAdminReviewDto: UpdateAdminReviewDto) {
    return `This action updates a #${id} adminReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminReview`;
  }*/


  /* private 메서드 */

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
        const [id, tgtImgName] = idWithPath.split('_');
        if (id === undefined || id === null || id === '' || id.toLowerCase() === 'null') return;
        if (tgtImgName === undefined || tgtImgName === null || tgtImgName === '' || tgtImgName.toLowerCase() === 'null') return;

        result.push({ id: parseInt(id, 10), tgtImgName: tgtImgName, orgImgName: value });
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
