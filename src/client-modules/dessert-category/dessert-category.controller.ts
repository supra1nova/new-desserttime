import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DessertCategoryService } from './dessert-category.service';
import { DessertSessionDto } from './dto/dessertsession.dto';
import { ParentIdDto } from './dto/parent.id.dto';
import { DessertCategoryNameDto } from './dto/dessert.category.name.dto';

@ApiTags('Dessert Category')
@Controller('dessert-category')
export class DessertCategoryController {
  constructor(private dessertCategoryService: DessertCategoryService) {}

  @ApiOperation({ summary: '전체 디저트카테고리 목록 조회 (1,2차만)' })
  @Get('all-list')
  async getAllDessertCategory() {
    return await this.dessertCategoryService.getAllDessertCategory();
  }

  @ApiOperation({ summary: '차수별 디저트카테고리 목록 조회' })
  @Get('session-list/:sessionNum')
  async getSessionDessertCategory(@Param() dessertSessionDto: DessertSessionDto) {
    return await this.dessertCategoryService.getSessionDessertCategory(dessertSessionDto);
  }

  @ApiOperation({ summary: '선택한 카테고리의 하위카테고리 목록 조회' })
  @Get('session-sub-list/:parentDCId')
  async getSessionSubDessertCategory(@Param() parentIdDto: ParentIdDto) {
    return await this.dessertCategoryService.getSessionSubDessertCategory(parentIdDto);
  }

  @ApiOperation({ summary: '후기작성- 카테고리 목록 검색' })
  @Get('search/:dessertName')
  async getSearchCategoryList(@Param() dessertCategoryNameDto: DessertCategoryNameDto) {
    return await this.dessertCategoryService.getSearchCategoryList(dessertCategoryNameDto);
  }
}
