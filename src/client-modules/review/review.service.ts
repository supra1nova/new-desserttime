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
import { MemberIdPagingDto } from './dto/review.dto';
import { ReviewSaveDto } from './dto/review.save.dto';
import { ReviewMemberIdDto } from './dto/review.member.dto';

@Injectable()
export class ReviewService {
  constructor(private reviewRepository: ReviewRepository) {}

  /**
   * 리뷰 하나 조회
   * @param reviewIdDto
   * @returns
   */
  async findReviewOne(reviewMemberIdDto: ReviewMemberIdDto) {
    try {
      return await this.reviewRepository.findReviewOne(reviewMemberIdDto);
    } catch (error) {
      throw error;
    }
  }
  /**
   * 홈화면 리뷰이미지 목록 랜덤리스트
   * @param memberIdDto
   * @returns
   */
  @Transactional()
  async getHomeReviewImgList(memberIdDto: MemberIdDto) {
    try {
      // 사용자가 선호하는 카테고리의 2차 카테고리ID 목록 조회
      let memberInterestList = [];
      let randomReviewCount = 25;
      let reviewImgList = [];
      if (memberIdDto.memberId) memberInterestList = await this.reviewRepository.findMemberInterestList(memberIdDto);

      if (memberInterestList.length > 0) {
        const dessertCategoryList = memberInterestList.map((category) => category.dc_dessertCategoryId);

        if (dessertCategoryList.length > 0) {
          const usableCategoryList = await this.reviewRepository.findUsablecategoryList(dessertCategoryList);

          if (usableCategoryList && usableCategoryList.length > 0) {
            randomReviewCount -= usableCategoryList.length;

            // 사용 가능한 카테고리가 있을 경우
            const mainCategoryList = await Promise.all(
              usableCategoryList.map(async (category) => {
                const categoryReviewImgList = await this.reviewRepository.findReviewImgList(category['dc_dessertCategoryId']);
                return {
                  dessertCategoryId: category['dc_dessertCategoryId'],
                  dessertName: category['dc_dessertName'],
                  categoryReviewImgList,
                };
              }),
            );
            reviewImgList = reviewImgList.concat(mainCategoryList);
          }
        }
      }

      if (randomReviewCount > 0) {
        //사용가능한 카테고리가 없거나 25개보다 적은경우
        const randomCategoryList = await this.reviewRepository.findRandomCategoryList(randomReviewCount);
        console.log('randomCategoryList ::', randomCategoryList);

        const mainRandomCategoryList = await Promise.all(
          randomCategoryList.map(async (category) => {
            const randomCategoryReviewImgList = await this.reviewRepository.findRandomReviewImgList(category['dc_dessertCategoryId']);
            return {
              dessertCategoryId: category['dc_dessertCategoryId'],
              dessertName: category['dc_dessertName'],
              categoryReviewImgList: randomCategoryReviewImgList,
            };
          }),
        );
        reviewImgList = reviewImgList.concat(mainRandomCategoryList);
      }

      return reviewImgList;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 선택한 카테고리의 리뷰 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
  @Transactional()
  async findReviewCategoryList(reviewCategoryDto: ReviewCategoryDto) {
    try {
      let reviewCategoryList = await this.reviewRepository.findReviewCategoryList(reviewCategoryDto);
      const grouped = new Map();
      reviewCategoryList.items.forEach((review) => {
        if (!grouped.has(review.reviewId)) {
          // 처음 본 reviewId이면 새로운 그룹 생성
          grouped.set(review.reviewId, {
            reviewId: review.reviewId,
            totalLikedNum: review.totalLikedNum,
            menuName: review.menuName,
            content: review.content,
            storeName: review.storeName,
            score: review.score,
            createdDate: review.createdDate,
            dessertCategoryId: review.dessertCategoryId,
            memberNickName: review.memberNickName,
            memberIsHavingImg: review.memberIsHavingImg,
            isLiked: review.isLiked,
            reviewImg: [],
            profileImg: [],
          });
        }
        const currentReview = grouped.get(review.reviewId);

        // reviewImg 관련 데이터가 있을 때만 추가
        if (review.reviewImgPath) {
          currentReview.reviewImg.push({
            reviewImgIsMain: review.reviewImgIsMain,
            reviewImgNum: review.reviewImgNum,
            reviewImgMiddlepath: review.reviewImgMiddlepath,
            reviewImgPath: review.reviewImgPath,
            reviewImgExtention: review.reviewImgExtention,
          });
        }

        // profileImg 관련 데이터가 있을 때만 추가
        if (review.profileImgPath) {
          currentReview.profileImg.push({
            profileImgMiddlePath: review.profileImgMiddlePath,
            profileImgPath: review.profileImgPath,
            profileImgExtention: review.profileImgExtention,
          });
        }
      });

      // Map을 배열로 변환하여 반환
      return { items: Array.from(grouped.values()), hasNextPage: reviewCategoryList.hasNextPage, nextCursor: reviewCategoryList.nextCursor };
    } catch (error) {
      throw error;
    }
  }

  /**
   * 리뷰 좋아요/ 좋아요취소
   * @param likeDto
   */
  @Transactional()
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
  @Transactional()
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
  @Transactional()
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
  @Transactional()
  async getGenerableReviewList(memberIdPagingDto: MemberIdPagingDto) {
    try {
      //한달 넘은 후기는 삭제?
      return await this.reviewRepository.findGenerableReviewList(memberIdPagingDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기 작성 목록 등록
   * @param reviewCreateDto
   */
  @Transactional()
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
   * 리뷰 하나 완전 삭제
   * @param reviewIdDto
   * @returns
   */
  @Transactional()
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
  @Transactional()
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
  @Transactional()
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
  @Transactional()
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
        resultData['dessertCategory'] = { dessertCategoryId: reviewData.dessertCategory?.dessertCategoryId, dessertName: reviewData.dessertCategory?.dessertName };

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
   * 후기 하나 생성 및 수정
   * @param reviewUpdateDto
   * @returns
   */
  @Transactional()
  async postGenerableReview(reviewSaveDto: ReviewSaveDto) {
    try {
      const { content, status, menuName, score, storeName, reviewId, memberId, dessertCategoryId } = reviewSaveDto;

      if (dessertCategoryId && reviewId) {
        //1. 재료 삭제
        const ingredientList = await this.reviewRepository.findReviewIngredient(reviewSaveDto);
        if (ingredientList.length > 0) await this.reviewRepository.deleteReviewIngredient(reviewSaveDto);
        //2. 재료 저장
        if (reviewSaveDto.ingredientId.length > 0) {
          const saveReviewIngre = reviewSaveDto.ingredientId.map((data) => ({ ingredient: { ingredientId: data }, review: { reviewId: reviewSaveDto.reviewId } }));
          await this.reviewRepository.insertReviewIngredient(saveReviewIngre);
        }
      }
      //마지막. 리뷰 저장
      const review = await this.reviewRepository.updateGenerableReview(reviewSaveDto);
      return { reviewId: review.reviewId };
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
      let ingredientList = [];
      if (reviewUpdateDto.reviewId) {
        ingredientList = await this.reviewRepository.findReviewIngredient(reviewUpdateDto);
        //1. 재료 삭제
        if (ingredientList.length > 0) await this.reviewRepository.deleteReviewIngredient(reviewUpdateDto);
        //2. 재료 저장
        await this.saveIngredient(reviewUpdateDto);
      }

      //3. 리뷰 저장
      const newReview = await this.reviewRepository.updateGenerableReview(reviewUpdateDto);
      if (reviewUpdateDto.reviewId) {
        reviewUpdateDto.reviewId = newReview.reviewId;
        await this.saveIngredient(reviewUpdateDto);
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 재료 저장 로직
   * @param reviewUpdateDto
   */
  async saveIngredient(reviewUpdateDto: ReviewUpdateDto) {
    try {
      if (reviewUpdateDto.ingredientId.length > 0) {
        const saveReviewIngre = reviewUpdateDto.ingredientId.map((data) => ({
          ingredient: { ingredientId: data },
          review: { reviewId: reviewUpdateDto.reviewId },
        }));
        await this.reviewRepository.insertReviewIngredient(saveReviewIngre);
      }
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
      const reviewImgCount = await this.reviewRepository.counteReviewImg(reviewImgSaveDto);
      if (reviewImgCount >= 4) {
        throw new BadRequestException('이미지갯수 초과', {
          cause: new Error(),
          description: '등록가능한 최대 이미지는 4개입니다.',
        });
      }
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

  /**
   * 사용자가 좋아요한 리뷰목록 조회
   * @param memberIdPagingDto
   * @returns
   */
  @Transactional()
  async getLikedReviewList(memberIdPagingDto: MemberIdPagingDto) {
    try {
      const likedReviewList = await this.reviewRepository.findLikedReviewList(memberIdPagingDto);
      //return likedReviewList;
      const grouped = new Map();
      likedReviewList.items.forEach((review) => {
        if (!grouped.has(review.reviewId)) {
          // 처음 본 reviewId이면 새로운 그룹 생성
          grouped.set(review.reviewId, {
            reviewId: review.reviewId,
            totalLikedNum: review.totalLikedNum,
            menuName: review.menuName,
            content: review.content,
            storeName: review.storeName,
            score: review.score,
            createdDate: review.createdDate,
            dessertCategoryId: review.dessertCategoryId,
            memberNickName: review.memberNickName,
            memberIsHavingImg: review.memberIsHavingImg,
            isLiked: review.isLiked,
            reviewImg: [],
            profileImg: [],
          });
        }
        const currentReview = grouped.get(review.reviewId);

        // reviewImg 관련 데이터가 있을 때만 추가
        if (review.reviewImgPath) {
          currentReview.reviewImg.push({
            reviewImgIsMain: review.reviewImgIsMain,
            reviewImgNum: review.reviewImgNum,
            reviewImgMiddlepath: review.reviewImgMiddlepath,
            reviewImgPath: review.reviewImgPath,
            reviewImgExtention: review.reviewImgExtention,
          });
        }

        // profileImg 관련 데이터가 있을 때만 추가
        if (review.profileImgPath) {
          currentReview.profileImg.push({
            profileImgMiddlePath: review.profileImgMiddlePath,
            profileImgPath: review.profileImgPath,
            profileImgExtention: review.profileImgExtention,
          });
        }
      });

      // Map을 배열로 변환하여 반환
      return { items: Array.from(grouped.values()), hasNextPage: likedReviewList.hasNextPage, nextCursor: likedReviewList.nextCursor };
    } catch (error) {
      throw error;
    }
  }
}
