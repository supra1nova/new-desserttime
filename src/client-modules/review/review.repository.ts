import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/config/entities/review.entity';
import { In, Repository } from 'typeorm';
import { ReviewCategoryDto } from './dto/review.category.dto';
import { LikeDto } from './dto/like.dto';
import { Like } from 'src/config/entities/like.entity';
import { Member } from 'src/config/entities/member.entity';
import { ProfileImg } from 'src/config/entities/profile.img.entity';
import { ReviewImg } from 'src/config/entities/review.img.entity';
import { DessertCategory } from 'src/config/entities/dessert.category.entity';
import { MemberIdDto } from './dto/member.id.dto';
import { ReviewIdDto } from './dto/review.id.dto';
import { ReviewUpdateDto } from './dto/review.update.dto';
import { ReviewIngredient } from 'src/config/entities/review.ingredient.entity';
import { ReviewImgSaveDto } from './dto/reviewimg.save.dto';
import { ReviewImgIdDto } from './dto/reviewimg.id.dto';
import { Ingredient } from 'src/config/entities/ingredient.entity';
import { IngredientNameDto } from './dto/ingredient.name.dto';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review) private review: Repository<Review>,
    @InjectRepository(Like) private like: Repository<Like>,
    @InjectRepository(Member) private member: Repository<Member>,
    @InjectRepository(Ingredient) private ingredient: Repository<Ingredient>,
    @InjectRepository(ReviewIngredient) private reviewIngredient: Repository<ReviewIngredient>,
    @InjectRepository(ReviewImg) private reviewImg: Repository<ReviewImg>,
  ) {}

  /**
   * 리뷰 카테코리 날짜순 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
  async findReviewCategoryDateList(reviewCategoryDto: ReviewCategoryDto) {
    return await this.review
      .createQueryBuilder('review')
      .select([
        'review.reviewId AS "reviewId"',
        'review.totalLikedNum AS "totalLikedNum"',
        'review.menuName AS "menuName"',
        'review.content AS "content"',
        'review.storeName AS "storeName"',
        'review.score AS "score"',
        'review.createdDate AS "createdDate"',
        'dessertCategory.dessertCategoryId AS "dessertCategoryId"',
        'member.nickName AS "memberNickName"',
        'member.isHavingImg AS "memberIsHavingImg"',
        //'memberImg.middlepath AS memberImgMiddlepath',
        //'memberImg.path AS memberImgPath',
        //'memberImg.extention AS memberImgExtention',
        'reviewImg.isMain AS "reviewImgIsMain"',
        'reviewImg.num AS "reviewImgNum"',
        'reviewImg.middlepath AS "reviewImgMiddlepath"',
        'reviewImg.path AS "reviewImgPath"',
        'reviewImg.extention AS "reviewImgExtention"',
        'CASE WHEN like.memberMemberId = :memberId THEN 1 ELSE 0 END AS "isLiked"',
      ])
      .leftJoin(DessertCategory, 'dessertCategory', 'dessertCategory.dessertCategoryId = review.dessertCategoryDessertCategoryId')
      .leftJoin(Member, 'member', 'member.memberId = review.memberMemberId')
      //.leftJoin(ProfileImg, 'memberImg', 'memberImg.profileImgId = member.profileImgId')
      .leftJoin(ReviewImg, 'reviewImg', 'reviewImg.reviewImgReviewId = review.reviewId')
      .leftJoin(Like, 'like', 'like.reviewReviewId = review.reviewId')
      .where('review.isUsable = :isUsable', { isUsable: true })
      .andWhere('review.isUpdated = :isUpdated', { isUpdated: true })
      .andWhere('review.isInitalized = :isInitalized', { isInitalized: true })
      .andWhere('dessertCategory.dessertCategoryId = :dessertCategoryId', {
        dessertCategoryId: reviewCategoryDto.dessertCategoryId,
      })
      .setParameter('memberId', reviewCategoryDto.memberId)
      .orderBy('review.createdDate', 'DESC')
      .getRawMany();
  }

  /**
   * 리뷰 카테고리 좋아요 많은 순 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
  async findReviewCategoryLikeList(reviewCategoryDto: ReviewCategoryDto) {
    return await this.review
      .createQueryBuilder('review')
      .select([
        'review.reviewId AS reviewId',
        'review.totalLikedNum AS totalLikedNum',
        'review.menuName AS menuName',
        'review.content AS content',
        'review.storeName AS storeName',
        'review.score AS score',
        'review.createdDate AS createdDate',
        'dessertCategory.dessertCategoryId AS dessertCategoryId',
        'member.nickName AS memberNickName',
        'member.isHavingImg AS memberIsHavingImg',
        'memberImg.middlepath AS memberImgMiddlepath',
        'memberImg.path AS memberImgPath',
        'memberImg.extention AS memberImgExtention',
        'reviewImg.isMain AS reviewImgIsMain',
        'reviewImg.num AS reviewImgNum',
        'reviewImg.middlepath AS reviewImgMiddlepath',
        'reviewImg.path AS reviewImgPath',
        'reviewImg.extention AS reviewImgExtention',
        'CASE WHEN like.memberMemberId = :memberId THEN 1 ELSE 0 END AS isLiked',
      ])
      .leftJoin(DessertCategory, 'dessertCategory', 'dessertCategory.dessertCategoryId = review.dessertCategoryDessertCategoryId')
      .leftJoin(Member, 'member', 'member.memberId = review.memberMemberId')
      .leftJoin(ProfileImg, 'memberImg', 'member.memberId = memberImg.memberImgId')
      .leftJoin(ReviewImg, 'reviewImg', 'reviewImg.reviewImgReviewId = review.reviewId')
      .leftJoin(Like, 'like', 'like.reviewReviewId = review.reviewId')
      .where('review.isUsable = :isUsable', { isUsable: true })
      .andWhere('review.isUpdated = :isUpdated', { isUpdated: true })
      .andWhere('review.isInitalized = :isInitalized', { isInitalized: true })
      .andWhere('dessertCategory.dessertCategoryId = :dessertCategoryId', {
        dessertCategoryId: reviewCategoryDto.dessertCategoryId,
      })
      .setParameter('memberId', reviewCategoryDto.memberId)
      .orderBy('review.totalLikedNum', 'DESC')
      .getRawMany();
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
    await this.review.increment({ reviewId: likeDto.reviewId }, 'totalLikedNum', 1);
  }

  /**
   * 리뷰 총 좋아요 수 감소
   * @param likeDto
   */
  async decrementTotalLikeNum(likeDto: LikeDto) {
    await this.review.decrement({ reviewId: likeDto.reviewId }, 'totalLikedNum', 1);
  }

  /**
   * 후기작성가능한 후기 갯수
   * @param memberIdDto
   */
  async findGenerableReviewCount(memberIdDto: MemberIdDto) {
    return await this.review.count({
      where: { isUsable: true, isUpdated: false, member: { memberId: memberIdDto.memberId } },
    });
  }

  /**
   * 후기작성가능한 후기 목록조회
   * @param memberIdDto
   * @returns
   */
  async findGenerableReviewList(memberIdDto: MemberIdDto) {
    return await this.review.find({
      select: { reviewId: true, menuName: true, storeName: true, isInitalized: true },
      where: { isUsable: true, isUpdated: false, member: { memberId: memberIdDto.memberId } },
      order: { createdDate: 'ASC', menuName: 'ASC' },
    });
  }

  /**
   * 후기 작성리스트 등록
   * @param insertData
   * @returns
   */
  async insertGenerableReviewList(insertData) {
    return await this.review.save(insertData);
  }

  /**
   * 작성가능한 후기 하나 삭제
   * @returns
   */
  async deleteGenerableReview(reviewIdDto: ReviewIdDto) {
    return await this.review.delete(reviewIdDto);
  }

  /**
   * 재료 하나 생성
   * @param ingredientNameDto
   */
  async insertIngredientList(ingredientNameDto: IngredientNameDto) {
    await this.ingredient.insert({
      ingredientName: ingredientNameDto.ingredientName,
    });
  }
  /**
   * 재료 목록 조회
   * @returns
   */
  async findIngredientList() {
    return await this.ingredient.find({ select: { ingredientId: true, ingredientName: true }, where: { usable: true }, order: { ingredientId: 'ASC' } });
  }
  /**
   * 작성 가능한 후기 하나 조회
   * @param reviewIdDto
   * @returns
   */
  async findGenerableReview(reviewIdDto: ReviewIdDto) {
    return await this.review
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.dessertCategory', 'dessertCategory')
      .leftJoinAndSelect('review.reviewImg', 'reviewImg')
      .leftJoinAndSelect('review.reviewIngredients', 'reviewIngredient')
      .leftJoinAndSelect('reviewIngredient.ingredient', 'ingredient')
      .where('review.reviewId = :reviewId', { reviewId: reviewIdDto.reviewId })
      .andWhere('review.isUpdated = :isUpdated', { isUpdated: false })
      .andWhere('review.isUsable = :isUsable', { isUsable: true })
      .getOne();
  }

  /**
   * 기존 리뷰에 선택된 재료가 있는지 확인
   * @param reviewUpdateDto
   */
  async findReviewIngredient(reviewUpdateDto: ReviewUpdateDto) {
    return await this.reviewIngredient.find({ where: { review: { reviewId: reviewUpdateDto.reviewId } } });
  }

  /**
   * 기존 리뷰에 선택된 재료 삭제
   * @param reviewUpdateDto
   */
  async deleteReviewIngredient(reviewUpdateDto: ReviewUpdateDto) {
    await this.reviewIngredient.delete({ review: { reviewId: reviewUpdateDto.reviewId } });
  }

  /**
   * 리뷰에 선택된 재료 추가
   * @param saveReviewIngre
   */
  async insertReviewIngredient(saveReviewIngre) {
    await this.reviewIngredient.save(saveReviewIngre);
  }

  /**
   * 후기 작성 내용 수정/ 작성 완료
   * @param reviewUpdateDto
   * @returns
   */
  async updateGenerableReview(reviewUpdateDto: ReviewUpdateDto) {
    const saveReview = new Review();
    saveReview.content = reviewUpdateDto.content;
    saveReview.isInitalized = true;
    saveReview.isSaved = reviewUpdateDto.isSaved;
    saveReview.menuName = reviewUpdateDto.menuName;
    saveReview.score = reviewUpdateDto.score;
    saveReview.storeName = reviewUpdateDto.storeName;
    saveReview.reviewId = reviewUpdateDto.reviewId;

    const member = new Member();
    member.memberId = reviewUpdateDto.memberId;
    saveReview.member = member;

    const dessertCategory = new DessertCategory();
    dessertCategory.dessertCategoryId = reviewUpdateDto.dessertCategoryId;
    saveReview.dessertCategory = dessertCategory;

    return await this.review.save(saveReview);
  }

  /**
   * 리뷰 이미지 파일 하나 저장
   * @param reviewImgSaveDto
   * @param file
   */
  async insertReviewImg(reviewImgSaveDto: ReviewImgSaveDto, file) {
    return await this.reviewImg.insert({
      middlepath: 'reviewImg', //process.env.REVIEW_IMG_MIDDLE_PATH,
      path: file.path,
      extention: file.extention,
      imgName: file.imgName,
      isMain: reviewImgSaveDto.isMain,
      num: reviewImgSaveDto.reviewId,
      reviewImg: { reviewId: reviewImgSaveDto.reviewId },
    });
  }

  /**
   * 리뷰이미지 하나 삭제
   * @param reviewImgIdDto
   */
  async deleteReviewImg(reviewImgIdDto: ReviewImgIdDto) {
    await this.reviewImg.delete(reviewImgIdDto);
  }

  async findReviewImgId(reviewImgId) {
    return await this.reviewImg.findOne({
      where: { reviewImgId },
    });
  }

  /**
   * 리뷰이미지 순서/메인 변경
   * @param reviewImgChangeDto
   */
  async saveReviewImg(entitiesToSave) {
    await this.reviewImg.save(entitiesToSave);
  }
}
