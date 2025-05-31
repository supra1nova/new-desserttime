import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewImg } from '../../config/entities/review-img.entity';
import { UpdateReviewImgDto } from '../../client-modules/review/dto/reviewimg.change.dto';

export class AdminReviewImgRepository {
  constructor(@InjectRepository(ReviewImg) private adminReviewImgRepository: Repository<ReviewImg>) {}

  /**
   * 리뷰 이미지 배열 업데이트
   * @param reviewId
   * @param updateReviewImgDtoArr
   */
  async update(reviewId: string, updateReviewImgDtoArr: UpdateReviewImgDto[]) {
    const reviewImgIdArr = updateReviewImgDtoArr.map((item) => item.reviewImgId);

    const numClause = updateReviewImgDtoArr.map((item) => `WHEN reviewImgId = ${item.reviewImgId} THEN ${item.num}`).join(' ');
    const mainClause = updateReviewImgDtoArr.map((item) => `WHEN reviewImgId = ${item.reviewImgId} THEN ${item.isMain ? 1 : 0}`).join(' ');
    const usableClause = updateReviewImgDtoArr.map((item) => `WHEN reviewImgId = ${item.reviewImgId} THEN ${item.isUsable ? Date.now() : null}`).join(' ');

    const updateResult = await this.adminReviewImgRepository
      .createQueryBuilder()
      .update()
      .set({
        num: () => `CASE ${numClause} END`,
        isMain: () => `CASE ${mainClause} END`,
        deleteDate: () => `CASE ${usableClause} END`,
      })
      .where('reviewImgReviewId = :reviewId', { reviewId })
      .andWhere('reviewImgId IN (:...reviewImgIdArr)', { reviewImgIdArr })
      .execute();

    return !!updateResult.affected;
  }
}
