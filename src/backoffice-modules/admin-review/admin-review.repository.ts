import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Like, Repository, SelectQueryBuilder } from 'typeorm';
import { Review } from '../../config/entities/review.entity';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';
import { Member } from '../../config/entities/member.entity';
import { DessertCategory } from '../../config/entities/dessert.category.entity';
import { ReviewIngredient } from '../../config/entities/review.ingredient.entity';
import { Ingredient } from '../../config/entities/ingredient.entity';
import { Accusation } from '../../config/entities/accusation.entity';
import { ReviewImg } from '../../config/entities/review.img.entity';
import { ReceiptImg } from '../../config/entities/receipt.Img.entity';

export class AdminReviewRepository {
  constructor(@InjectRepository(Review) private adminReviewRepository: Repository<Review>) {}

  /**
   * 리뷰 수량 조회
   * @param adminSearchReviewDto
   */
  async count(adminSearchReviewDto: AdminSearchReviewDto) {
    const queryBuilder = this._processSetListClause(adminSearchReviewDto);
    return await queryBuilder.getCount();
  }

  /**
   * [페이지네이션 적용] 리뷰 목록 조회
   * @param adminSearchReviewDto
   */
  async findReviewList(adminSearchReviewDto: AdminSearchReviewDto) {
    const queryBuilder = this._processSetListClause(adminSearchReviewDto);
    queryBuilder
      .addSelect(this._aggregateColumns())
      .orderBy('rv.reviewId', 'DESC');

    this._setPagination(queryBuilder, adminSearchReviewDto);
    return await queryBuilder.getRawMany();
  }

  /* private 메서드 */

  /**
   * [process] 공통 리스트 조회 쿼리 생성 프로세스
   * @param adminSearchReviewDto
   */
  private _processSetListClause(adminSearchReviewDto: AdminSearchReviewDto) {
    const queryBuilder: SelectQueryBuilder<Review> = this.adminReviewRepository
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
      .addSelect(`('[' || rv.storeName || '] ' || rv.menuName)`, 'title')
      .addSelect('rv.content', 'content')
      .addSelect('rv.adminMemo', 'adminMemo')
      .groupBy('rv.reviewId, mb.memberId, mb.nickName, mb.memberEmail, dc.dessertCategoryId, dc.dessertName, rv.status, rv.content, rv.adminMemo, rv.storeName, rv.menuName')

    return this._setWhereClause(queryBuilder, adminSearchReviewDto);
  }

  /**
   * where 절 세팅 메서드
   * @param queryBuilder
   * @param adminSearchReviewDto
   */
  private _setWhereClause(queryBuilder: SelectQueryBuilder<Review>, adminSearchReviewDto: AdminSearchReviewDto) {
    const { searchReviewWriterValue, searchReviewContentsValue } = adminSearchReviewDto;

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
      `LISTAGG(DISTINCT rvImg.reviewImgId || '_' || rvImg.middlepath || rvImg.path || ':' || rvImg.imgName || rvImg.extention, ', ') 
        WITHIN GROUP (ORDER BY rvImg.reviewImgId) AS "reviewImgs"`,
      `LISTAGG(DISTINCT rcptImg.receiptImgId || '_' || rcptImg.middlepath || rcptImg.path || ':' || rcptImg.imgName || rcptImg.extention, ', ') 
        WITHIN GROUP (ORDER BY rcptImg.receiptImgId) AS "receiptImgs"`,
    ];
  }

  /**
   * pagination 세팅 메서드
   * @param queryBuilder
   * @param adminSearchReviewDto
   */
  private _setPagination(queryBuilder: SelectQueryBuilder<Review>, adminSearchReviewDto: AdminSearchReviewDto) {
    queryBuilder
      .offset(adminSearchReviewDto.getSkip())
      .limit(adminSearchReviewDto.getTake());
  }
}
