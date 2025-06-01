import { BadRequestException, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { SearchReviewByCategoryDto } from './dto/search-review-by-category.dto';
import { LikeDto } from './dto/like.dto';
import { GetRegistrableReviewListDto } from './dto/get-registrable-review-list.dto';
import { CreateRegistrableReviewDto } from './dto/create-registrable-review.dto';
import { GetRegistrableReviewDto } from './dto/get-registrable-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { CreateReviewImgDto } from './dto/create-review-img.dto';
import * as path from 'path';
import { DeleteReviewImgDto } from './dto/delete-review-img.dto';
import { UpdateReviewImgListDto } from './dto/update-review-img-list.dto';
import { SearchRegistrableReview } from './dto/search-registrable-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewDto } from './dto/get-review.dto';
import { AdminPointService } from 'src/backoffice-modules/admin-point/admin-point.service';
import { UpdateAdminPointDto } from 'src/backoffice-modules/admin-point/model/update-admin-point.dto';
import { PointType } from 'src/common/enum/point.enum';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class ReviewService {
  constructor(
    private reviewRepository: ReviewRepository,
    private adminPointService: AdminPointService,
  ) {}

  /**
   * 리뷰 하나 조회
   * @param getReviewDto
   * @returns
   */
  async getReview(getReviewDto: GetReviewDto) {
    const rawReviews = await this.reviewRepository.findReview(getReviewDto);

    return rawReviews.reduce((result, row) => {
      if (!result.reviewId) {
        Object.assign(result, {
          reviewId: row.reviewId,
          totalLikedNum: row.totalLikedNum,
          menuName: row.menuName,
          content: row.content,
          storeName: row.storeName,
          score: row.score,
          createDate: row.createDate,
          dessertCategoryId: row.dessertCategoryId,
          memberNickname: row.memberNickname,
          memberIsHavingImg: row.memberIsHavingImg,
          isLiked: row.isLiked,
          profileImgMiddlePath: row.profileImgMiddlePath || null,
          profileImgPath: row.profileImgPath || null,
          profileImgExtension: row.profileImgExtension || null,
          reviewImg: [],
          ingredients: [],
        });
      }
      if (row.ingredientName) {
        const isDuplicate = result.ingredients.some((ingredient) => ingredient === row.ingredientName);

        if (!isDuplicate) {
          result.ingredients.push(row.ingredientName);
        }
      }
      if (row.reviewImgPath) {
        const isDuplicate = result.reviewImg.some((img) => img.reviewImgNum === row.reviewImgNum && img.reviewImgPath === row.reviewImgPath);

        if (!isDuplicate) {
          result.reviewImg.push({
            reviewImgIsMain: row.reviewImgIsMain,
            reviewImgNum: row.reviewImgNum,
            reviewImgMiddlePath: row.reviewImgMiddlePath,
            reviewImgPath: row.reviewImgPath,
            reviewImgExtension: row.reviewImgExtension,
          });
        }
      }

      return result;
    }, {});
  }

  /**
   * 홈화면 리뷰이미지 목록 랜덤리스트
   * @param getRegistrableReviewListDto
   * @returns
   */
  @Transactional()
  async getReviewListWithImagePerCategory(getRegistrableReviewListDto: GetRegistrableReviewListDto) {
    // 사용자가 선호하는 카테고리의 2차 카테고리ID 목록 조회
    let memberInterestList = [];
    let randomReviewCount = 25;
    let reviewImgList = [];
    if (getRegistrableReviewListDto.memberId) memberInterestList = await this.reviewRepository.findMemberInterestList(getRegistrableReviewListDto);

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
  }

  /**
   * 선택한 카테고리의 리뷰 목록 조회
   * @param searchReviewByCategoryDto
   * @returns
   */
  @Transactional()
  async findReviewListByCategory(searchReviewByCategoryDto: SearchReviewByCategoryDto) {
    let reviewCategoryList = await this.reviewRepository.findReviewListByCategory(searchReviewByCategoryDto);
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
          createDate: review.createDate,
          dessertCategoryId: review.dessertCategoryId,
          memberNickname: review.memberNickname,
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
          reviewImgMiddlePath: review.reviewImgMiddlePath,
          reviewImgPath: review.reviewImgPath,
          reviewImgExtension: review.reviewImgExtension,
        });
      }

      // profileImg 관련 데이터가 있을 때만 추가
      if (review.profileImgPath) {
        currentReview.profileImg.push({
          profileImgMiddlePath: review.profileImgMiddlePath,
          profileImgPath: review.profileImgPath,
          profileImgExtension: review.profileImgExtension,
        });
      }
    });

    // Map을 배열로 변환하여 반환
    return { items: Array.from(grouped.values()), hasNextPage: reviewCategoryList.hasNextPage, nextCursor: reviewCategoryList.nextCursor };
  }

  /**
   * 리뷰 좋아요/ 좋아요취소
   * @param likeDto
   */
  @Transactional()
  async insertLike(likeDto: LikeDto) {
    const isMemberData = await this.reviewRepository.findMemberId(likeDto);
    const isReviewData = await this.reviewRepository.findReviewId(likeDto);

    if (!isMemberData || !isReviewData) {
      throw new BadRequestException('존재하지 않는 정보', {
        cause: new Error(),
        description: '입력하신 리뷰 혹은 회원이 존재하지 않습니다',
      });
    }

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
  }

  /**
   * 리뷰작성가능한 후기 갯수 조회
   * @param getRegistrableReviewListDto
   * @returns
   */
  @Transactional()
  async getRegistrableReviewCount(getRegistrableReviewListDto: GetRegistrableReviewListDto) {
    const generableReviewCount = await this.reviewRepository.findGenerableReviewCount(getRegistrableReviewListDto);
    return { generableReviewCount };
  }

  /**
   * 후기 작성 가능한 일수
   * @returns
   */
  @Transactional()
  async getRegistrableReviewDate() {
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
   * @param searchNotRegistrableReview
   * @returns
   */
  @Transactional()
  async getRegistrableReviewList(searchNotRegistrableReview: SearchRegistrableReview) {
    // todo: 한달 넘은 후기는 삭제?
    return await this.reviewRepository.findRegistrableReviewList(searchNotRegistrableReview);
  }

  /**
   * 후기 작성 목록 등록
   * @param createRegistrableReviewDto
   */
  @Transactional()
  async createRegistrableReviewList(createRegistrableReviewDto: CreateRegistrableReviewDto) {
    const insertData = createRegistrableReviewDto.menuNames.map((menuName) => ({
      storeName: createRegistrableReviewDto.storeName,
      member: { memberId: createRegistrableReviewDto.memberId },
      menuName,
    }));

    await this.reviewRepository.insertGenerableReviewList(insertData);
  }

  /**
   * 리뷰 하나 완전 삭제
   * @param getRegistrableReviewDto
   * @returns
   */
  @Transactional()
  async deleteRegistrableReview(getRegistrableReviewDto: GetRegistrableReviewDto) {
    return await this.reviewRepository.deleteGenerableReview(getRegistrableReviewDto);
  }

  /**
   * 재료 목록 조회
   * @returns
   */
  @Transactional()
  async getIngredientList() {
    return await this.reviewRepository.findIngredientList();
  }
  /**
   * 작성 가능한 후기 하나 조회
   * @param getRegistrableReviewDto
   * @returns
   */
  @Transactional()
  async getRegistrableReview(getRegistrableReviewDto: GetRegistrableReviewDto) {
    const reviewData = await this.reviewRepository.findGenerableReview(getRegistrableReviewDto);
    const resultData = {};
    if (reviewData) {
      resultData['reviewId'] = reviewData.reviewId;
      resultData['content'] = reviewData.content;
      resultData['menuName'] = reviewData.menuName;
      resultData['storeName'] = reviewData.storeName;
      resultData['score'] = reviewData.score;
      resultData['dessertCategory'] = { dessertCategoryId: reviewData.dessertCategory?.dessertCategoryId, dessertName: reviewData.dessertCategory?.dessertName };

      if (reviewData.reviewImgs.length > 0) {
        const reviewImgs = reviewData.reviewImgs.map((imgData) => {
          return {
            reviewImgId: imgData.reviewImgId,
            middlePath: imgData.middlePath,
            path: imgData.path,
            extension: imgData.extension,
            imgName: imgData.imgName,
            isMain: imgData.isMain,
            num: imgData.num,
          };
        });
        resultData['reviewImgs'] = reviewImgs;
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
  }

  /**
   * 후기 하나 생성 및 수정
   * @param reviewSaveDto
   * @returns
   */
  @Transactional()
  async createRegistrableReview(reviewSaveDto: CreateReviewDto) {
    const { content, status, menuName, score, storeName, reviewId, memberId, dessertCategoryId } = reviewSaveDto;

    if (dessertCategoryId && reviewId) {
      //1. 재료 삭제
      const ingredientList = await this.reviewRepository.findReviewIngredient(reviewSaveDto);
      if (ingredientList.length > 0) await this.reviewRepository.deleteReviewIngredient(reviewSaveDto);
      //2. 재료 저장
      if (reviewSaveDto.ingredientId.length > 0) {
        const saveReviewIngredient = reviewSaveDto.ingredientId.map((data) => ({ ingredient: { ingredientId: data }, review: { reviewId: reviewSaveDto.reviewId } }));
        await this.reviewRepository.insertReviewIngredient(saveReviewIngredient);
      }
    }
    //마지막. 리뷰 저장
    const review = await this.reviewRepository.updateGenerableReview(reviewSaveDto);
    return { reviewId: review.reviewId };
  }

  /**
   * 후기 작성 수정 및 작성완료
   * @param updateReviewDto
   * @returns
   */
  @Transactional()
  async updateRegistrableReview(updateReviewDto: UpdateReviewDto) {
    let ingredientList = [];
    if (updateReviewDto.reviewId) {
      ingredientList = await this.reviewRepository.findReviewIngredient(updateReviewDto);
      //1. 재료 삭제
      if (ingredientList.length > 0) await this.reviewRepository.deleteReviewIngredient(updateReviewDto);
      //2. 재료 저장
      await this.saveIngredient(updateReviewDto);
    }

    //3. 리뷰 저장
    const newReview = await this.reviewRepository.updateGenerableReview(updateReviewDto);
    if (!updateReviewDto.reviewId) {
      updateReviewDto.reviewId = newReview.reviewId;
      await this.saveIngredient(updateReviewDto);
    }
    const updateAdminPointDto = new UpdateAdminPointDto(5, PointType.REVIEW);
    await this.adminPointService.processInsertUpdatePoint('save', updateReviewDto.memberId, updateAdminPointDto, updateReviewDto.reviewId);
    return;
  }

  /**
   * 재료 저장 로직
   * @param updateReviewDto
   */
  async saveIngredient(updateReviewDto: UpdateReviewDto) {
    if (updateReviewDto.ingredientId.length < 1) {
      throw new BadRequestException('존재하지 않는 리뷰', {
        cause: new Error(),
        description: '입력하신 리뷰 아이디가 존재하지 않습니다',
      });
    }

    const saveReviewIngre = updateReviewDto.ingredientId.map((data) => ({
      ingredient: { ingredientId: data },
      review: { reviewId: updateReviewDto.reviewId },
    }));

    await this.reviewRepository.insertReviewIngredient(saveReviewIngre);
  }

  /**
   * 리뷰 이미지 하나 저장
   * @param createReviewImgDto
   * @param file
   * @returns
   */
  @Transactional()
  async createReviewImg(createReviewImgDto: CreateReviewImgDto, file: Express.Multer.File) {
    const reviewImgCount = await this.reviewRepository.countReviewImg(createReviewImgDto);
    if (reviewImgCount >= 4) {
      throw new BadRequestException('이미지갯수 초과', {
        cause: new Error(),
        description: '등록가능한 최대 이미지는 4개입니다.',
      });
    }

    const extension = path.extname(file.originalname); // 파일 확장자 추출
    const imgName = path.basename(file.originalname, extension); // 파일 이름
    const lastPath = file.filename;
    const fileData = {
      imgName,
      extension,
      path: lastPath,
    };

    const savedData = await this.reviewRepository.insertReviewImg(createReviewImgDto, fileData);

    return { reviewImgId: savedData['raw']['reviewImgId'] };
  }

  /**
   * 리뷰이미지 하나 삭제
   * @param reviewImgIdDto
   */
  @Transactional()
  async deleteReviewImg(reviewImgIdDto: DeleteReviewImgDto) {
    await this.reviewRepository.deleteReviewImg(reviewImgIdDto);
  }

  /**
   * 리뷰이미지 순서/메인 변경
   * @param updateReviewImgListDto
   */
  @Transactional()
  async updateReviewImg(updateReviewImgListDto: UpdateReviewImgListDto) {
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
  }

  /**
   * 사용자가 좋아요한 리뷰목록 조회
   * @param memberIdPagingDto
   * @returns
   */
  @Transactional()
  async getLikedReviewList(memberIdPagingDto: SearchRegistrableReview) {
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
          createDate: review.createDate,
          dessertCategoryId: review.dessertCategoryId,
          memberNickname: review.memberNickname,
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
          reviewImgMiddlePath: review.reviewImgMiddlePath,
          reviewImgPath: review.reviewImgPath,
          reviewImgExtension: review.reviewImgExtension,
        });
      }

      // profileImg 관련 데이터가 있을 때만 추가
      if (review.profileImgPath) {
        currentReview.profileImg.push({
          profileImgMiddlePath: review.profileImgMiddlePath,
          profileImgPath: review.profileImgPath,
          profileImgExtension: review.profileImgExtension,
        });
      }
    });

    // Map을 배열로 변환하여 반환
    return { items: Array.from(grouped.values()), hasNextPage: likedReviewList.hasNextPage, nextCursor: likedReviewList.nextCursor };
  }
}
