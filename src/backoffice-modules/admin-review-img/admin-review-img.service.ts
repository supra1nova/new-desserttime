import { Injectable } from '@nestjs/common';
import { AdminReviewImgRepository } from './admin-review-img.repository';
import { UpdateReviewImgDto } from '../../client-modules/review/dto/reviewimg.change.dto';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@Injectable()
export class AdminReviewImgService {
  constructor(private adminReviewImgRepository: AdminReviewImgRepository) {}

  /**
   * 리뷰 이미지 배열 업데이트
   * @param reviewId
   * @param updateReviewImgDtoArr
   */
  async update(reviewId: number, updateReviewImgDtoArr: UpdateReviewImgDto[]) {
    const result = await this.adminReviewImgRepository.update(reviewId, updateReviewImgDtoArr);
    if (!result) throw new RuntimeException(`Failed to update review images(reviewId: ${reviewId})`);
  }
}
