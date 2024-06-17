import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DessertCategoryService } from "./dessert-category.service";
import { DessertSessionDto } from "./dto/dessertsession.dto";
import { CategoryAppendDto } from "./dto/category.append.dto";

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

    @ApiOperation({ summary: '카테고리 추가' })
    @Post('one')
    async postDessertCategory(@Body() categoryAppendDto:CategoryAppendDto){
    return this.dessertCategoryService.postDessertCategory(categoryAppendDto);
    }
}