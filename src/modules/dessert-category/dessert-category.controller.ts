import { Body, Controller, Delete, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { DessertCategoryService } from "./dessert-category.service";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { FirstCategoryAppendDto } from "./dto/firstcategory.append.dto";
import { TransactionInterceptor } from 'src/config/interceptor/transaction.interceptor';
import { ParentIdDto } from "./dto/parent.id.dto";
import { DessertCategoryIdDto } from "./dto/dessert.category.dto";

@ApiTags('Dessert Category')
@Controller('dessert-category')
export class DessertCategoryController{
    constructor(private dessertCategoryService:DessertCategoryService){
    }

    @ApiOperation({ summary: '전체 디저트카테고리 목록 조회' })
    @Get('all-list')
    async getAllDessertCategory(){
       return this.dessertCategoryService.getAllDessertCategory();
    }

    @ApiOperation({ summary: '차수별 디저트카테고리 목록 조회' })
    @Get('session-list/:sessionNum')
    async getSessionDessertCategory(@Param() dessertSessionDto : DessertSessionDto){
       return this.dessertCategoryService.getSessionDessertCategory(dessertSessionDto);
    }

    @ApiOperation({ summary: '선택한 카테고리의 하위카테고리 목록 조회' })
    @Get('session-sub-list/:parentDCId')
    async getSessionSubDessertCategory(@Param() parentIdDto :ParentIdDto){
       return this.dessertCategoryService.getSessionSubDessertCategory(parentIdDto);
    }

    @UseInterceptors(TransactionInterceptor)
    @ApiBody({ description: `
    sessionNum: 카테고리 차수 1차:1 or 2차:2,\n
    parentDCId : 부모 차수의 DessertCatrgoryId // 등록하려는 차수가 1차면 0입력, \n 
    dessertName:디저트명`, type: FirstCategoryAppendDto })
    @ApiOperation({ summary: '디저트카테고리 하나 생성' })
    @Post('one')
    async postDessertCategory(@Body() firstCategoryAppendDto:FirstCategoryAppendDto){
    return this.dessertCategoryService.postDessertCategory(firstCategoryAppendDto);
    }

    @UseInterceptors(TransactionInterceptor)
    @ApiOperation({ summary: '카테고리 하나 삭제' })
    @Delete('delete/:DessertCatrgoryId')
    async deleteDessertCategory(@Param() dessertCategoryIdDto :DessertCategoryIdDto){
       return this.dessertCategoryService.deleteDessertCategory(dessertCategoryIdDto);
    }
}