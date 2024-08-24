import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { LikeDto } from './dto/like.dto';
import { MemberIdDto } from './dto/member.id.dto';
import { typeORMConfig } from 'src/config/typeorm/typeorm.config';
import { ReviewCreateDto } from './dto/review.create.dto';
import { ReviewIdDto } from './dto/review.id.dto';
import { ReviewUpdateDto } from './dto/review.update.dto';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  /**
   * 선택한 카테고리의 리뷰 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
  async findReviewCategoryList(reviewCategoryDto: ReviewCategoryDto) {
    try {
      if (reviewCategoryDto.selectedOrder === 'D') return await this.reviewRepository.findReviewCategoryDateList(reviewCategoryDto);
      else if (reviewCategoryDto.selectedOrder === 'L') return await this.reviewRepository.findReviewCategoryLikeList(reviewCategoryDto);
    } catch (error) {
      throw error;
    }
  }
  /**
   * 리뷰 좋아요/ 좋아요취소
   * @param likeDto
   */
  async postLikeItem(likeDto: LikeDto) {
    try {
      if (likeDto.isLike === false) {
        const isLikedData = await this.reviewRepository.findLikeId(likeDto);
        if (isLikedData) {
          await this.reviewRepository.deleteReviewLike(isLikedData.likeId);
          await this.reviewRepository.decrementTotalLikeNum(likeDto);
        }
      } else if (likeDto.isLike === true) {
        const isMemberData = await this.reviewRepository.findMemberId(likeDto);
        const isReviewData = await this.reviewRepository.findReviewId(likeDto);

        if (isMemberData && isReviewData) {
          await this.reviewRepository.insertReviewLike(likeDto);
          await this.reviewRepository.incrementTotalLikeNum(likeDto);
        }
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * 리뷰작성가능한 후기 갯수 조회
   * @param memberIdDto
   * @returns
   */
  async getGenerableReviewCount(memberIdDto: MemberIdDto) {
    try {
      const generableReviewCount = await this.reviewRepository.findGenerableReviewCount(memberIdDto);
      return { generableReviewCount };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기 작성 가능한 일수
   * @param memberIdDto
   * @returns
   */
  async getGenerableReviewDate() {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
      const currentDay = today.getDate();
      // 남은 일수 계산
      const remainingDays = lastDayOfMonth - currentDay;

      return { remainingDays };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기작성 가능한 후기목록 조회
   * @param memberIdDto
   * @returns
   */
  async getGenerableReviewList(memberIdDto: MemberIdDto) {
    try {
      return await this.reviewRepository.findGenerableReviewList(memberIdDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기 작성 목록 등록
   * @param reviewCreateDto
   */
  async postGenerableReviewList(reviewCreateDto: ReviewCreateDto) {
    try {
      const insertData = reviewCreateDto.menuNames.map((menuName) => ({
        storeName: reviewCreateDto.storeName,
        member: { memberId: reviewCreateDto.memberId },
        menuName,
      }));
      await this.reviewRepository.insertGenerableReviewList(insertData);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 작성가능한 리뷰 하나 삭제
   * @param reviewIdDto
   * @returns
   */
  async deleteGenerableReview(reviewIdDto: ReviewIdDto) {
    try {
      return await this.reviewRepository.deleteGenerableReview(reviewIdDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 작성 가능한 후기 하나 조회
   * @param reviewIdDto
   * @returns
   */
  async getGenerableReview(reviewIdDto: ReviewIdDto) {
    try {
      const result = await this.reviewRepository.findGenerableReview(reviewIdDto);
      console.log('result ::::::::::::;', result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기 작성 수정 및 작성완료
   * @param reviewUpdateDto
   * @returns
   */
  async patchGenerableReview(reviewUpdateDto: ReviewUpdateDto) {
    try {
      //1. 재료 삭제
      const ingredientList = await this.reviewRepository.findReviewIngredient(reviewUpdateDto);
      if (ingredientList.length > 0) await this.reviewRepository.deleteReviewIngredient(reviewUpdateDto);
      //2. 재료 저장
      if (reviewUpdateDto.ingredientId.length > 0) {
        const saveReviewIngre = reviewUpdateDto.ingredientId.map((data) => ({ ingredientId: data, reviewId: reviewUpdateDto.reviewId }));
        await this.reviewRepository.insertReviewIngredient(saveReviewIngre);
      }
      //마지막. 리뷰 저장
      const updatedReview = await this.reviewRepository.updateGenerableReview(reviewUpdateDto);
      return;
    } catch (error) {
      throw error;
    }
  }
}
