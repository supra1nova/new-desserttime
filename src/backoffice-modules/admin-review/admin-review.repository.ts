import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { Review } from '../../config/entities/review.entity';
import { AdminSearchReviewDto } from './model/admin-search-review.dto';
import { Member } from '../../config/entities/member.entity';
import { DessertCategory } from '../../config/entities/dessert.category.entity';
import { ReviewIngredient } from '../../config/entities/review.ingredient.entity';
import { Ingredient } from '../../config/entities/ingredient.entity';
import { Accusation } from '../../config/entities/accusation.entity';
import { ReviewImg } from '../../config/entities/review.img.entity';
import { ReceiptImg } from '../../config/entities/receipt.Img.entity';
import { UpdateAdminReviewDto } from './model/update-admin-review.dto';
import { ReviewStatus } from '../../common/enum/review.enum';

export class AdminReviewRepository {
  constructor(@InjectRepository(Review) private adminReviewRepository: Repository<Review>) {}

  /**
   * 리뷰 수량 조회
   * @param adminSearchReviewDto
   */
  async count(adminSearchReviewDto: AdminSearchReviewDto) {
    const selectQueryBuilder = this._processSetListClause();
    selectQueryBuilder.addSelect(`('[' || rv.storeName || '] ' || rv.menuName)`, 'title');

    const resultQueryBuilder = this._setWhereClause(selectQueryBuilder, adminSearchReviewDto);
    return await resultQueryBuilder.getCount();
  }

  /**
   * [페이지네이션 적용] 리뷰 목록 조회
   * @param adminSearchReviewDto
   */
  async findReviewList(adminSearchReviewDto: AdminSearchReviewDto) {
    const selectQueryBuilder = this._processSetListClause();
    selectQueryBuilder.addSelect(`('[' || rv.storeName || '] ' || rv.menuName)`, 'title');
    const resultQueryBuilder = this._setWhereClause(selectQueryBuilder, adminSearchReviewDto);

    resultQueryBuilder
      .addSelect(this._aggregateColumns())
      .orderBy('rv.reviewId', 'DESC');

    this._setPagination(resultQueryBuilder, adminSearchReviewDto);
    return await resultQueryBuilder.getRawMany();
  }

  /**
   * 리뷰 단건 조회
   * @param reviewId
   */
  async findOneById(reviewId: number) {
    const selectQueryBuilder = this._processSetListClause();
    const resultQueryBuilder = selectQueryBuilder.where('rv.reviewId = :reviewId', { reviewId: reviewId });

    resultQueryBuilder
      .addSelect(this._aggregateColumns())
      .orderBy('rv.reviewId', 'DESC');

    return await resultQueryBuilder.getRawOne();
  }

  /**
   * 리뷰 수정
   * @param reviewId
   * @param updateAdminReviewDto
   */
  async update(reviewId: number, updateAdminReviewDto: UpdateAdminReviewDto) {
    const { dessertCategoryId, ...otherFields } = updateAdminReviewDto;

    const updateResult = await this.adminReviewRepository
      .createQueryBuilder()
      .update(Review)
      .set({
        ...otherFields,
        dessertCategory: { dessertCategoryId }, // 특정 관계 필드를 ID로만 업데이트
      })
      .where('reviewId = :reviewId', { reviewId })
      .execute();
    return !!updateResult.affected;
  }

  /**
   * 리뷰 삭제
   * @param reviewId
   */
  async delete(reviewId: number) {
    const deleteResult = await this.adminReviewRepository
      .createQueryBuilder()
      .update(Review)
      .set({
        isUsable: false,
        status: ReviewStatus.DELETED,
      })
      .where('reviewId = :reviewId', { reviewId })
      .execute();
    return !!deleteResult.affected;
  }

  /* private 메서드 */

  /**
   * [process] 공통 리스트 조회 쿼리 생성 프로세스
   */
  private _processSetListClause() {
    return this.adminReviewRepository
      .createQueryBuilder('rv')
      .leftJoin(DessertCategory, 'dc', 'rv.dessertCategoryDessertCategoryId = dc.dessertCategoryId')
      .leftJoin(Member, 'mb', 'rv.memberMemberId = mb.memberId')
      .leftJoin(ReviewIngredient, 'rvIngdnt', 'rv.reviewId = rvIngdnt.reviewReviewId')
      .leftJoin(Ingredient, 'ing', 'rvIngdnt.ingredientIngredientId = ing.ingredientId')
      .leftJoin(Accusation, 'acc', 'rv.reviewId = acc.reviewReviewId')
      .leftJoin(ReviewImg, 'rvImg', 'rv.reviewId = rvImg.reviewImgReviewId')
      .leftJoin(ReceiptImg, 'rcptImg', 'rv.receiptImgReceiptImgId = rcptImg.receiptImgId') // 조인 수정
      .select('rv.status', 'status')
      .addSelect('rv.reviewId', 'reviewId')
      .addSelect('mb.memberId', 'memberId')
      .addSelect('mb.nickName', 'nickName')
      .addSelect('mb.memberEmail', 'memberEmail')
      .addSelect('dc.dessertCategoryId', 'dessertCategoryId')
      .addSelect('dc.dessertName', 'dessertName')
      .addSelect('rv.menuName', 'menuName')
      .addSelect('rv.storeName', 'storeName')
      .addSelect('rv.content', 'content')
      .addSelect('rv.adminMemo', 'adminMemo')
      .groupBy('rv.reviewId, mb.memberId, mb.nickName, mb.memberEmail, dc.dessertCategoryId, dc.dessertName, rv.status, rv.content, rv.adminMemo, rv.storeName, rv.menuName');
  }

  /**
   * where 절 세팅 메서드
   * @param queryBuilder
   * @param adminSearchReviewDto
   */
  private _setWhereClause(queryBuilder: SelectQueryBuilder<Review>, adminSearchReviewDto: AdminSearchReviewDto) {
    const { searchReviewWriterValue, searchReviewContentsValue , searchReviewStatus} = adminSearchReviewDto;

    // nickname/email 을 OR 조건로 묶기 (brackets 사용)
    if (searchReviewWriterValue !== undefined && searchReviewWriterValue !== null && searchReviewWriterValue !== '') {
      queryBuilder.andWhere(
        new Brackets((qb) => qb
          .orWhere('mb.nickName LIKE :nickName', { nickName: `%${searchReviewWriterValue}%` })
          .orWhere('mb.memberEmail LIKE :memberEmail', { memberEmail: `%${searchReviewWriterValue}%` })
        )
      );
    }

    // 제목/내용 을 OR 조건로 묶기 (brackets 사용)
    if (searchReviewContentsValue !== undefined && searchReviewContentsValue !== null && searchReviewContentsValue !== '') {
      queryBuilder.andWhere(
        new Brackets((qb) => qb
          .orWhere('rv.storeName LIKE :storeName', { storeName: `%${searchReviewContentsValue}%` })
          .orWhere('rv.menuName LIKE :menuName', { menuName: `%${searchReviewContentsValue}%` })
        )
      );
    }

    // 리뷰 상태에 따른 검색
    if (searchReviewStatus !== undefined && searchReviewStatus !== null) {
      queryBuilder.andWhere(`rv.status = :status`, { status: searchReviewStatus })
      queryBuilder.andWhere(`rv.status != '초기'`)
    } else {
      queryBuilder.andWhere(
        new Brackets((qb) => qb
          .orWhere(`rv.status = '대기'`)
          .orWhere(`rv.status = '등록'`)
          .orWhere(`rv.status = '신고'`)
          .orWhere(`rv.status = '삭제'`)
        )
      )
    }
    return queryBuilder;
  }

  /**
   * 집계 컬럼 설정 메서드
   */
  private _aggregateColumns() {
    return [
      `LISTAGG(DISTINCT ing.ingredientId || ':' || ing.ingredientName, ', ') 
        WITHIN GROUP (ORDER BY ing.ingredientId) AS "ingredients"`,
      `LISTAGG(DISTINCT acc.accusationId || ':' || acc.reason, ', ') 
        WITHIN GROUP (ORDER BY acc.accusationId) AS "accusations"`,
      `LISTAGG(DISTINCT rvImg.reviewImgId || '_' || rvImg.middlepath || '_' || rvImg.path || ':' || rvImg.imgName || rvImg.extention, ', ') 
        WITHIN GROUP (ORDER BY rvImg.reviewImgId) AS "reviewImgs"`,
      `LISTAGG(DISTINCT rcptImg.receiptImgId || '_' || rcptImg.middlepath || '_' || rcptImg.path || ':' || rcptImg.imgName || rcptImg.extention, ', ') 
        WITHIN GROUP (ORDER BY rcptImg.receiptImgId) AS "receiptImgs"`,
    ];
  }

  /**
   * pagination 세팅 메서드
   * @param queryBuilder
   * @param adminSearchReviewDto
   */
  private _setPagination(queryBuilder: SelectQueryBuilder<Review>, adminSearchReviewDto: AdminSearchReviewDto) {
    queryBuilder.offset(adminSearchReviewDto.getSkip()).limit(adminSearchReviewDto.getTake());
  }
}
