import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewImg } from '../../config/entities/review.img.entity';
import { UpdateAdminReviewImgDto } from './model/update-admin-review-img.dto';

export class AdminReviewImgRepository {
  constructor(@InjectRepository(ReviewImg) private adminReviewImgRepository: Repository<ReviewImg>) {}

  /**
   * 리뷰 이미지 업데이트
   * @param reviewImgId
   * @param updateAdminReviewImgDto
   */
  async update(reviewImgId: number, updateAdminReviewImgDto: UpdateAdminReviewImgDto) {
    const updateResult = await this.adminReviewImgRepository.update(reviewImgId, updateAdminReviewImgDto);
    return !!updateResult.affected;
  }
}
