import { Injectable } from '@nestjs/common';
import { AdminReviewIngredientRepository } from './admin-review-ingredient.repository';
import { CreateAdminReviewIngredientDto } from './model/create-admin-review-ingredient.dto';
import { DeleteAdminReviewIngredientDto } from './model/delete-admin-review-ingredient.dto';
import { RuntimeException } from '@nestjs/core/errors/exceptions';

@Injectable()
export class AdminReviewIngredientService {
  constructor(private adminReviewIngredientRepository: AdminReviewIngredientRepository) {}

  /**
   * 리뷰 재료 삽입 프로세스
   * @param reviewId
   * @param reviewIngredientIdArr
   */
  async processDeleteInsert(reviewId: number, reviewIngredientIdArr: number[]) {
    await this.delete(reviewId);
    await this.insert(reviewId, reviewIngredientIdArr);
  }

  /* private 메서드 */

  /**
   * 리뷰 재료 배열 삽입
   * @param reviewId
   * @param reviewIngredientIdArr
   */
  private async insert(reviewId: number, reviewIngredientIdArr: number[]) {
    const createAdminReviewIngredientDtoArr = reviewIngredientIdArr.map((ingredientId) => new CreateAdminReviewIngredientDto(reviewId, ingredientId));
    const result = await this.adminReviewIngredientRepository.insert(createAdminReviewIngredientDtoArr);
    if (!result) throw new RuntimeException(`Failed to insert review ingredient(reviewId: ${reviewId})`);
  }

  /**
   * 리뷰 재료 삭제
   * @param reviewId
   */
  private async delete(reviewId: number) {
    const deleteAdminReview = new DeleteAdminReviewIngredientDto(reviewId);
    const result = await this.adminReviewIngredientRepository.deleteByReviewId(deleteAdminReview);
    if (!result) throw new RuntimeException(`Failed to delete review ingredient(reviewId: ${reviewId})`);
  }
}
