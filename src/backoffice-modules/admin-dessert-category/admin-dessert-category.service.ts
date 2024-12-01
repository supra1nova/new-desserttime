import { Injectable } from '@nestjs/common';
import { Transactional } from 'typeorm-transactional';
import { FirstCategoryAppendDto } from '../../client-modules/dessert-category/dto/firstcategory.append.dto';
import { AdminDessertCategoryRepository } from './admin-dessert-category.repository';
import { AdminSearchDessertCategoryDto } from './model/admin-search-dessert-category.dto';
import { Page } from '../common/dto/page.dto';
import { DessertCategoryIdDto } from '../../client-modules/dessert-category/dto/dessert.category.dto';

@Injectable()
export class AdminDessertCategoryService {
  constructor(private adminDessertCategoryRepository: AdminDessertCategoryRepository) {}

  /**
   * 디저트 카테고리 목록 조회
   * @param adminSearchDessertCategoryDto
   * @returns Promise<Page<DessertCategoryDto>
   */
  async processFindDessertCategoryList(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const total = await this.adminDessertCategoryRepository.findDessertCategoryListCountByParentDCId(adminSearchDessertCategoryDto);
    const items = await this.adminDessertCategoryRepository.findDessertCategoryListByParentDCId(adminSearchDessertCategoryDto);

    return this.setPageInfo(total, items, adminSearchDessertCategoryDto);
  }

  /**
   * 디저트 카테고리 명칭 검색
   * @param adminSearchDessertCategoryDto
   * @returns Promise<Page<AdminSearchDessertCategoryDto>
   */
  async findDessertCategoryListByDessertName(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const total = await this.adminDessertCategoryRepository.findDessertCategoryListCountByDessertCategoryName(adminSearchDessertCategoryDto);
    const items = await this.adminDessertCategoryRepository.findDessertCategoryListByDessertCategoryName(adminSearchDessertCategoryDto);

    return this.setPageInfo(total, items, adminSearchDessertCategoryDto);
  }

  /**
   * 디저트 카테고리 하나 생성
   * @param firstCategoryAppendDto
   * @returns
   */
  @Transactional()
  async insertDessertCategory(firstCategoryAppendDto: FirstCategoryAppendDto) {
    try {
      await this.adminDessertCategoryRepository.insertDessertCategory(firstCategoryAppendDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 디저트 카테고리 하나 삭제
   * @param dessertCategoryIdDto
   * @returns
   */
  @Transactional()
  async deleteDessertCategory(dessertCategoryIdDto: DessertCategoryIdDto) {
    const result = await this.adminDessertCategoryRepository.deleteDessertCategory(dessertCategoryIdDto);

    if (!result) throw new Error('카테고리 삭제에 실패했습니다.');
  }

  /**
   * 페이지네이션 세팅 함수
   * @param total
   * @param items
   * @param adminSearchDessertCategoryDto
   * @returns Promise<Page<DessertCategoryDto>
   */
  private setPageInfo(total: number, items: AdminSearchDessertCategoryDto[], adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const pageNo = adminSearchDessertCategoryDto.pageNo;
    const limitSize = adminSearchDessertCategoryDto.limitSize;

    return new Page(pageNo, total, limitSize, items);
  }
}
