import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewCategoryDto } from './dto/review.category.dto';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}
  async findReviewCategoryList(reviewCategoryDto: ReviewCategoryDto) {
    try {
      return await this.reviewRepository.findReviewCategoryList(
        reviewCategoryDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
