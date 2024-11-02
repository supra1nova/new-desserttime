import { Injectable } from '@nestjs/common';
import { AdminReviewIngredientRepository } from './admin-review-ingredient.repository';
import { CreateAdminReviewIngredientDto } from './model/create-admin-review-ingredient.dto';
import { DeleteAdminReviewIngredientDto } from './model/delete-admin-review-ingredient.dto';

@Injectable()
export class AdminReviewIngredientService {
  constructor(private adminReviewIngredientRepository: AdminReviewIngredientRepository) {}

  /**
   * 리뷰 대량 재료 삽입
   * @param reviewId
   * @param reviewIngredientIdArr
   */
  async processInsert(reviewId: number, reviewIngredientIdArr: number[]) {
    // 새로운 ReviewIngredient 추가
    await Promise.all(reviewIngredientIdArr.map((ingredientId) => {
      const createAdminReviewIngredientDto = new CreateAdminReviewIngredientDto(ingredientId, reviewId);
      this.insert(createAdminReviewIngredientDto);
    }));
  }

  /**
   * 리뷰 삭제
   * @param reviewId
   */
  async delete(reviewId: number) {
    const deleteAdminReview = new DeleteAdminReviewIngredientDto(reviewId);
    return await this.adminReviewIngredientRepository.deleteByReviewId(deleteAdminReview);
  }

  /* private 메서드 */

  /**
   * 리뷰 삽입
   * @param reviewIngredientDto
   */
  private async insert(reviewIngredientDto: CreateAdminReviewIngredientDto) {
    await this.adminReviewIngredientRepository.insert(reviewIngredientDto);
  }
}
