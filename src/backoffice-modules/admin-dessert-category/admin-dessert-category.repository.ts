import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { DessertCategory } from '../../config/entities/dessert-category.entity';
import { AdminSearchDessertCategoryDto } from './model/admin-search-dessert-category.dto';
import { FirstCategoryAppendDto } from '../../client-modules/dessert-category/dto/firstcategory.append.dto';
import { DessertCategoryIdDto } from '../../client-modules/dessert-category/dto/dessert.category.dto';

export class AdminDessertCategoryRepository {
  constructor(@InjectRepository(DessertCategory) private dessertCategoryRepository: Repository<DessertCategory>) {}

  /**
   * 카테고리 목록 수량 조회
   * @returns Promise<number>
   */
  async findDessertCategoryListCountByParentDCId(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    return await this.dessertCategoryRepository
      .createQueryBuilder('dc')
      .select(['dc.dessertName        AS "dessertName"', 'dc.sessionNum         AS "sessionNum"', 'dc.dessertCategoryId  AS "dessertCategoryId"', 'dc.parentDCId         AS "parentDCId"'])
      .where('dc.parentDCId = :parentDCId', { parentDCId: adminSearchDessertCategoryDto.parentDCId })
      .getCount();
  }

  /**
   * [페이지네이션 적용] 카테고리 목록 조회
   * @param adminSearchDessertCategoryDto
   * @returns Promise<DessertCategoryDto[]>
   */
  async findDessertCategoryListByParentDCId(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    return await this.dessertCategoryRepository
      .createQueryBuilder('dc')
      .select(['dc.dessertName        AS "dessertName"', 'dc.sessionNum         AS "sessionNum"', 'dc.dessertCategoryId  AS "dessertCategoryId"', 'dc.parentDCId         AS "parentDCId"'])
      .where('dc.parentDCId = :parentDCId', { parentDCId: adminSearchDessertCategoryDto.parentDCId })
      .orderBy('dc.dessertCategoryId', 'ASC')
      .offset(adminSearchDessertCategoryDto.getSkip())
      .limit(adminSearchDessertCategoryDto.getTake())
      .getRawMany();
  }

  /**
   * 카테고리명 검색 수량 조회
   * @param adminSearchDessertCategoryDto
   * @returns Promise<number>
   */
  async findDessertCategoryListCountByDessertCategoryName(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const whereClause = this.setWhereClause(adminSearchDessertCategoryDto);
    const selectClause = this.setSelectClauseForFindDessertCategoryByName();
    const subQuery = this.setQueryForFindDessertCategoryByName();

    return await this.dessertCategoryRepository
      .createQueryBuilder('dc')
      .select(selectClause)
      .leftJoin(subQuery, 'subQuery', 'dc.parentDCId = "subQuery"."dessertCategoryId"')
      .where(whereClause)
      .orderBy('dc.sortNum', 'ASC')
      .getCount();
  }

  /**
   * [페이지네이션 적용] 카테고리명 검색
   * @param adminSearchDessertCategoryDto
   * @returns Promise<DessertCategoryDto[]>
   */
  async findDessertCategoryListByDessertCategoryName(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const whereClause = this.setWhereClause(adminSearchDessertCategoryDto);
    const selectClause = this.setSelectClauseForFindDessertCategoryByName();
    const subQuery = this.setQueryForFindDessertCategoryByName();

    // 검색된 아이템 리스트
    return await this.dessertCategoryRepository
      .createQueryBuilder('dc')
      .select(selectClause)
      .leftJoin(subQuery, 'subQuery', 'dc.parentDCId = "subQuery"."dessertCategoryId"')
      .where(whereClause)
      .orderBy('dc.sortNum', 'ASC')
      .offset(adminSearchDessertCategoryDto.getSkip())
      .limit(adminSearchDessertCategoryDto.getTake())
      .getRawMany();
  }

  /**
   * 카테고리 생성
   */
  async insertDessertCategory(firstCategoryAppendDto: FirstCategoryAppendDto) {
    await this.dessertCategoryRepository.insert(firstCategoryAppendDto);
  }

  /**
   * 카테고리 삭제
   */
  async deleteDessertCategory(dessertCategoryIdDto: DessertCategoryIdDto) {
    const result = await this.dessertCategoryRepository.softDelete(dessertCategoryIdDto);
    return !!result.affected;
  }

  /**
   * 디저트 카테고리 name 검색 관련 select 문 세팅 함수
   */
  private setSelectClauseForFindDessertCategoryByName() {
    return [
      'dc.dessertCategoryId         AS "dessertCategoryId"',
      'dc.dessertName               AS "dessertName"',
      'dc.sessionNum                AS "sessionNum"',
      'dc.sortNum                   AS "sortNum"',
      '"subQuery"."dessertCategoryId" AS "parentDCId"',
      '"subQuery"."dessertName"       AS "parentDessertName"',
      '"subQuery"."parentDCId"        AS "topParentDCId"',
      '"subQuery"."parentDessertName" AS "topParentDessertName"',
    ];
  }

  /**
   * 디저트 카테고리 name 검색 관련 sub query 세팅 함수
   */
  private setQueryForFindDessertCategoryByName() {
    // 검색된 아이템의 최상위 부모 컨텐츠
    const lastSubQr = this.dessertCategoryRepository
      .createQueryBuilder()
      .subQuery()
      .select(['lastSubQr.dessertCategoryId  AS "dessertCategoryId"', 'lastSubQr.dessertName        AS "dessertName"'])
      .from(DessertCategory, 'lastSubQr')
      .getQuery();

    // 검색된 아이템의 부모 컨텐츠
    return this.dessertCategoryRepository
      .createQueryBuilder()
      .subQuery()
      .select([
        'firstSubQr.dessertCategoryId AS "dessertCategoryId"',
        'firstSubQr.dessertName           AS "dessertName"',
        'firstSubQr.sessionNum            AS "sessionNum"',
        'firstSubQr.sortNum               AS "sortNum"',
        '"lastSubQr"."dessertCategoryId"  AS "parentDCId"',
        '"lastSubQr"."dessertName"        AS "parentDessertName"',
      ])
      .leftJoin(lastSubQr, 'lastSubQr', 'firstSubQr.parentDCId = "lastSubQr"."dessertCategoryId"')
      .from(DessertCategory, 'firstSubQr')
      .getQuery();
  }

  /**
   * repository 내에서 사용할 where 절 구성
   * @param adminSearchDessertCategoryDto
   * @returns {string: T}
   */
  private setWhereClause(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const dessertName = adminSearchDessertCategoryDto.dessertName;

    const whereClause = {};
    whereClause['isUsable'] = true;

    if (dessertName !== undefined) {
      whereClause[`dessertName`] = Like(`%${dessertName}%`);
    }

    return whereClause;
  }
}
