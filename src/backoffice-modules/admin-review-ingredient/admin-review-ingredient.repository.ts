import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewIngredient } from '../../config/entities/review.ingredient.entity';
import { CreateAdminReviewIngredientDto } from './model/create-admin-review-ingredient.dto';
import { DeleteAdminReviewIngredientDto } from './model/delete-admin-review-ingredient.dto';

export class AdminReviewIngredientRepository {
  constructor(@InjectRepository(ReviewIngredient) private adminReviewRepository: Repository<ReviewIngredient>) {}

  /**
   * 신규 재료 삽입
   * @param createAdminReviewIngredientDto
   * @return Promise<insertResult>
   */
  async insert(createAdminReviewIngredientDto: CreateAdminReviewIngredientDto) {
    const insertResult = await this.adminReviewRepository.insert(createAdminReviewIngredientDto);
    return insertResult !== null && insertResult !== undefined && insertResult.identifiers.length > 0;
  }

  /**
   * 재료 삭제
   * @param deleteAdminReviewIngredientDto
   * @return Promise<insertResult>
   */
  async deleteByReviewId(deleteAdminReviewIngredientDto: DeleteAdminReviewIngredientDto) {
    const deleteResult = await this.adminReviewRepository.delete(deleteAdminReviewIngredientDto);
    return !!deleteResult.affected;
  }
}
