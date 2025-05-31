import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DessertCategory } from 'src/config/entities/dessert-category.entity';
import { In, Repository } from 'typeorm';
import { DessertSessionDto } from './dto/dessertsession.dto';
import { ParentIdDto } from './dto/parent.id.dto';
import { DessertCategoryNameDto } from './dto/dessert.category.name.dto';

@Injectable()
export class DessertCategoryRepository {
  constructor(
    @InjectRepository(DessertCategory)
    private dessertCategory: Repository<DessertCategory>,
  ) {}

  async findAllDessertCategoryList() {
    return await this.dessertCategory.find({
      select: {
        dessertName: true,
        sessionNum: true,
        dessertCategoryId: true,
        parentDCId: true,
      },
      where: { sessionNum: In([1, 2]) },
      order: { dessertCategoryId: 'ASC' },
    });
  }

  async findDessertCategoryList(dessertSessionDto: DessertSessionDto) {
    return await this.dessertCategory.find({
      select: {
        dessertName: true,
        sessionNum: true,
        dessertCategoryId: true,
        parentDCId: true,
      },
      where: { sessionNum: dessertSessionDto.sessionNum },
      order: { dessertCategoryId: 'ASC' },
    });
  }

  async findSessionSubDessertCategoryList(parentIdDto: ParentIdDto) {
    return await this.dessertCategory.find({
      select: {
        dessertName: true,
        sessionNum: true,
        dessertCategoryId: true,
        parentDCId: true,
      },
      where: { parentDCId: parentIdDto.parentDCId },
      order: { dessertCategoryId: 'ASC' },
    });
  }

  /**
   * 후기작성- 카테고리명 검색
   * @param dessertCategoryNameDto
   * @returns
   */
  async findSearchCategoryList(dessertCategoryNameDto: DessertCategoryNameDto) {
    const searchTerm = dessertCategoryNameDto.dessertName;
    return await this.dessertCategory
      .createQueryBuilder('dessertCategory')
      .select(['dessertCategory.dessertCategoryId', 'dessertCategory.dessertName'])
      .where('dessertCategory.dessertName LIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
      .orderBy(`CASE WHEN dessertCategory.dessertName LIKE :exactTerm THEN 1 ELSE 2 END`, 'ASC')
      .addOrderBy('dessertCategory.dessertName', 'ASC')
      .setParameters({ exactTerm: `${searchTerm}%` })
      .getMany();
  }
}
