import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../config/entities/review.entity';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';
import { Member } from '../../config/entities/member.entity';
import { DessertCategory } from '../../config/entities/dessert.category.entity';
import { ReviewIngredient } from '../../config/entities/review.ingredient.entity';

export class AdminReviewRepository {
  constructor(@InjectRepository(Review) private adminReviewRepository: Repository<Review>) {}

  /**
   * 리뷰 수량 조회
   * @returns Promise<number>
   */
  async count(adminSearchReviewDto: AdminSearchReviewDto) {
    const whereClause = this.setWhereClause(adminSearchReviewDto);

    return await this.adminReviewRepository.count({
      where: whereClause,
    });
  }

  /**
   * [페이지네이션 적용] 리뷰 목록 조회
   * @param adminSearchReviewDto
   * @returns Promise<any>
   */
  // TODO: 사진, 영수증 left join 할 것
  async findReviewList(adminSearchReviewDto: AdminSearchReviewDto) {
    const whereClause = this.setWhereClause(adminSearchReviewDto);

    const rawReviews = await this.adminReviewRepository
      .createQueryBuilder('rv')
      .leftJoin(DessertCategory, 'dc', 'rv.dessertCategoryDessertCategoryId = dc.dessertCategoryId')
      .leftJoin(Member, 'mb', 'rv.memberMemberId = mb.memberId')
      .leftJoin(ReviewIngredient, 'rvIng', 'rv.reviewId = rvIng.reviewReviewId')
      .leftJoin(ReviewIngredient, 'rvIng', 'rv.reviewId = rvIng.reviewReviewId')
      .leftJoin('ingredient', 'ing', 'rvIng.ingredientIngredientId = ing.ingredientId')
      .leftJoin('accusation', 'acc', 'rv.reviewId = acc.reviewReviewId')
      .where(whereClause)
      .andWhere('rv.isUsable = :isUsable', { isUsable: true })
      .select('rv.status', 'rv_status')
      .addSelect('rv.reviewId', 'rv_reviewId')
      .addSelect('mb.memberId', 'mb_memberId')
      .addSelect('mb.nickName', 'mb_nickName')
      .addSelect('mb.memberEmail', 'mb_memberEmail')
      .addSelect('dc.dessertCategoryId', 'dc_dessertCategoryId')
      .addSelect('dc.dessertName', 'dc_dessertName')
      .addSelect(`('[' || rv.storeName || '] ' || rv.menuName)`, 'title')
      .addSelect('rv.content', 'rv_content')
      .addSelect('rv.adminMemo', 'rv_adminMemo')
      .addSelect(`LISTAGG(DISTINCT ing.ingredientId || ':' || ing.ingredientName, ', ') WITHIN GROUP (ORDER BY ing.ingredientName)`, 'ingredients')
      .addSelect(`LISTAGG(DISTINCT acc.accusationId || ':' || acc.reason, ', ') WITHIN GROUP (ORDER BY acc.accusationId)`, 'accusations')
      .groupBy('rv.reviewId, mb.memberId, mb.nickName, mb.memberEmail, dc.dessertCategoryId, dc.dessertName, rv.status, rv.content, rv.adminMemo, rv.storeName, rv.menuName')
      .orderBy('rv.reviewId', 'ASC')
      .offset(adminSearchReviewDto.getSkip())
      .limit(adminSearchReviewDto.getTake())
      .getRawMany();

    // 문자열을 배열로 파싱하며, 값이 없을 경우 빈 배열 처리
    const parseList = (list) =>
      list && !list.includes('null')
        ? list
            .split(', ')
            .map((item) => {
              const [id, value] = item.split(':');
              // id가 null인 경우 빈 배열 처리
              if (id === 'null' || id === '' || id === null || id === undefined) return null;
              return { id: parseInt(id, 10), value };
            })
            .filter((item) => item !== null) // null인 항목은 필터링
        : [];

    return rawReviews.map((review) => ({
      ...review,
      ingredients: parseList(review.ingredients),
      accusations: parseList(review.accusations),
    }));
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param adminSearchReviewDto
   * @returns {string: T}
   */
  private setWhereClause(adminSearchReviewDto: AdminSearchReviewDto) {
    // TODO: search review where 절 세팅
    const reviewStatus = adminSearchReviewDto.searchReviewStatus;

    const whereClause = {};
    if (reviewStatus !== undefined) {
      whereClause['status'] = reviewStatus;
    }

    /*const dessertName = adminSearchReviewDto.dessertName;*/

    /*whereClause['isUsable'] = true;

    if (dessertName !== undefined) {
      whereClause[`dessertName`] = Like(`%${dessertName}%`);
    }*/

    return whereClause;
  }
}
