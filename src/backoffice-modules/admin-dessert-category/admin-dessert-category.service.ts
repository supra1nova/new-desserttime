import { Injectable } from '@nestjs/common';
import { DessertCategoryService } from '../../client-modules/dessert-category/dessert-category.service';
import { Transactional } from 'typeorm-transactional';
import { FirstCategoryAppendDto } from '../../client-modules/dessert-category/dto/firstcategory.append.dto';
import { AdminDessertCategoryRepository } from './admin-dessert-category.repository';
import { AdminSearchDessertCategoryDto } from './model/admin-search-dessert-category.dto';
import { Page } from '../common/dto/page.dto';

@Injectable()
export class AdminDessertCategoryService {
  constructor(
    private adminDessertCategoryRepository: AdminDessertCategoryRepository,
    private dessertCategoryService: DessertCategoryService,
  ) {}

  /**
   * 통합 디저트 카테고리 목록조회
   * @param adminSearchDessertCategoryDto
   * @returns Promise<Page<DessertCategoryDto>
   */
  @Transactional()
  async processFindDessertCategoryList(adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    const total = await this.adminDessertCategoryRepository.findDessertCategoryListCountByParentDCId(adminSearchDessertCategoryDto);
    const items = await this.adminDessertCategoryRepository.findDessertCategoryListByParentDCId(adminSearchDessertCategoryDto);

    return this.setPageInfo(total, items, adminSearchDessertCategoryDto);
  }

  /**
   * 카테고리 명칭 검색
   * @param adminSearchDessertCategoryDto
   * @returns Promise<Page<AdminSearchDessertCategoryDto>
   */
  @Transactional()
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
    await this.dessertCategoryService.postDessertCategory(firstCategoryAppendDto);
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
