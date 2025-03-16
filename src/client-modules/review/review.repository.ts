import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from 'src/config/entities/review.entity';
import { In, LessThan, Repository } from 'typeorm';
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
import { ReviewStatus } from 'src/common/enum/review.enum';
import { ResponseCursorPagination } from 'src/common/pagination/response.cursor.pagination';
import { MemberIdPagingDto } from './dto/review.dto';
import { ReviewMemberIdDto } from './dto/review.member.dto';

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

  async findReviewOne(reviewMemberIdDto: ReviewMemberIdDto) {
    const memberId = reviewMemberIdDto.memberId > 0 ? reviewMemberIdDto.memberId : 0;
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
        'profileImg.middlePath AS profileImgMiddlePath',
        'profileImg.path AS profileImgPath',
        'profileImg.extension AS profileImgExtention',
        'reviewImg.isMain AS "reviewImgIsMain"',
        'reviewImg.num AS "reviewImgNum"',
        'reviewImg.middlepath AS "reviewImgMiddlepath"',
        'reviewImg.path AS "reviewImgPath"',
        'reviewImg.extention AS "reviewImgExtention"',
        'ingredient.ingredientName AS "ingredientName"',
        'CASE WHEN like.memberMemberId = :memberId THEN 1 ELSE 0 END AS "isLiked"',
      ])
      .leftJoin(DessertCategory, 'dessertCategory', 'dessertCategory.dessertCategoryId = review.dessertCategoryDessertCategoryId')
      .leftJoin(Member, 'member', 'member.memberId = review.memberMemberId')
      .leftJoin(ProfileImg, 'profileImg', 'profileImg.memberMemberId = member.memberId')
      .leftJoin(ReviewImg, 'reviewImg', 'reviewImg.reviewImgReviewId = review.reviewId')
      .leftJoin(Like, 'like', 'like.reviewReviewId = review.reviewId')
      .leftJoin(ReviewIngredient, 'reviewIngredient', 'reviewIngredient.reviewReviewId = review.reviewId') // 수정됨
      .leftJoin(Ingredient, 'ingredient', 'ingredient.ingredientId = reviewIngredient.ingredientIngredientId') // 수정됨
      .where('review.isUsable = :isUsable', { isUsable: true })
      .andWhere('review.status = :status', { status: ReviewStatus.SAVED })
      .andWhere('review.reviewId = :reviewId', { reviewId: reviewMemberIdDto.reviewId })
      .setParameter('memberId', memberId)
      .getRawMany();
  }

  /**
   * 사용자가 선택한 카테고리의 2차 목록 조회
   * @param memberIdDto
   * @returns
   */
  async findMemberInterestList(memberIdDto: MemberIdDto) {
    return await this.member
      .createQueryBuilder('member')
      .leftJoin('member.uids', 'uids')
      .leftJoin(DessertCategory, 'dc', 'dc.parentDCId = uids.dcDessertCategoryId')
      .select('dc.dessertCategoryId')
      .where('dc.sessionNum = :sessionNum', { sessionNum: 2 })
      .andWhere('member.memberId =:memberId', { memberId: memberIdDto.memberId })
      .getRawMany();
  }

  /**
   * 사용자가 고른 카테고리중에 리뷰 수가 5개 이상인 디저트카테고리 조회.
   * 리뷰갯수가 많은 순으로 총 25개만 조회
   * @param dessertCategoryId
   * @returns
   */
  async findUsablecategoryList(dessertCategoryId) {
    return await this.review
      .createQueryBuilder('review')
      .leftJoin(DessertCategory, 'dc', 'review.dessertCategoryDessertCategoryId = dc.dessertCategoryId')
      .andWhere({ status: ReviewStatus.SAVED })
      .andWhere({ isUsable: true })
      .andWhere('dc.dessertCategoryId IN (:...dessertCategoryId)', { dessertCategoryId })
      .groupBy('dc.dessertCategoryId, dc.dessertName')
      .having('COUNT(review.reviewId) >= :minReviewCount', { minReviewCount: 5 })
      .orderBy('COUNT(review.reviewId)', 'DESC')
      .select(['dc.dessertCategoryId', 'dc.dessertName'])
      .limit(25)
      .getMany();
  }

  /**
   * 각 카테고리별 리뷰이미지 10개씩 조회
   * @param dessertCategoryId
   * @returns
   */
  async findReviewImgList(dessertCategoryId) {
    return await this.review
      .createQueryBuilder('review')
      .leftJoin(DessertCategory, 'dc', 'review.dessertCategoryDessertCategoryId = dc.dessertCategoryId')
      .leftJoin(ReviewImg, 'reviewImg', 'review.reviewId = reviewImg.reviewImgReviewId')
      .where('review.dessertCategoryDessertCategoryId=:dessertCategoryId', { dessertCategoryId })
      .andWhere('reviewImg.isMain=:isMain', { isMain: true })
      .select('review.reviewId', 'reviewId')
      .addSelect('reviewImg.middlepath', 'middlepath')
      .addSelect('reviewImg.path', 'path')
      .addSelect('reviewImg.extention', 'extention')
      .addSelect('reviewImg.imgName', 'imgName')
      .orderBy('review.createdDate', 'DESC')
      .limit(10)
      .getRawMany();
  }

  /**
   * 사용자가 선택하지 않은 카테고리 중에서
   * 리뷰수가 많은 2차 카테고리 목록 조회
   * @param limitnum
   * @returns
   */
  async findRandomCategoryList(limitnum: number) {
    return await this.review
      .createQueryBuilder('review')
      .leftJoin(DessertCategory, 'dc', 'review.dessertCategoryDessertCategoryId = dc.dessertCategoryId')
      .andWhere({ status: ReviewStatus.SAVED })
      .andWhere({ isUsable: true })
      .andWhere('dc.sessionNum = :sessionNum', { sessionNum: 2 })
      .groupBy('dc.dessertCategoryId, dc.dessertName')
      .orderBy('COUNT(review.reviewId)', 'DESC')
      .select(['dc.dessertCategoryId', 'dc.dessertName'])
      .limit(limitnum)
      .getRawMany();
  }

  /**
   * 사용자가 선택하지 않은 카테고리의
   * 리뷰이미지 리스트 조회
   * @param dessertCategoryId
   * @returns
   */
  async findRandomReviewImgList(dessertCategoryId) {
    return await this.review
      .createQueryBuilder('review')
      .leftJoin(DessertCategory, 'dc', 'review.dessertCategoryDessertCategoryId = dc.dessertCategoryId')
      .leftJoin(ReviewImg, 'reviewImg', 'review.reviewId = reviewImg.reviewImgReviewId')
      .where('review.dessertCategoryDessertCategoryId=:dessertCategoryId', { dessertCategoryId })
      .andWhere('reviewImg.isMain=:isMain', { isMain: true })
      .select('review.reviewId', 'reviewId')
      .addSelect('reviewImg.middlepath', 'middlepath')
      .addSelect('reviewImg.path', 'path')
      .addSelect('reviewImg.extention', 'extention')
      .addSelect('reviewImg.imgName', 'imgName')
      .orderBy('review.createdDate', 'DESC')
      .limit(10)
      .getRawMany();
  }

  /**
   * 리뷰 카테코리 날짜순 목록 조회
   * @param reviewCategoryDto
   * @returns
   */
  async findReviewCategoryList(reviewCategoryDto: ReviewCategoryDto) {
    const { cursor, limit } = reviewCategoryDto;

    let orderField;
    reviewCategoryDto.selectedOrder === 'D' ? (orderField = 'createdDate') : (orderField = 'totalLikedNum');

    const queryBuilder = await this.review
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
        'profileImg.middlePath AS profileImgMiddlePath',
        'profileImg.path AS profileImgPath',
        'profileImg.extension AS profileImgExtention',
        'reviewImg.isMain AS "reviewImgIsMain"',
        'reviewImg.num AS "reviewImgNum"',
        'reviewImg.middlepath AS "reviewImgMiddlepath"',
        'reviewImg.path AS "reviewImgPath"',
        'reviewImg.extention AS "reviewImgExtention"',
        'CASE WHEN like.memberMemberId = :memberId THEN 1 ELSE 0 END AS "isLiked"',
      ])
      .leftJoin(DessertCategory, 'dessertCategory', 'dessertCategory.dessertCategoryId = review.dessertCategoryDessertCategoryId')
      .leftJoin(Member, 'member', 'member.memberId = review.memberMemberId')
      .leftJoin(ProfileImg, 'profileImg', 'profileImg.memberMemberId = member.memberId')
      .leftJoin(ReviewImg, 'reviewImg', 'reviewImg.reviewImgReviewId = review.reviewId')
      .leftJoin(Like, 'like', 'like.reviewReviewId = review.reviewId')
      .where('review.isUsable = :isUsable', { isUsable: true })
      .andWhere('review.status = :status', { status: ReviewStatus.SAVED })
      .andWhere('dessertCategory.dessertCategoryId = :dessertCategoryId', {
        dessertCategoryId: reviewCategoryDto.dessertCategoryId,
      })
      .setParameter('memberId', reviewCategoryDto.memberId)
      .orderBy(`review.${orderField}`, 'DESC')
      .take(limit + 1); // limit보다 하나 더 많이 조회해 다음 페이지 유무를 확인

    if (cursor) queryBuilder.andWhere('notice.noticeId < :noticeId', { noticeId: Number(cursor) });

    const items = await queryBuilder.getRawMany();

    return new ResponseCursorPagination(items, limit, 'reviewId');
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
      where: { isUsable: true, status: In([ReviewStatus.WAIT, ReviewStatus.INIT]), member: { memberId: memberIdDto.memberId } },
    });
  }

  /**
   * 후기작성가능한 후기 목록조회
   * @param memberIdDto
   * @returns
   */
  async findGenerableReviewList(memberIdPagingDto: MemberIdPagingDto) {
    const { limit, cursor } = memberIdPagingDto;
    const items = await this.review.find({
      select: { reviewId: true, menuName: true, storeName: true, status: true },
      where: { isUsable: true, status: In([ReviewStatus.WAIT, ReviewStatus.INIT]), member: { memberId: memberIdPagingDto.memberId }, ...(cursor ? { pointHistoryId: LessThan(Number(cursor)) } : {}) },
      order: { createdDate: 'ASC', menuName: 'ASC' },
    });

    return new ResponseCursorPagination(items, limit, 'reviewId');
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
   * 후기 하나 삭제
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
    const statusArray = [ReviewStatus.WAIT, ReviewStatus.INIT];
    return await this.review
      .createQueryBuilder('review')
      .leftJoinAndSelect('review.dessertCategory', 'dessertCategory')
      .leftJoinAndSelect('review.reviewImg', 'reviewImg')
      .leftJoinAndSelect('review.reviewIngredients', 'reviewIngredient')
      .leftJoinAndSelect('reviewIngredient.ingredient', 'ingredient')
      .where('review.reviewId = :reviewId', { reviewId: reviewIdDto.reviewId })
      .andWhere('review.status IN (:...statuses)', { statuses: statusArray })
      .andWhere('review.isUsable = :isUsable', { isUsable: true })
      .getOne();
  }

  /**
   * 기존 리뷰에 선택된 재료가 있는지 확인
   * @param reviewUpdateDto
   */
  async findReviewIngredient(reviewUpdateDto: any) {
    return await this.reviewIngredient.find({ where: { review: { reviewId: reviewUpdateDto.reviewId } } });
  }

  /**
   * 기존 리뷰에 선택된 재료 삭제
   * @param reviewUpdateDto
   */
  async deleteReviewIngredient(reviewUpdateDto: any) {
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
  async updateGenerableReview(reviewUpdateDto: any) {
    const saveReview = new Review();
    saveReview.content = reviewUpdateDto.content;
    saveReview.status = reviewUpdateDto.status == 'SAVED' ? ReviewStatus.SAVED : ReviewStatus.INIT;
    saveReview.menuName = reviewUpdateDto.menuName;
    saveReview.score = reviewUpdateDto.score;
    saveReview.storeName = reviewUpdateDto.storeName;
    if (reviewUpdateDto.reviewId) saveReview.reviewId = reviewUpdateDto.reviewId;

    const member = new Member();
    member.memberId = reviewUpdateDto.memberId;
    saveReview.member = member;

    const dessertCategory = new DessertCategory();
    dessertCategory.dessertCategoryId = reviewUpdateDto.dessertCategoryId;
    saveReview.dessertCategory = dessertCategory;

    return await this.review.save(saveReview);
  }

  /**
   * 리뷰 이미지 카운트
   * @param reviewImgSaveDto
   * @returns
   */
  async counteReviewImg(reviewImgSaveDto: ReviewImgSaveDto) {
    return await this.reviewImg.count({
      where: { reviewImg: { reviewId: reviewImgSaveDto.reviewId } },
    });
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
      num: reviewImgSaveDto.num,
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

  /**
   * 내가 좋아요를 누른 리뷰 목록조회하기
   */
  async findLikedReviewList(memberIdPagingDto: MemberIdPagingDto) {
    const { cursor, limit } = memberIdPagingDto;
    const queryBuilder = await this.review
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
        'profileImg.middlePath AS profileImgMiddlePath',
        'profileImg.path AS profileImgPath',
        'profileImg.extension AS profileImgExtention',
        'reviewImg.isMain AS "reviewImgIsMain"',
        'reviewImg.num AS "reviewImgNum"',
        'reviewImg.middlepath AS "reviewImgMiddlepath"',
        'reviewImg.path AS "reviewImgPath"',
        'reviewImg.extention AS "reviewImgExtention"',
        'CASE WHEN like.memberMemberId = :memberId THEN 1 ELSE 0 END AS "isLiked"',
      ])
      .leftJoin(DessertCategory, 'dessertCategory', 'dessertCategory.dessertCategoryId = review.dessertCategoryDessertCategoryId')
      .leftJoin(Member, 'member', 'member.memberId = review.memberMemberId')
      .leftJoin(ProfileImg, 'profileImg', 'profileImg.memberMemberId = member.memberId')
      .leftJoin(ReviewImg, 'reviewImg', 'reviewImg.reviewImgReviewId = review.reviewId')
      .leftJoin(Like, 'like', 'like.reviewReviewId = review.reviewId')
      .where('review.isUsable = :isUsable', { isUsable: true })
      .andWhere('review.status = :status', { status: ReviewStatus.SAVED }) // status: In([ReviewStatus.WAIT, ReviewStatus.INIT])
      .andWhere('like.memberMemberId = :likeMemberId', { likeMemberId: memberIdPagingDto.memberId })
      .orderBy('review.createdDate', 'DESC')
      .setParameter('memberId', memberIdPagingDto.memberId)
      .take(limit + 1); // limit보다 하나 더 많이 조회해 다음 페이지 유무를 확인

    if (cursor) queryBuilder.andWhere('notice.noticeId < :noticeId', { noticeId: Number(cursor) });
    const items = await queryBuilder.getRawMany();

    return new ResponseCursorPagination(items, limit, 'reviewId');
  }
}
