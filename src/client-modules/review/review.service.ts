import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { LikeDto } from './dto/like.dto';
import { MemberIdDto } from './dto/member.id.dto';
import { typeORMConfig } from 'src/config/typeorm/typeorm.config';
import { ReviewCreateDto } from './dto/review.create.dto';
import { ReviewIdDto } from './dto/review.id.dto';
import { ReviewUpdateDto } from './dto/review.update.dto';
import { ReviewImgSaveDto } from './dto/reviewimg.save.dto';
import * as path from 'path';
import { ReviewImgIdDto } from './dto/reviewimg.id.dto';
import { UpdateReviewImgListDto } from './dto/reviewimg.list.change.dto';
import { IngredientNameDto } from './dto/ingredient.name.dto';
import { Transactional } from 'typeorm-transactional';

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
      let result;
      if (reviewCategoryDto.selectedOrder === 'D') result = await this.reviewRepository.findReviewCategoryDateList(reviewCategoryDto);
      else if (reviewCategoryDto.selectedOrder === 'L') result = await this.reviewRepository.findReviewCategoryLikeList(reviewCategoryDto);
      console.log('result ::::::::::::', result);
      return result;
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
      const isMemberData = await this.reviewRepository.findMemberId(likeDto);
      const isReviewData = await this.reviewRepository.findReviewId(likeDto);

      if (isMemberData && isReviewData) {
        if (likeDto.isLike === false) {
          const isLikedData = await this.reviewRepository.findLikeId(likeDto);
          if (isLikedData) {
            await this.reviewRepository.deleteReviewLike(isLikedData.likeId);
            await this.reviewRepository.decrementTotalLikeNum(likeDto);
          }
        } else if (likeDto.isLike === true) {
          await this.reviewRepository.insertReviewLike(likeDto);
          await this.reviewRepository.incrementTotalLikeNum(likeDto);
        }
      } else {
        throw new BadRequestException('존재하지 않는 정보', {
          cause: new Error(),
          description: '입력하신 리뷰 혹은 회원이 존재하지 않습니다',
        });
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
   * 재료 하나 생성하기
   */
  async postIngredientList(ingredientNameDto: IngredientNameDto) {
    try {
      await this.reviewRepository.insertIngredientList(ingredientNameDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 재료 목록 조회
   * @returns
   */
  async getIngredientList() {
    try {
      return await this.reviewRepository.findIngredientList();
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
      const reviewData = await this.reviewRepository.findGenerableReview(reviewIdDto);
      const resultData = {};
      if (reviewData) {
        resultData['reviewId'] = reviewData.reviewId;
        resultData['content'] = reviewData.content;
        resultData['menuName'] = reviewData.menuName;
        resultData['storeName'] = reviewData.storeName;
        resultData['score'] = reviewData.score;
        resultData['dessertCategory'] = { dessertCategoryId: reviewData.dessertCategory.dessertCategoryId, dessertName: reviewData.dessertCategory.dessertName };

        if (reviewData.reviewImg.length > 0) {
          const reviewImg = reviewData.reviewImg.map((imgData) => {
            return {
              reviewImgId: imgData.reviewImgId,
              middlepath: imgData.middlepath,
              path: imgData.path,
              extention: imgData.extention,
              imgName: imgData.imgName,
              isMain: imgData.isMain,
              num: imgData.num,
            };
          });
          resultData['reviewImg'] = reviewImg;
        }

        if (reviewData.reviewIngredients.length > 0) {
          const reviewIngredients = reviewData.reviewIngredients.map((ingredientData) => {
            return {
              reviewIngredientId: ingredientData.reviewIngredientId,
              ingredientId: ingredientData.ingredient.ingredientId,
              ingredientName: ingredientData.ingredient.ingredientName,
            };
          });
          resultData['reviewIngredients'] = reviewIngredients;
        }
      }
      return resultData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기 작성 수정 및 작성완료
   * @param reviewUpdateDto
   * @returns
   */
  @Transactional()
  async patchGenerableReview(reviewUpdateDto: ReviewUpdateDto) {
    try {
      //1. 재료 삭제
      const ingredientList = await this.reviewRepository.findReviewIngredient(reviewUpdateDto);
      if (ingredientList.length > 0) await this.reviewRepository.deleteReviewIngredient(reviewUpdateDto);
      //2. 재료 저장
      if (reviewUpdateDto.ingredientId.length > 0) {
        const saveReviewIngre = reviewUpdateDto.ingredientId.map((data) => ({ ingredient: { ingredientId: data }, review: { reviewId: reviewUpdateDto.reviewId } }));
        await this.reviewRepository.insertReviewIngredient(saveReviewIngre);
      }
      //마지막. 리뷰 저장
      const updatedReview = await this.reviewRepository.updateGenerableReview(reviewUpdateDto);
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 리뷰 이미지 하나 저장
   * @param reviewImgSaveDto
   * @param file
   * @returns
   */
  @Transactional()
  async postReviewImg(reviewImgSaveDto: ReviewImgSaveDto, file) {
    try {
      const extention = path.extname(file.originalname); // 파일 확장자 추출
      const imgName = path.basename(file.originalname, extention); // 파일 이름
      const lastpath = file.originalname;
      const fileData = {
        imgName,
        extention,
        path: lastpath,
      };
      const savedData = await this.reviewRepository.insertReviewImg(reviewImgSaveDto, fileData);
      return { reviewImgId: savedData['raw']['reviewImgId'] };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 리뷰이미지 하나 삭제
   * @param reviewImgIdDto
   */
  @Transactional()
  async deleteReviewImg(reviewImgIdDto: ReviewImgIdDto) {
    try {
      await this.reviewRepository.deleteReviewImg(reviewImgIdDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 리뷰이미지 순서/메인 변경
   * @param updateReviewImgListDto
   */
  @Transactional()
  async updateReviewImg(updateReviewImgListDto: UpdateReviewImgListDto) {
    try {
      const entitiesToSave = [];
      for (const updateDto of updateReviewImgListDto.reviewImg) {
        const reviewImg = await this.reviewRepository.findReviewImgId(updateDto.reviewImgId);

        if (reviewImg) {
          // DTO 데이터를 엔티티에 매핑
          reviewImg.num = updateDto.num;
          reviewImg.isMain = updateDto.isMain;

          // 저장할 엔티티 목록에 추가
          entitiesToSave.push(reviewImg);
        }
      }
      await this.reviewRepository.saveReviewImg(entitiesToSave);
    } catch (error) {
      throw error;
    }
  }
}
