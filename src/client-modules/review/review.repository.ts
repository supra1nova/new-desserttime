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

  /**
   * 리뷰 카테코리 날짜순 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
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

  /**
   * 리뷰 카테고리 좋아요 많은 순 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
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

  /**
   * 리뷰 좋아요 id 찾기
   * @param likeDto
   * @returns
   */
  async findLikeId(likeDto: LikeDto) {
    return await this.like.findOne({
      select: { likeId: true },
      where: {
        member: { memberId: likeDto.memberId },
        review: { reviewId: likeDto.reviewId },
      },
    });
  }

  /**
   * 리뷰 작성자 아이디 찾기
   * @param likeDto
   * @returns
   */
  async findMemberId(likeDto: LikeDto) {
    return await this.member.findOne({
      select: { memberId: true },
      where: { memberId: likeDto.memberId },
    });
  }

  /**
   * 리뷰 아이디 조회
   * @param likeDto
   * @returns
   */
  async findReviewId(likeDto: LikeDto) {
    return await this.review.findOne({
      select: { reviewId: true },
      where: { reviewId: likeDto.reviewId },
    });
  }

  /**
   * 리뷰 좋아요 기록 삭제
   * @param likeId
   */
  async deleteReviewLike(likeId: number) {
    await this.like.delete({ likeId });
  }

  /**
   * 리뷰 좋아요 기록 추가
   * @param likeDto
   */
  async insertReviewLike(likeDto: LikeDto) {
    await this.like.insert({
      member: { memberId: likeDto.memberId },
      review: { reviewId: likeDto.reviewId },
    });
  }

  /**
   * 리뷰 총 좋아요 수 증가
   * @param likeDto
   */
  async incrementTotalLikeNum(likeDto: LikeDto) {
    await this.review.increment(
      { reviewId: likeDto.reviewId },
      'totalLikedNum',
      1,
    );
  }

  /**
   * 리뷰 총 좋아요 수 감소
   * @param likeDto
   */
  async decrementTotalLikeNum(likeDto: LikeDto) {
    await this.review.decrement(
      { reviewId: likeDto.reviewId },
      'totalLikedNum',
      1,
    );
  }
}
