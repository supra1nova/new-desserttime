import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DessertCategoryService } from "./dessert-category.service";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { FirstCategoryAppendDto } from "./dto/firstcategory.append.dto.ts/firstcategory.append.dto";
import { TransactionInterceptor } from 'src/config/interceptor/transaction.interceptor';

@ApiTags('Dessert Category')
@Controller('dessert-category')
export class DessertCategoryController{
    constructor(private dessertCategoryService:DessertCategoryService){
    }

    @ApiOperation({ summary: '디저트카테고리 목록 조회' })
    @Get('list')
    async getDessertCategory(@Param() dessertSessionDto : DessertSessionDto){
       return this.dessertCategoryService.getDessertCategory(dessertSessionDto);
    }

    @UseInterceptors(TransactionInterceptor)
    @ApiOperation({ summary: '디저트카테고리 하나 생성' })
    @Post('one')
    async postDessertCategory(@Body() firstCategoryAppendDto:FirstCategoryAppendDto){
    return this.dessertCategoryService.postDessertCategory(firstCategoryAppendDto);
    }
}