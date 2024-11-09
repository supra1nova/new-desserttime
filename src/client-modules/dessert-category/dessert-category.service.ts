import { Injectable } from '@nestjs/common';
import { DessertCategoryRepository } from './dessert-category.repository';
import { DessertSessionDto } from './dto/dessertsession.dto';
import { FirstCategoryAppendDto } from './dto/firstcategory.append.dto';
import { ParentIdDto } from './dto/parent.id.dto';
import { DessertCategoryIdDto } from './dto/dessert.category.dto';
import { DessertCategoryNameDto } from './dto/dessert.category.name.dto';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class DessertCategoryService {
  constructor(private dessertCategoryRepository: DessertCategoryRepository) {}

  /**
   * 전체 디저트카테고리 목록 조회(1,2차만)
   * @returns
   */
  @Transactional()
  async getAllDessertCategory() {
    try {
      const firstCategoryList = await this.dessertCategoryRepository.findAllDessertCategoryList();

      const itemMap = new Map();
      const rootItems = [];

      firstCategoryList.forEach((oneCategory) => {
        itemMap.set(oneCategory.dessertCategoryId, {
          ...oneCategory,
          nextCategory: [],
        });
      });

      firstCategoryList.forEach((oneCategory) => {
        const currentItem = itemMap.get(oneCategory.dessertCategoryId);
        if (oneCategory.parentDCId === 0) {
          rootItems.push(currentItem);
        } else {
          const parentItem = itemMap.get(oneCategory.parentDCId);
          if (parentItem) {
            parentItem.nextCategory.push(currentItem);
          }
        }
      });
      return rootItems;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 차수별 디저트 카테고리 목록조회
   * @param dessertSessionDto
   * @returns
   */
  @Transactional()
  async getSessionDessertCategory(dessertSessionDto: DessertSessionDto) {
    try {
      const firstCategoryList = await this.dessertCategoryRepository.findDessertCategoryList(dessertSessionDto);
      return firstCategoryList;
    } catch (error) {
      throw error;
    }
  }

  /**
   * 선택한 카테고리의 하위카테고리 목록 조회
   * @param parentIdDto
   * @returns
   */
  @Transactional()
  async getSessionSubDessertCategory(parentIdDto: ParentIdDto) {
    try {
      const subCategoryList = await this.dessertCategoryRepository.findSessionSubDessertCategoryList(parentIdDto);
      return subCategoryList;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 디저트 카테고리 하나 생성
   * @param firstCategoryAppendDto
   */
  @Transactional()
  async postDessertCategory(firstCategoryAppendDto: FirstCategoryAppendDto) {
    try {
      await this.dessertCategoryRepository.insertDessertCategory(firstCategoryAppendDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 디저트 카테고리 하나 삭제
   * @param dessertCategoryIdDto
   */
  @Transactional()
  async deleteDessertCategory(dessertCategoryIdDto: DessertCategoryIdDto) {
    try {
      console.log('여기');
      await this.dessertCategoryRepository.deleteDessertCategory(dessertCategoryIdDto);
    } catch (error) {
      throw error;
    }
  }

  /**
   * 후기작성 - 카테고리명 검색
   * @param dessertCategoryNameDto
   * @returns
   */
  @Transactional()
  async getSearchCategoryList(dessertCategoryNameDto: DessertCategoryNameDto) {
    try {
      return await this.dessertCategoryRepository.findSearchCategoryList(dessertCategoryNameDto);
    } catch (error) {
      throw error;
    }
  }
}
