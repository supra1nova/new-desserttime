import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DessertCategory } from 'src/config/entities/dessert.category.entity';
import { In, Repository } from 'typeorm';
import { DessertSessionDto } from './dto/dessertsession.dto';
import { FirstCategoryAppendDto } from './dto/firstcategory.append.dto';
import { ParentIdDto } from './dto/parent.id.dto';
import { DessertCategoryIdDto } from './dto/dessert.category.dto';

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
  async insertDessertCategory(firstCategoryAppendDto: FirstCategoryAppendDto) {
    await this.dessertCategory.insert(firstCategoryAppendDto);
  }
  async deleteDessertCategory(dessertCategoryIdDto: DessertCategoryIdDto) {
    await this.dessertCategory.delete({
      dessertCategoryId: dessertCategoryIdDto.dessertCategoryId,
    });
  }
}
