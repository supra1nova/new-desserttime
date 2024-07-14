import { Injectable } from '@nestjs/common';
import { ReviewService } from './review.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/config/entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewCategoryDto } from './dto/review.category.dto';

@Injectable()
export class ReviewRepository {
  constructor(@InjectRepository(Review) private review: Repository<Review>) {}

  async findReviewCategoryList(reviewCategoryDto: ReviewCategoryDto) {
    await this.review.find({
      select: {
        reviewId: true,
        totalLikedNum: true,
        menuName: true,
        content: true,
        storeName: true,
        score: true,
        createdDate: true,
        dessertCategory: { dessertCategoryId: true },
        member: {
          nickName: true,
          isHavingImg: true,
          img: { middlepath: true, path: true, extention: true },
        },
        reviewImg: {
          isMain: true,
          num: true,
          middlepath: true,
          path: true,
          extention: true,
        },
      },
      where: {
        isUsable: true,
        isUpdated: true,
        isInitalized: true,
        dessertCategory: {
          dessertCategoryId: reviewCategoryDto.dessertCategoryId,
        },
      },
      relations: ['member', 'reviewImg', 'dessertCategory'],
      order: { createdDate: 'DESC' },
    });
  }
}
