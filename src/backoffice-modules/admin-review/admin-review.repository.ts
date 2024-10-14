import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../../config/entities/review.entity';
import { AdminSearchReviewDto } from './dto/admin-search-review.dto';
import { Member } from '../../config/entities/member.entity';
import { DessertCategory } from '../../config/entities/dessert.category.entity';

export class AdminReviewRepository {
  constructor(@InjectRepository(Review) private adminReviewRepository: Repository<Review>) {
  }

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
  async findReviewList(adminSearchReviewDto: AdminSearchReviewDto) {
    const whereClause = this.setWhereClause(adminSearchReviewDto);

    const dcSubQr = this.adminReviewRepository
      .createQueryBuilder()
      .subQuery()
      .select([
        'dc.dessertCategoryId   AS "dessertCategoryId"',
        'dc.dessertName         AS "dessertName"',
      ])
      .from(DessertCategory, 'dc')
      .getQuery();

    const mbSubQr = this.adminReviewRepository
      .createQueryBuilder()
      .subQuery()
      .select([
        'mb.memberId      AS "memberId"',
        'mb.memberEmail   AS "memberEmail"',
        'mb.nickName      AS "nickName"',
      ])
      .from(Member, 'mb')
      .getQuery();

    // TODO: 재료, 사진, 처리내역, 영수증 left join 할 것
    const mainQuery = await this.adminReviewRepository
      .createQueryBuilder('rv')
      .select([
        'rv.status                                      AS "status"',
        'rv.reviewId                                    AS "reviewId"',
        '"mbSubQr"."memberId"                           AS "memberId"',
        '"mbSubQr"."nickName"                           AS "nickName"',
        '"mbSubQr"."memberEmail"                        AS "memberEmail"',
        '"dcSubQr"."dessertCategoryId"                  AS "dessertCategoryId"',
        '"dcSubQr"."dessertName"                        AS "dessertName"',
        `('[' || rv.storeName || '] ' || rv.menuName)   AS "title"`,
        'rv.content                                     AS "content"',
        'rv.adminMemo                                   AS "adminMemo"',
      ])
      .leftJoin(dcSubQr, 'dcSubQr', 'rv.dessertCategoryDessertCategoryId = "dcSubQr"."dessertCategoryId"')
      .leftJoin(mbSubQr, 'mbSubQr', 'rv.memberMemberId = "mbSubQr"."memberId"')
      .where(whereClause)
      /*.orderBy('rv.dessertCategoryId', 'ASC')*/
      .offset(adminSearchReviewDto.getSkip())
      .limit(adminSearchReviewDto.getTake())
      .getRawMany();
    return mainQuery;
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param adminSearchReviewDto
   * @returns {string: T}
   */
  private setWhereClause(adminSearchReviewDto: AdminSearchReviewDto) {
    // TODO: search review where 절 세팅
    /*const dessertName = adminSearchReviewDto.dessertName;*/

    const whereClause = {};
    /*whereClause['isUsable'] = true;

    if (dessertName !== undefined) {
      whereClause[`dessertName`] = Like(`%${dessertName}%`);
    }*/

    return whereClause;
  }
}
