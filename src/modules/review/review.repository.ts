import { Injectable } from '@nestjs/common';
import { ReviewService } from './review.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/config/entities/review.entity';
import { Repository } from 'typeorm';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { LikeDto } from './dto/like.dto';
import { Like } from 'src/config/entities/like.entity';
import { Member } from 'src/config/entities/member.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review) private review: Repository<Review>,
    @InjectRepository(Like) private like: Repository<Like>,
    @InjectRepository(Member) private member: Repository<Member>,
  ) {}

  async findReviewCategoryDateList(reviewCategoryDto: ReviewCategoryDto) {
    return await this.review.find({
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

  async findReviewCategoryLikeList(reviewCategoryDto: ReviewCategoryDto) {
    return await this.review.find({
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
      order: { totalLikedNum: 'DESC' },
    });
  }

  async findLikeId(likeDto: LikeDto) {
    return await this.like.findOne({
      select: { likeId: true },
      where: {
        member: { memberId: likeDto.memberId },
        review: { reviewId: likeDto.reviewId },
      },
    });
  }

  async findMemberId(likeDto: LikeDto) {
    return await this.member.findOne({
      select: { memberId: true },
      where: { memberId: likeDto.memberId },
    });
  }

  async findReviewId(likeDto: LikeDto) {
    return await this.review.findOne({
      select: { reviewId: true },
      where: { reviewId: likeDto.reviewId },
    });
  }

  async deleteReviewLike(likeId: number) {
    await this.like.delete({ likeId });
  }

  async insertReviewLike(likeDto: LikeDto) {
    await this.like.insert({
      member: { memberId: likeDto.memberId },
      review: { reviewId: likeDto.reviewId },
    });
  }
}
