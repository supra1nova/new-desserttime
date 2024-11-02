import { Injectable } from '@nestjs/common';
import { UpdateAdminReviewImgDto } from './model/update-admin-review-img.dto';
import { AdminReviewImgRepository } from './admin-review-img.repository';

@Injectable()
export class AdminReviewImgService {
  constructor(private adminReviewImgRepository: AdminReviewImgRepository) {}

  /**
   * 리뷰 이미지 업데이트
   * @param id
   * @param updateAdminReviewImgDto
   */
  async update(id: number, updateAdminReviewImgDto: UpdateAdminReviewImgDto) {
    return await this.adminReviewImgRepository.update(id, updateAdminReviewImgDto);
  }
}
