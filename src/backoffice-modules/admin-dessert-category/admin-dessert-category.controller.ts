import { Controller, Get, Post, Body, Query, Delete, Param } from '@nestjs/common';
import { AdminDessertCategoryService } from './admin-dessert-category.service';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FirstCategoryAppendDto } from '../../client-modules/dessert-category/dto/firstcategory.append.dto';
import { AdminSearchDessertCategoryDto } from './model/admin-search-dessert-category.dto';
import { DessertCategoryIdDto } from '../../client-modules/dessert-category/dto/dessert.category.dto';

@ApiTags('Admin Dessert Category')
@Controller('admin-dessert-category')
export class AdminDessertCategoryController {
  constructor(private readonly adminDessertCategoryService: AdminDessertCategoryService) {}

  @ApiOperation({ summary: '카테고리 목록 조회' })
  @ApiQuery({
    name: 'parentDCId',
    type: Number,
    description: `부모 카테고리 id(빈 값 시 자동 값 0 조회)`,
    required: false,
  })
  @Get()
  findDessertCategoryFirstSessionList(@Query() adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    return this.adminDessertCategoryService.processFindDessertCategoryList(adminSearchDessertCategoryDto);
  }

  @ApiOperation({ summary: '카테고리 검색 조회 - 검색어 조회 목록' })
  @ApiQuery({
    name: 'dessertName',
    example: '스콘',
    description: '카테고리 Name',
    required: false,
  })
  @Get('search')
  findDessertCategoryListByDessertName(@Query() adminSearchDessertCategoryDto: AdminSearchDessertCategoryDto) {
    return this.adminDessertCategoryService.findDessertCategoryListByDessertName(adminSearchDessertCategoryDto);
  }

  @ApiOperation({ summary: '카테고리 하나 생성' })
  @ApiBody({
    description: `
    sessionNum: 카테고리 차수 1차:1 or 2차:2,\n
    parentDCId : 부모 차수의 DessertCategoryId // 등록하려는 차수가 1차면 0입력, \n 
    dessertName:디저트명`,
    type: FirstCategoryAppendDto,
  })
  @Post()
  createDessertCategory(@Body() firstCategoryAppendDto: FirstCategoryAppendDto) {
    return this.adminDessertCategoryService.insertDessertCategory(firstCategoryAppendDto);
  }

  @ApiOperation({ summary: '카테고리 하나 삭제' })
  @Delete(':dessertCategoryId')
  async deleteDessertCategory(@Param() dessertCategoryIdDto: DessertCategoryIdDto) {
    return await this.adminDessertCategoryService.deleteDessertCategory(dessertCategoryIdDto);
  }
}
