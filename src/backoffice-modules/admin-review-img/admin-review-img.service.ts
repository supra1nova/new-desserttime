import { Injectable } from '@nestjs/common';
import { AdminReviewImgRepository } from './admin-review-img.repository';
import { UpdateReviewImgDto } from '../../client-modules/review/dto/update-review-img.dto';

@Injectable()
export class AdminReviewImgService {
  constructor(private adminReviewImgRepository: AdminReviewImgRepository) {}

  /**
   * 리뷰 이미지 배열 업데이트
   * @param reviewId
   * @param updateReviewImgDtoArr
   */
  async update(reviewId: string, updateReviewImgDtoArr: UpdateReviewImgDto[]) {
    const result = await this.adminReviewImgRepository.update(reviewId, updateReviewImgDtoArr);
    if (!result) throw new Error(`리뷰 이미지 수정에 실패했습니다.(reviewId: ${reviewId})`);
  }
}
