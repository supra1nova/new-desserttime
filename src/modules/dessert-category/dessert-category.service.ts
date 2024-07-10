import { Injectable } from '@nestjs/common';
import { DessertCategoryRepository } from './dessert-category.repository';
import { DessertSessionDto } from './dto/dessertsession.dto';
import { FirstCategoryAppendDto } from './dto/firstcategory.append.dto';
import { ParentIdDto } from './dto/parent.id.dto';
import { DessertCategoryIdDto } from './dto/dessert.category.dto';

@Injectable()
export class DessertCategoryService {
  constructor(private dessertCategoryRepository: DessertCategoryRepository) {}

  /**
   * 전체 디저트카테고리 목록 조회
   * @returns
   */
  async getAllDessertCategory() {
    try {
      const firstCategoryList =
        await this.dessertCategoryRepository.findAllDessertCategoryList();

      const itemMap = new Map();
      const rootItems = [];

      firstCategoryList.forEach((oneCategory) => {
        itemMap.set(oneCategory.dessertCategoryId, {
          ...oneCategory,
          secondCategory: [],
        });
      });

      firstCategoryList.forEach((oneCategory) => {
        const currentItme = itemMap.get(oneCategory.dessertCategoryId);
        if (oneCategory.parentDCId === 0) {
          rootItems.push(currentItme);
        } else {
          const parentItem = itemMap.get(oneCategory.parentDCId);
          if (parentItem) {
            parentItem.secondCategory.push(currentItme);
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
  async getSessionDessertCategory(dessertSessionDto: DessertSessionDto) {
    try {
      const firstCategoryList =
        await this.dessertCategoryRepository.findDessertCategoryList(
          dessertSessionDto,
        );
      return firstCategoryList;
    } catch (error) {
      throw error;
    }
  }

  async getSessionSubDessertCategory(parentIdDto: ParentIdDto) {
    try {
      const subCategoryList =
        await this.dessertCategoryRepository.findSessionSubDessertCategoryList(
          parentIdDto,
        );
      return subCategoryList;
    } catch (error) {
      throw error;
    }
  }
  /**
   * 디저트 카테고리 하나 생성
   * @param firstCategoryAppendDto
   */
  async postDessertCategory(firstCategoryAppendDto: FirstCategoryAppendDto) {
    try {
      await this.dessertCategoryRepository.insertDessertCategory(
        firstCategoryAppendDto,
      );
    } catch (error) {
      throw error;
    }
  }
  /**
   * 디저트 카테고리 하나 삭제
   * @param dessertCategoryIdDto
   */
  async deleteDessertCategory(dessertCategoryIdDto: DessertCategoryIdDto) {
    try {
      console.log('여기');
      await this.dessertCategoryRepository.deleteDessertCategory(
        dessertCategoryIdDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
